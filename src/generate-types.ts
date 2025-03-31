module.exports = {
  /**
   * Generates TypeScript types based on the provided GraphQL schema.
   * @param schema - The GraphQL schema object used to generate types.
   * @param _documents - Unused parameter for document definitions.
   * @param _config - Unused parameter for configuration options.
   * @returns A string containing the generated TypeScript types.
   */
  plugin (schema: any, _documents: any, _config: any) {
    if (!schema.getQueryType()) {
      throw new Error('No query type found in schema')
    }

    /**
     * Capitalizes the first letter of a given string.
     * @param str - The string to capitalize.
     * @returns The input string with its first letter converted to uppercase.
     */
    function capitalize (str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    /**
     * Generates TypeScript type definitions for preload-related utilities.
     * @returns A string containing the TypeScript type definitions for ExtractFields, AddFields, and GenerateIO.
     */
    function printPreloadTypes () {
      const extractFieldsType =
`export type ExtractFields<T, F extends (keyof T)[] | undefined> = F extends (keyof T)[]
  ? Pick<T, F[number]>
  : T;`

      const addFieldsType =
'type AddFields<Args, TypeFields> = Args & { fields: (keyof TypeFields)[] }'

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
        extractFieldsType,
        '',
        addFieldsType,
        '',
        generateIOType
      ].join('\n')
    };

    /**
     * Generates a key-value pair for a specific query field name.
     * @param fieldName - The name of the query field.
     * @returns A string representing the key-value pair for the query field.
     */
    function generateTypeKV (fieldName: string) {
    // Since there's no Query Args type for squidStatus, we don't need to handle the GenerateIO type for it
      if (fieldName === 'squidStatus') {
        return `${fieldName}: GenerateIO<'${fieldName}', {}>`
      }
      return `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`
    }

    /**
     * Generates TypeScript types for the QueryIO object based on the schema's query fields.
     * @returns A string representing the TypeScript type definition for QueryIO.
     */
    function printQueryIO () {
      const queryType = schema.getQueryType()
      const queryFields = queryType.getFields()
      const queryFieldsNames = Object.keys(queryFields)
      return `export type QueryIO = {
  ${queryFieldsNames.map(generateTypeKV).join('\n  ')}
}`
    };

    // Note: Return like this with the weird indentation is to match the indentation of the original file
    return `${printPreloadTypes()}

${printQueryIO()}`
  }
}
