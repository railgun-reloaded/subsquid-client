import type { CodegenPlugin } from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, GraphQLObjectType, GraphQLInterfaceType, GraphQLNamedType, GraphQLOutputType, GraphQLList, GraphQLNonNull } from 'graphql'; // Removed unused imports

function isInterfaceType(type: GraphQLNamedType): type is GraphQLInterfaceType { return (type as any)?.astNode?.kind === 'InterfaceTypeDefinition' || type instanceof GraphQLInterfaceType; }
function isObjectType(type: GraphQLNamedType): type is GraphQLObjectType { return (type as any)?.astNode?.kind === 'ObjectTypeDefinition' || type instanceof GraphQLObjectType; }
function getImplementors(interfaceType: GraphQLInterfaceType, schema: GraphQLSchema): GraphQLObjectType[] {
    return Object.values(schema.getTypeMap())
        .filter(type => isObjectType(type) && type.getInterfaces().some(int => int.name === interfaceType.name)) as GraphQLObjectType[];
}

module.exports = <CodegenPlugin>{
  plugin: function (schema: GraphQLSchema, _documents: any, _config: any) {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new Error('No query type found in schema');
    }

    function capitalize(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Helper to recursively unwrap a GraphQL type
    function getBaseType(type: GraphQLOutputType): GraphQLNamedType {
        let currentType = type;
        // Check if it's a List or NonNull type wrapper
        while (currentType instanceof GraphQLList || currentType instanceof GraphQLNonNull) {
            // If it is, get the inner type using ofType
            currentType = (currentType as any).ofType; // Use `as any` to access `ofType` from the union
        }
        // The unwrapped type should be a NamedType
        return currentType as GraphQLNamedType; // Assert it's a NamedType
    }

    function printPreloadTypes() {
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
      const addFieldsType =
        'type AddFields<Args, TypeFields> = Args & { fields: FieldSelector<TypeFields>[] }';

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
        }`;
      return [
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
      if (fieldName === 'squidStatus') {
        return `${fieldName}: GenerateIO<'${fieldName}', {}>`;
      }
      return `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`;
    }

    function printEntityQueryMap(schema: GraphQLSchema) {
      const queryType = schema.getQueryType();
      const queryFields = queryType!.getFields();
      const queryFieldsNames = Object.keys(queryFields);
      return `export type EntityQueryMap = {
        ${queryFieldsNames.map(fieldName => generateTypeKV(fieldName)).join('\n  ')}
      }`;
    }

    function generateTypeNameToTypeMap(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const typeNames = Object.keys(types).filter(name => !name.startsWith('__')).sort();
      const mapEntries = typeNames
        .map(name => `  '${name}': ${name};`)
        .join('\n');
      return `export type TypeNameToType = {
${mapEntries}
};`;
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
      return `export type InterfaceImplementorsMap = {
${mapEntries.join('\n')}
};`;
    }

    function generateFragmentKeyToTypeMap(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();
      const mapEntries: string[] = [];
      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType;
        const implementors = getImplementors(interfaceType, schema);
        implementors.forEach(impl => {
          mapEntries.push(`  \`... on ${impl.name}\`: '${impl.name}';`);
        });
      }
      return `type FragmentKeyToType = {
${mapEntries.join('\n')}
};`;
    }

    function generateInterfaceFragmentInputTypes(schema: GraphQLSchema): string {
      const types = schema.getTypeMap();
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort();
      const fragmentTypes: string[] = [];
      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType;
        const implementors = getImplementors(interfaceType, schema);
        const fragmentUnionMembers = implementors.map(implType => {
          const implSelection = `FieldSelector<TypeNameToType['${implType.name}']>`;
          return `{ readonly \`... on ${implType.name}\`: readonly ${implSelection}[] }`;
        }).join('\n  | ');
        const fragmentTypeName = `${interfaceName}FragmentsInput`;
        fragmentTypes.push(`export type ${fragmentTypeName} = ${fragmentUnionMembers || '{}'};`);
      }
      return fragmentTypes.join('\n\n');
    }

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
              ? TargetEntity extends TypeNameToType[FragmentTargetEntityName]
                ? BuildSelectedShape<Subitems, TargetEntity>
                : never
              : never
            : Key extends keyof TargetEntity
              ? TargetEntity[Key] extends (infer NestedItemType)[]
                ? { readonly [P in Key]: readonly BuildSelectedShape<Subitems, NestedItemType>[] }
                : { readonly [P in Key]: BuildSelectedShape<TargetEntity[Key], Subitems> }
              : never
          : never
        : never
      : never;

type BuildSelectedShape<
  Selections extends readonly FieldSelector<any>[],
  TargetEntity
> =
  Selections extends readonly [infer Head extends FieldSelector<any>, ...infer Tail extends readonly FieldSelector<any>[]]
    ? ProcessSingleSelection<Head, TargetEntity> & (Tail extends readonly FieldSelector<any>[] ? BuildSelectedShape<Tail, TargetEntity> : {})
    : {};
`;
    }

    function generateBuildDiscriminatedUnionOutputHelper(): string {
        return `
type BuildDiscriminatedUnionOutput<
  InterfaceName extends keyof InterfaceImplementorsMap,
  Selections extends readonly FieldSelector<any>[]
> = InterfaceImplementorsMap[InterfaceName] extends infer ImplementorName extends keyof TypeNameToType
    ? TypeNameToType[ImplementorName] extends infer ImplementorType
      ? BuildSelectedShape<Selections, ImplementorType> & { readonly __typename: ImplementorName }
      : never
    : never;
