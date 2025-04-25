import type { CodegenPlugin } from '@graphql-codegen/plugin-helpers'

module.exports = <CodegenPlugin> {
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
    function capitalize (str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /**
     * Generates TypeScript types for preload operations.
     * @returns A string containing the TypeScript type definitions for preload operations.
     */
    function printPreloadTypes () {
      const nestedFieldType = 'export type NestedField = string | { [fieldName: string]: NestedField[]; }'


      const addFieldsType =
        'type AddFields<Args> = Args & { fields: NestedField[] }'

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
          input: AddFields<QueryArgs>;
          output: Field;
          wrapper: Wrapper;
        }`
      return [
        nestedFieldType,
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
    function generateTypeKV (fieldName: string) {
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
    function printEntityQueryMap () {
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
