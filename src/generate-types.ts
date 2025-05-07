import type { CodegenPlugin } from '@graphql-codegen/plugin-helpers'
import { buildASTSchema, GraphQLSchema, GraphQLObjectType, GraphQLInterfaceType, GraphQLNamedType, isScalarType, isEnumType } from 'graphql'; // Import necessary GraphQL types

function isInterfaceType(type: GraphQLNamedType): type is GraphQLInterfaceType { return (type as any)?.astNode?.kind === 'InterfaceTypeDefinition' || type instanceof GraphQLInterfaceType; }

function isObjectType(type: GraphQLNamedType): type is GraphQLObjectType { return (type as any)?.astNode?.kind === 'ObjectTypeDefinition' || type instanceof GraphQLObjectType; }

function getImplementors(interfaceType: GraphQLInterfaceType, schema: GraphQLSchema): GraphQLObjectType[] {
    return Object.values(schema.getTypeMap())
        .filter(type => isObjectType(type) && type.getInterfaces().some(int => int.name === interfaceType.name)) as GraphQLObjectType[];
}


module.exports = <CodegenPlugin>{
  /**
   * Generates TypeScript types based on the provided GraphQL schema.
   * @param schema - The GraphQL schema object to generate types from.
   * @param _documents - Unused parameter for additional documents.
   * @param _config - Unused parameter for configuration options.
   * @returns A string containing the generated TypeScript types.
   */
  plugin: function (schema, _documents, _config) {
    if (!schema.getQueryType()) {
      throw new Error('No query type found in schema')
    }

    /**
     * Capitalizes the first letter of the given string.
     * @param str - The string to capitalize.
     * @returns The input string with the first letter converted to uppercase.
     */
    function capitalize(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /**
    * Helper map to resolve schema type names (strings) to their actual generated TypeScript types
    * Requires generated types like Query, ShieldCommitment, Token etc. to be available.
    * @param schema - The GraphQL schema object to generate types from.
    * @returns The generated TypeNameToType type
    */
    function generateTypeNameToTypeMap(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      // Include all non-introspection types, plus the root Query type
      const typeNames = Object.keys(types).filter(name => !name.startsWith('__')).sort();

      const mapEntries = typeNames
        .map(name => `  '${name}': ${name};`)
        .join('\n');

      return `export type TypeNameToType = {${mapEntries}}`;
    }

    /**
    * Generates TypeScript InterfaceImplementorsMap map.
    * Maps interface names (strings) to a union of their implementor *name strings*.
    * @param schema - The GraphQL schema object to generate types from.
    * @returns The generated InterfaceImplementorsMap
    */
    function generateInterfaceImplementorsMap(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();

      const mapEntries: string[] = [];
      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType;
        const implementors = getImplementors(interfaceType, schema);
        const implementorNamesUnion = implementors.map(impl => `'${impl.name}'`).join(' | ');
        if (implementorNamesUnion) {
          mapEntries.push(`  '${interfaceName}': ${implementorNamesUnion};`);
        }
      }

      return `export type InterfaceImplementorsMap = {${mapEntries.join('\n')}}`;

      /**
      * Generates TypeScript FragmentKeyToType map alias.
      * Maps fragment key strings (\`'... on Type'\`) to implementor *name strings*.
      * @param schema - The GraphQL schema object to generate types from.
      * @returns The generated FragmentKeyToTypeMap
      */
      function generateFragmentKeyToTypeMap(schema: GraphQLSchema): string {
        const types = schema.getTypeMap();
        const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();

        const mapEntries: string[] = [];
        for (const interfaceName of interfaceNames) {
          const interfaceType = types[interfaceName] as GraphQLInterfaceType;
          const implementors = getImplementors(interfaceType, schema);
          implementors.forEach(impl => {
            // Map fragment key string (`... on Type`) to implementor name string (`Type`)
            mapEntries.push(`  \`... on ${impl.name}\`: '${impl.name}';`);
          });
        }

        return `type FragmentKeyToType = {${mapEntries.join('\n')}}`;
      }

      /**
      * Generates Interface Fragment Input Types (e.g., CommitmentFragmentsInput).
      * These define the structure of the fragment objects { '... on Type': FieldSelector<Type>[] }
      * Requires original FieldSelector type and TypeNameToType map.
      * @param schema - The GraphQL schema object to generate types from.
      * @returns The generated InterfaceFragmentInputTypes
      */

      function generateInterfaceFragmentInputTypes(schema: GraphQLSchema): string {
        const types = schema.getTypeMap();
        const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();
        const fragmentTypes: string[] = [];

        for (const interfaceName of interfaceNames) {
          const interfaceType = types[interfaceName] as GraphQLInterfaceType;
          const implementors = getImplementors(interfaceType, schema);

          const fragmentUnionMembers = implementors.map(implType => {
            // Structure: { readonly '... on TypeName': readonly FieldSelector<TypeName>[] }
            // Uses the original generated FieldSelector type
            const implSelection = `FieldSelector<TypeNameToType['${implType.name}']>`; // Use TypeNameToType to reference implementor type
            return `{ readonly \`... on ${implType.name}\`: readonly ${implSelection}[] }`;
          }).join('\n  | ');

          const fragmentTypeName = `${interfaceName}FragmentsInput`;
          fragmentTypes.push(`export type ${fragmentTypeName} = ${fragmentUnionMembers || '{}'};`); // Provide {} for interfaces with no implementors
        }

        return fragmentTypes.join('\n\n');
      }

      /**
      * Generates Query Fields Input Type Map.
      * Maps query field names to the *correct* type for their 'fields' array input, allowing fragments for interfaces.
      * Requires EntityQueryMap (from original code), TypeNameToType, InterfaceImplementorsMap, and generated fragment input types.
      * @param schema - The GraphQL schema object to generate types from.
      * @returns The generated QueryFieldsInputMap
      */
      function generateQueryFieldsInputMap(schema: GraphQLSchema): string {
        const queryType = schema.getQueryType();
        const queryFields = queryType!.getFields(); // Assume queryType is not null
        const types = schema.getTypeMap(); // All schema types

        const queryFieldsMapEntries: string[] = [];

        for (const queryFieldName of Object.keys(queryFields)) {
          const queryField = queryFields[queryFieldName];
          const returnType = queryField.type;
          const baseReturnType = returnType.ofType || returnType; // Unpack non-null/list
          const baseReturnTypeName = baseReturnType?.name;

          let allowedFieldsType: string;

          if (baseReturnTypeName && baseReturnTypeName in types && isInterfaceType(types[baseReturnTypeName] as GraphQLNamedType)) {
            // If query returns an interface, allowed fields are base interface fields OR fragments for that interface
            // Use the original FieldSelector for base fields, applied to the base interface type via TypeNameToType
            // Use the generated fragment input type for fragments
            const fragmentTypeName = `${baseReturnTypeName}FragmentsInput`;
            allowedFieldsType = `readonly (FieldSelector<TypeNameToType['${baseReturnTypeName}']> | ${fragmentTypeName})[]`;
          } else if (baseReturnTypeName && baseReturnTypeName in types) {
            // If query returns a concrete type (object, scalar, enum), only allow standard FieldSelector selection
            allowedFieldsType = `readonly FieldSelector<TypeNameToType['${baseReturnTypeName}']>[]`; // Use TypeNameToType
          } else {
            console.warn(`Skipping query field "${queryFieldName}" with unexpected base return type name "${baseReturnTypeName}". Falling back to readonly any[].`);
            allowedFieldsType = `readonly any[]`; // Fallback
          }

          queryFieldsMapEntries.push(`  '${queryFieldName}': ${allowedFieldsType};`);
        }

        return `export type QueryFieldsInputMap = {${queryFieldsMapEntries.join('\n')}}`;
      }

      /**
       * Generates recursive output shape helper types.
       * These types process the *input* selection structure (using the original FieldSelector)
       * against a *target schema type* to determine the *output* shape, respecting fragments.
       */
      function generateOutputShapeHelpers(): string {
        return `
        type ProcessSingleSelection<
          Item extends FieldSelector<any>,
          TargetEntity
        > =
          Item extends string
            ? Item extends keyof TargetEntity
              ? Pick<TargetEntity, Item>
              : never
            : Item extends object
              ? keyof Item extends infer Key extends string
                ? Item[Key] extends readonly infer Subitems extends readonly FieldSelector<any>[]
                  ? Key extends keyof FragmentKeyToType
                    ? FragmentKeyToType[Key] extends infer FragmentTargetEntityName extends keyof TypeNameToType
                      ?
                        TargetEntity extends TypeNameToType[FragmentTargetEntityName]
                        ?
                          BuildSelectedShape<Subitems, TargetEntity>
                        : never
                      : never
                    :
                      Key extends keyof TargetEntity
                        ? TargetEntity[Key] extends (infer NestedItemType)[]
                          ?
                            { readonly [P in Key]: readonly BuildSelectedShape<Subitems, NestedItemType>[] }
                          :
                            { readonly [P in Key]: BuildSelectedShape<TargetEntity[Key], Subitems> }
                        : never
                      : never
                    : never
                  : never;

        type BuildSelectedShape<
          Selections extends readonly FieldSelector<any>[],
          TargetEntity
          > =
            Selections extends readonly [infer Head extends FieldSelector<any>, ...infer Tail extends readonly FieldSelector<any>[]]
              ?
               ProcessSingleSelection<Head, TargetEntity> & (Tail extends readonly FieldSelector<any>[] ? BuildSelectedShape<Tail, TargetEntity> : {})
              :
                {};
        `;
      }


      /**
       * Generates TypeScript types for preload operations.
       * @returns A string containing the TypeScript type definitions for preload operations.
       */
      function printPreloadTypes() {
        const primitiveType = `
        type Primitive =
            | null
            | undefined
            | string
            | number
            | boolean
            | symbol
            | bigint`
        const fieldSelectorType = `export type FieldSelector<Entity> = {
                   [Key in keyof Entity]-?:
                     Entity[Key] extends (infer ItemType)[]
                       ? ItemType extends Primitive
                         ? Key
                         : { [P in Key]: FieldSelector<ItemType>[] }
                       : Entity[Key] extends Primitive
                         ? Key
                         : { [P in Key]: FieldSelector<Entity[Key]>[] }
                 } [keyof Entity];`
        const addFieldsType =
          'type AddFields<Args, TypeFields> = Args & { fields: FieldSelector<TypeFields>[] }'

        const generateIOType =
          `type GenerateIO<
          Key extends keyof Query,
          QueryArgs,
          Field = Query[Key],
          Entity = Field extends Array<infer IT1>
            ? IT1
            : Field extends Maybe<infer IT2>
              ? NonNullable<IT2>
              : Field,
          Wrapper = Field extends Array<infer _>
            ? 'array'
            : Field extends Maybe<infer _>
              ? 'maybe'
              : 'simple'
        > = {
          entity: Entity;
          input: AddFields<QueryArgs, Entity>;
          output: Field;
          wrapper: Wrapper;
        }`
        return [
          primitiveType,
          '',
          fieldSelectorType,
          '',
          addFieldsType,
          '',
          generateIOType
        ].join('\n')
      }

      /**
       * Generates a key-value pair for a given field name in the QueryIO type.
       * @param fieldName - The name of the field to generate the key-value pair for.
       * @returns A string representing the key-value pair for the QueryIO type.
       */
      function generateTypeKV(fieldName: string) {
        // Since there's no Query Args type for squidStatus, we don't need to handle the GenerateIO type for it
        if (fieldName === 'squidStatus') {
          return `${fieldName}: GenerateIO<'${fieldName}', {}>`
        }
        return `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`
      }

      /**
       * Generates the TypeScript type definition for EntityQueryMap.
       * @returns A string containing the TypeScript type definition for EntityQueryMap.
       */
      function printEntityQueryMap() {
        const queryType = schema.getQueryType()
        const queryFields = queryType!.getFields()
        const queryFieldsNames = Object.keys(queryFields)
        return `export type EntityQueryMap = {
        ${queryFieldsNames.map(generateTypeKV).join('\n  ')}
      }`
      }

      // Note: Return like this with the weird indentation is to match the indentation of the original file
      return `${printPreloadTypes()}

${printEntityQueryMap()}`
    }
  }
}
