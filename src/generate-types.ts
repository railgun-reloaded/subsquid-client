import type { CodegenPlugin } from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, GraphQLObjectType, GraphQLInterfaceType, GraphQLNamedType /* Removed: buildASTSchema, isScalarType, isEnumType */ } from 'graphql'; // Import necessary GraphQL types

function isInterfaceType(type: GraphQLNamedType): type is GraphQLInterfaceType { return (type as any)?.astNode?.kind === 'InterfaceTypeDefinition' || type instanceof GraphQLInterfaceType; }
function isObjectType(type: GraphQLNamedType): type is GraphQLObjectType { return (type as any)?.astNode?.kind === 'ObjectTypeDefinition' || type instanceof GraphQLObjectType; }
function getImplementors(interfaceType: GraphQLInterfaceType, schema: GraphQLSchema): GraphQLObjectType[] {
    return Object.values(schema.getTypeMap())
        .filter(type => isObjectType(type) && type.getInterfaces().some(int => int.name === interfaceType.name)) as GraphQLObjectType[];
}

module.exports = <CodegenPlugin>{
  /**
   * Main plugin function. Generates all required TypeScript types.
   * All helper functions are defined locally within this function.
   * @param schema - The GraphQL schema object.
   * @returns A string containing the generated TypeScript types.
   */
  plugin: function (schema: GraphQLSchema, _documents: any, _config: any) {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new Error('No query type found in schema');
    }

    function capitalize(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
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
          const baseReturnType = (returnType as any).ofType || returnType;
          const baseReturnTypeName = (baseReturnType as any)?.name;

          let allowedFieldsType: string;

          if (baseReturnTypeName && baseReturnTypeName in types && isInterfaceType(types[baseReturnTypeName] as GraphQLNamedType)) {
              const fragmentTypeName = `${baseReturnTypeName}FragmentsInput`;
              allowedFieldsType = `readonly (FieldSelector<TypeNameToType['${baseReturnTypeName}']> | ${fragmentTypeName})[]`;
          } else if (baseReturnTypeName && baseReturnTypeName in types) {
              allowedFieldsType = `readonly FieldSelector<TypeNameToType['${baseReturnTypeName}']>[]`;
          } else {
              console.warn(`Skipping query field "${queryFieldName}" with unexpected base return type name "${baseReturnTypeName}". Falling back to readonly any[].`);
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
           const baseReturnType = (returnType as any).ofType || returnType;
           const baseReturnTypeName = (baseReturnType as any)?.name;
           const isArray = (returnType as any).astNode?.kind === 'ListType';
           const isNullable = !((returnType as any).astNode?.kind === 'NonNullType');
           let wrapper = isArray ? 'array' : (isNullable ? 'maybe' : 'simple');

           const entityName = baseReturnTypeName;

           if (!entityName || entityName.startsWith('__')) {
                console.warn(`Skipping query field "${queryFieldName}" with unexpected return type name: "${entityName}".`);
                queryOutputMapEntries.push(`  '${queryFieldName}': any,`);
                continue;
           }

           let unwrappedOutputShape: string;
           const isBaseTypeInterface = entityName in types && isInterfaceType(types[entityName] as GraphQLNamedType);

           if (isBaseTypeInterface) {
               unwrappedOutputShape = `BuildDiscriminatedUnionOutput<'${entityName}', FieldSelector<${entityName}>>`;
           } else if (entityName in types) {
                unwrappedOutputShape = `BuildSelectedShape<FieldSelector<${entityName}>, TypeNameToType['${entityName}']>`;
           } else {
                console.warn(`Cannot determine output shape for query field "${queryFieldName}" with base type name "${entityName}". Base type name not found in schema types. Falling back to any.`);
                unwrappedOutputShape = `any`;
           }

          let finalOutputType = unwrappedOutputShape;
          if (wrapper === 'array') {
              finalOutputType = `readonly ${unwrappedOutputShape}[]`;
          } else if (wrapper === 'maybe') {
              finalOutputType = `Maybe<${unwrappedOutputShape}>`;
          }

          queryOutputMapEntries.push(`  '${queryFieldName}': ${finalOutputType},`);
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
        generateFragmentKeyToTypeMap(schema),
        '',
        generateInterfaceFragmentInputTypes(schema),
        '',
        generateOutputShapeHelpers(),
        '',
        generateBuildDiscriminatedUnionOutputHelper(),
        '',
        generateQueryFieldsInputMap(schema),
        '',
        generateQueryOutputMap(schema),
        '',
    ].join('\n');

    return finalGeneratedContent;
  }
};
