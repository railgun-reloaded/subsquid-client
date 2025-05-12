import type { CodegenPlugin } from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, GraphQLObjectType, GraphQLInterfaceType, GraphQLNamedType, GraphQLOutputType, GraphQLNonNull, GraphQLList } from 'graphql';

function isInterfaceType(type: GraphQLNamedType): type is GraphQLInterfaceType { 
  return (type as any)?.astNode?.kind === 'InterfaceTypeDefinition' || type instanceof GraphQLInterfaceType; 
}

function isObjectType(type: GraphQLNamedType): type is GraphQLObjectType { 
  return (type as any)?.astNode?.kind === 'ObjectTypeDefinition' || type instanceof GraphQLObjectType; 
}

function getImplementors(interfaceType: GraphQLInterfaceType, schema: GraphQLSchema): GraphQLObjectType[] {
  return Object.values(schema.getTypeMap())
    .filter(type => isObjectType(type) && type.getInterfaces().some(int => int.name === interfaceType.name)) as GraphQLObjectType[];
}

function unwrapType(type: GraphQLOutputType): GraphQLNamedType {
  if (type instanceof GraphQLNonNull || type instanceof GraphQLList) {
    return unwrapType(type.ofType as GraphQLOutputType);
  }
  return type;
}

module.exports = <CodegenPlugin>{
  plugin: function(schema, _documents, _config) {
    if (!schema.getQueryType()) {
      throw new Error('No query type found in schema')
    }

    function capitalize(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function generateTypeNameToTypeMap(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const typeNames = Object.keys(types).filter(name => !name.startsWith('__')).sort();

      const mapEntries = typeNames
        .map(name => `  '${name}': ${name};`)
        .join('\n');

      return `export type TypeNameToType = {${mapEntries}}`;
    }

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
    }

    function generateFragmentKeyToTypeMap(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();

      const mapEntries: string[] = [];
      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType;
        const implementors = getImplementors(interfaceType, schema);
        implementors.forEach(impl => {
          // Map fragment key string ("... on Type") to implementor name string ("Type")
          // Use regular string quotes instead of backticks to avoid syntax issues
          mapEntries.push(`  "... on ${impl.name}": '${impl.name}';`);
        });
      }

      return `export type FragmentKeyToType = {${mapEntries.join('\n')}}`;
    }

    function generateInterfaceFragmentInputTypes(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();
      const fragmentTypes: string[] = [];

      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType;
        const implementors = getImplementors(interfaceType, schema);

        const fragmentUnionMembers = implementors.map(implType => {
          // Structure: { readonly "... on TypeName": readonly FieldSelector<TypeName>[] }
          // Uses the original generated FieldSelector type
          const implSelection = `FieldSelector<TypeNameToType['${implType.name}']>`; // Use TypeNameToType to reference implementor type
          return `{ readonly "... on ${implType.name}": readonly ${implSelection}[] }`;
        }).join('\n  | ');

        const fragmentTypeName = `${interfaceName}FragmentsInput`;
        fragmentTypes.push(`export type ${fragmentTypeName} = ${fragmentUnionMembers || '{}'};`); // Provide {} for interfaces with no implementors
      }

      return fragmentTypes.join('\n\n');
    }

    function generateQueryFieldsInputMap(schema: GraphQLSchema): string {
      const queryType = schema.getQueryType();
      const queryFields = queryType!.getFields(); // Assume queryType is not null
      const types = schema.getTypeMap(); // All schema types

      const queryFieldsMapEntries: string[] = [];

      for (const queryFieldName of Object.keys(queryFields)) {
        const queryField = queryFields[queryFieldName];
        // Skip if queryField is undefined
        if (!queryField) {
          console.warn(`Query field "${queryFieldName}" is undefined. Skipping.`);
          continue;
        }
        const returnType = queryField.type;
        const baseReturnType = unwrapType(returnType);
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

    function printPreloadTypes() {
      // First add missing scalar type definitions that might be referenced in the schema
      const scalarDefinitions = `
      // Define missing scalar types that might be referenced
      type Bytes = string;
      type BigInt = string;
      type Int = number;
      // Note: Maybe is already defined by GraphQL Codegen so we don't need to define it again
      `;

      const primitiveType = `
      type Primitive =
          | null
          | undefined
          | string
          | number
          | boolean
          | symbol
          | bigint`;

      const fieldSelectorType = `export type FieldSelector<Entity> = {
               [Key in keyof Entity]-?:
                 Entity[Key] extends (infer ItemType)[]
                   ? ItemType extends Primitive
                     ? Key
                     : { [P in Key]: FieldSelector<ItemType>[] }
                   : Entity[Key] extends Primitive
                     ? Key
                     : { [P in Key]: FieldSelector<Entity[Key]>[] }
             } [keyof Entity];`;

      const addFieldsType = 'type AddFields<Args, TypeFields> = Args & { fields: FieldSelector<TypeFields>[] }';

      const generateIOType = `type GenerateIO<
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
    }`;

      return [
        scalarDefinitions,
        '',
        primitiveType,
        '',
        fieldSelectorType,
        '',
        addFieldsType,
        '',
        generateIOType
      ].join('\n');
    }

    function generateTypeKV(fieldName: string) {
      // Since there's no Query Args type for squidStatus, we don't need to handle the GenerateIO type for it
      if (fieldName === 'squidStatus') {
        return `${fieldName}: GenerateIO<'${fieldName}', {}>`;
      }
      return `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`;
    }

    function printEntityQueryMap() {
      const queryType = schema.getQueryType();
      const queryFields = queryType!.getFields();
      const queryFieldsNames = Object.keys(queryFields);
      return `export type EntityQueryMap = {
      ${queryFieldsNames.map(generateTypeKV).join('\n  ')}
    }`;
    }

    // Generate all types including the new fragment support
    const typeNameToTypeMap = generateTypeNameToTypeMap(schema);
    const interfaceImplementorsMap = generateInterfaceImplementorsMap(schema);
    const fragmentKeyToTypeMap = generateFragmentKeyToTypeMap(schema);
    const interfaceFragmentInputTypes = generateInterfaceFragmentInputTypes(schema);
    const queryFieldsInputMap = generateQueryFieldsInputMap(schema);
    
    // Note: Return with the indentation to match the original file
    return `${printPreloadTypes()}

${printEntityQueryMap()}

${typeNameToTypeMap}

${interfaceImplementorsMap}

${fragmentKeyToTypeMap}

${interfaceFragmentInputTypes}

${queryFieldsInputMap}`;
  }
};