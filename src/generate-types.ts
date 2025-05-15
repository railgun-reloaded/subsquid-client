import type { CodegenPlugin } from '@graphql-codegen/plugin-helpers'
import type { GraphQLNamedType, GraphQLOutputType, GraphQLSchema } from 'graphql'
import { GraphQLInterfaceType, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql'

/**
 * Checks if a GraphQL type is an interface type
 * @param type GraphQL named type to check
 * @returns True if the type is an interface type
 */
function isInterfaceType (type: GraphQLNamedType): type is GraphQLInterfaceType {
  return (type as any)?.astNode?.kind === 'InterfaceTypeDefinition' || type instanceof GraphQLInterfaceType
}

/**
 * Checks if a GraphQL type is an object type
 * @param type GraphQL named type to check
 * @returns True if the type is an object type
 */
function isObjectType (type: GraphQLNamedType): type is GraphQLObjectType {
  return (type as any)?.astNode?.kind === 'ObjectTypeDefinition' || type instanceof GraphQLObjectType
}

/**
 * Gets all object types that implement a specific interface
 * @param interfaceType The interface type to find implementors for
 * @param schema The GraphQL schema
 * @returns Array of object types that implement the interface
 */
function getImplementors (interfaceType: GraphQLInterfaceType, schema: GraphQLSchema): GraphQLObjectType[] {
  return Object.values(schema.getTypeMap())
    .filter(type => isObjectType(type) && type.getInterfaces().some(int => int.name === interfaceType.name)) as GraphQLObjectType[]
}

/**
 * Unwraps a GraphQL output type from NonNull and List wrappers
 * @param type The GraphQL output type to unwrap
 * @returns The unwrapped named type
 */
function unwrapType (type: GraphQLOutputType): GraphQLNamedType {
  if (type instanceof GraphQLNonNull || type instanceof GraphQLList) {
    return unwrapType(type.ofType as GraphQLOutputType)
  }
  return type
}

module.exports = <CodegenPlugin>{
  /**
   * Plugin function that generates TypeScript types from GraphQL schema
   * @param schema The GraphQL schema
   * @param _documents GraphQL documents (unused)
   * @param _config Plugin configuration (unused)
   * @returns Generated TypeScript type definitions
   */
  plugin: function (schema, _documents, _config) {
    if (!schema.getQueryType()) {
      throw new Error('No query type found in schema')
    }

    /**
     * Capitalizes the first letter of a string
     * @param str String to capitalize
     * @returns Capitalized string
     */
    function capitalize (str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /**
     * Generates a TypeScript type mapping GraphQL type names to their corresponding types
     * @param schema The GraphQL schema
     * @returns TypeScript type definition as a string
     */
    function generateTypeNameToTypeMap (schema: GraphQLSchema): string {
      const types = schema.getTypeMap()
      const typeNames = Object.keys(types).filter(name => !name.startsWith('__')).sort()

      const mapEntries = typeNames
        .map(name => `  '${name}': ${name};`)
        .join('\n')

      return `export type TypeNameToType = {${mapEntries}}`
    }

    /**
     * Generates a TypeScript type mapping interface names to their implementor type names
     * @param schema The GraphQL schema
     * @returns TypeScript type definition as a string
     */
    function generateInterfaceImplementorsMap (schema: GraphQLSchema): string {
      const types = schema.getTypeMap()
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort()

      const mapEntries: string[] = []
      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType
        const implementors = getImplementors(interfaceType, schema)
        const implementorNamesUnion = implementors.map(impl => `'${impl.name}'`).join(' | ')
        if (implementorNamesUnion) {
          mapEntries.push(`  '${interfaceName}': ${implementorNamesUnion};`)
        }
      }

      return `export type InterfaceImplementorsMap = {${mapEntries.join('\n')}}`
    }

    /**
     * Generates a TypeScript type mapping fragment keys to their type names
     * @param schema The GraphQL schema
     * @returns TypeScript type definition as a string
     */
    function generateFragmentKeyToTypeMap (schema: GraphQLSchema): string {
      const types = schema.getTypeMap()
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort()

      const mapEntries: string[] = []
      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType
        const implementors = getImplementors(interfaceType, schema)
        implementors.forEach(impl => {
          // Map fragment key string ("... on Type") to implementor name string ("Type")
          mapEntries.push(`  "... on ${impl.name}": '${impl.name}';`)
        })
      }

      return `export type FragmentKeyToType = {${mapEntries.join('\n')}}`
    }

    /**
     * Generates TypeScript types for interface fragment inputs
     * @param schema The GraphQL schema
     * @returns TypeScript type definitions as a string
     */
    function generateInterfaceFragmentInputTypes (schema: GraphQLSchema): string {
      const types = schema.getTypeMap()
      const interfaceNames = Object.keys(types).filter(name => isInterfaceType(types[name] as GraphQLNamedType)).sort()
      const fragmentTypes: string[] = []

      for (const interfaceName of interfaceNames) {
        const interfaceType = types[interfaceName] as GraphQLInterfaceType
        const implementors = getImplementors(interfaceType, schema)

        const fragmentUnionMembers = implementors.map(implType => {
          // Structure: { readonly "... on TypeName": readonly FieldSelector<TypeName>[] }
          // Uses the original generated FieldSelector type
          const implSelection = `FieldSelector<TypeNameToType['${implType.name}']>` // Use TypeNameToType to reference implementor type
          return `{ readonly "... on ${implType.name}": readonly ${implSelection}[] }`
        }).join('\n  | ')

        const fragmentTypeName = `${interfaceName}FragmentsInput`
        fragmentTypes.push(`export type ${fragmentTypeName} = ${fragmentUnionMembers || '{}'};`) // Provide {} for interfaces with no implementors
      }

      return fragmentTypes.join('\n\n')
    }

    /**
     * Generates a TypeScript type mapping query field names to their input types
     * @param schema The GraphQL schema
     * @returns TypeScript type definition as a string
     */
    function generateQueryFieldsInputMap (schema: GraphQLSchema): string {
      const queryType = schema.getQueryType()
      const queryFields = queryType!.getFields() // Assume queryType is not null
      const types = schema.getTypeMap() // All schema types

      const queryFieldsMapEntries: string[] = []

      for (const queryFieldName of Object.keys(queryFields)) {
        const queryField = queryFields[queryFieldName]
        // Skip if queryField is undefined
        if (!queryField) {
          console.warn(`Query field "${queryFieldName}" is undefined. Skipping.`)
          continue
        }
        const returnType = queryField.type
        const baseReturnType = unwrapType(returnType)
        const baseReturnTypeName = baseReturnType?.name

        let allowedFieldsType: string

        if (baseReturnTypeName && baseReturnTypeName in types && isInterfaceType(types[baseReturnTypeName] as GraphQLNamedType)) {
          // If query returns an interface, allowed fields are base interface fields OR fragments for that interface
          // Use the original FieldSelector for base fields, applied to the base interface type via TypeNameToType
          // Use the generated fragment input type for fragments
          const fragmentTypeName = `${baseReturnTypeName}FragmentsInput`
          allowedFieldsType = `readonly (FieldSelector<TypeNameToType['${baseReturnTypeName}']> | ${fragmentTypeName})[]`
        } else if (baseReturnTypeName && baseReturnTypeName in types) {
          // If query returns a concrete type (object, scalar, enum), only allow standard FieldSelector selection
          allowedFieldsType = `readonly FieldSelector<TypeNameToType['${baseReturnTypeName}']>[]` // Use TypeNameToType
        } else {
          console.warn(`Skipping query field "${queryFieldName}" with unexpected base return type name "${baseReturnTypeName}". Falling back to readonly any[].`)
          allowedFieldsType = 'readonly any[]' // Fallback
        }

        queryFieldsMapEntries.push(`  '${queryFieldName}': ${allowedFieldsType};`)
      }

      return `export type QueryFieldsInputMap = {${queryFieldsMapEntries.join('\n')}}`
    }

    /**
     * Generates preload types that are required by the generated code
     * @returns TypeScript type definitions as a string
     */
    function printPreloadTypes () {
      // First add missing scalar type definitions that might be referenced in the schema
      const scalarDefinitions = `
      // Define missing scalar types that might be referenced
      type Bytes = string;
      type BigInt = string;
      type Int = number;
      // Note: Maybe is already defined by GraphQL Codegen so we don't need to define it again
      `

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

      const addFieldsType = 'type AddFields<Args, TypeFields> = Args & { fields: FieldSelector<TypeFields>[] }'

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
    }`

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
      ].join('\n')
    }

    /**
     * Generates a key-value pair for the EntityQueryMap type
     * @param fieldName Name of the query field
     * @returns TypeScript type mapping as a string
     */
    function generateTypeKV (fieldName: string) {
      // Since there's no Query Args type for squidStatus, we don't need to handle the GenerateIO type for it
      if (fieldName === 'squidStatus') {
        return `${fieldName}: GenerateIO<'${fieldName}', {}>`
      }
      return `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`
    }

    /**
     * Generates the EntityQueryMap type that maps entity names to their query types
     * @returns TypeScript type definition as a string
     */
    function printEntityQueryMap () {
      const queryType = schema.getQueryType()
      const queryFields = queryType!.getFields()
      const queryFieldsNames = Object.keys(queryFields)
      return `export type EntityQueryMap = {
      ${queryFieldsNames.map(generateTypeKV).join('\n  ')}
    }`
    }

    // Generate all types including the new fragment support
    const typeNameToTypeMap = generateTypeNameToTypeMap(schema)
    const interfaceImplementorsMap = generateInterfaceImplementorsMap(schema)
    const fragmentKeyToTypeMap = generateFragmentKeyToTypeMap(schema)
    const interfaceFragmentInputTypes = generateInterfaceFragmentInputTypes(schema)
    const queryFieldsInputMap = generateQueryFieldsInputMap(schema)

    // Note: Return with the indentation to match the original file
    return `${printPreloadTypes()}

${printEntityQueryMap()}

${typeNameToTypeMap}

${interfaceImplementorsMap}

${fragmentKeyToTypeMap}

${interfaceFragmentInputTypes}

${queryFieldsInputMap}`
  }
}