`;
    }

    function generateQueryFieldsInputMap(schema: GraphQLSchema): string {
      const queryType = schema.getQueryType();
      const queryFields = queryType!.getFields();
      const types = schema.getTypeMap();

      const queryFieldsMapEntries: string[] = [];

      for (const queryFieldName of Object.keys(queryFields)) {
          const queryField = queryFields[queryFieldName];
          const returnType = queryField!.type;
          const baseType = getBaseType(returnType);
          const baseReturnTypeName = baseType.name;

          let allowedFieldsType: string;

          if (baseReturnTypeName in types && isInterfaceType(types[baseReturnTypeName] as GraphQLNamedType)) {
              const fragmentTypeName = `${baseReturnTypeName}FragmentsInput`;
              allowedFieldsType = `readonly (FieldSelector<TypeNameToType['${baseReturnTypeName}']> | ${fragmentTypeName})[]`;
          } else if (baseReturnTypeName in types) {
              allowedFieldsType = `readonly FieldSelector<TypeNameToType['${baseReturnTypeName}']>[]`;
          } else {
              console.warn(`Skipping query field "${queryFieldName}" with unhandled base return type name "${baseReturnTypeName}". Falling back to readonly any[].`);
              allowedFieldsType = `readonly any[]`;
          }

          queryFieldsMapEntries.push(`  '${queryFieldName}': ${allowedFieldsType},`);
      }
      return `export type QueryFieldsInputMap = {
${queryFieldsMapEntries.join('\n')}
};`;
    }

    function generateQueryOutputMap(schema: GraphQLSchema): string {
      const queryType = schema.getQueryType();
      const queryFields = queryType!.getFields();
      const types = schema.getTypeMap();

      const queryOutputMapEntries: string[] = [];

      for (const queryFieldName of Object.keys(queryFields)) {
           const queryField = queryFields[queryFieldName];
           const returnType = queryField!.type;
           const baseType = getBaseType(returnType);
           const baseReturnTypeName = baseType.name;

           // Determine wrapper type (array, maybe, simple) based on schema
           // Check the structure of the original returnType
           const isArray = returnType instanceof GraphQLList; // Correct check for list wrapper
           const isNullable = !(returnType instanceof GraphQLNonNull); // Correct check for non-null wrapper
           let wrapper = isArray ? 'array' : (isNullable ? 'maybe' : 'simple');


           const entityName = baseReturnTypeName; // Use the name from the reliably unwrapped type

           if (!entityName || entityName.startsWith('__')) {
                console.warn(`Skipping query field "${queryFieldName}" with unexpected base return type name: "${entityName}".`);
                queryOutputMapEntries.push(`  '${queryFieldName}': any,`);
                continue;
           }

           let unwrappedOutputShape: string;
           // Use baseType object directly with isInterfaceType check
           const isBaseTypeInterface = isInterfaceType(baseType); // Check if the baseType object is an interface

           if (isBaseTypeInterface) {
               // Uses generated BuildDiscriminatedUnionOutputHelper
               // Input fields type is FieldSelector<BaseInterfaceType>[]
               unwrappedOutputShape = `BuildDiscriminatedUnionOutput<'${entityName}', FieldSelector<${entityName}>>`; // Pass interface name string and input fields type (FieldSelector<InterfaceType>)
           } else if (entityName in types) { // Check if it's a known type name (should be if not interface)
               // Uses generated BuildSelectedShape
               // Input fields type is FieldSelector<BaseConcreteType>[]
                unwrappedOutputShape = `BuildSelectedShape<FieldSelector<${entityName}>, TypeNameToType['${entityName}']>`; // Pass input fields type (FieldSelector<ConcreteType>) and actual schema type
           } else {
               // This case should now be very rare, maybe impossible with getBaseType
                console.warn(`Cannot determine output shape for query field "${queryFieldName}" with base type name "${entityName}". Base type name not found in schema types. Falling back to any.`);
                unwrappedOutputShape = `any`; // Fallback
           }

          let finalOutputType = unwrappedOutputShape;
          // Apply wrapper string. Needs Maybe type to be available.
          if (wrapper === 'array') {
              finalOutputType = `readonly ${unwrappedOutputShape}[]`;
          }
          // Check for nullable wrapper on the *original* returnType
          if (isNullable && wrapper !== 'array') { // Apply Maybe only if the original type was nullable AND it's not an array
              finalOutputType = `Maybe<${finalOutputType}>`;
          }

          queryOutputMapEntries.push(`  '${queryFieldName}': ${finalOutputType},`); // Added comma
      }
      return `export type QueryOutputMap = {
${queryOutputMapEntries.join('\n')}
};`;
    }

    const finalGeneratedContent = [
        printPreloadTypes(),
        '',
        printEntityQueryMap(schema),
        '',
        generateTypeNameToTypeMap(schema),
        '',
        generateInterfaceImplementorsMap(schema),
        '',
        generateFragmentKeyToTypeMap(schema), // Internal helper type
        '',
        generateInterfaceFragmentInputTypes(schema), // Specific fragment input types
        '',
        generateOutputShapeHelpers(), // Internal output shape helpers
        '',
        generateBuildDiscriminatedUnionOutputHelper(), // Internal helper
        '',
        generateQueryFieldsInputMap(schema),
        '',
        generateQueryOutputMap(schema),
        '',
    ].join('\n');

    return finalGeneratedContent;
  }
};
