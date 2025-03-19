module.exports = {
  plugin(schema, _documents, _config) {

  // HELPERS 
  function capitalize(str) {                          
    return str.charAt(0).toUpperCase() + str.slice(1);
  }                                                       
  // FINISH HELPERS 

  function printPreloadTypes() {
    return `type ExtractFields<T, F extends (keyof T)[] | undefined> = F extends (keyof T)[]
  ? Pick<T, F[number]>
  : T;

type AddFields<Args, TypeFields> = Args & { fields: (keyof TypeFields)[] }

type GenerateIO<
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
  };

  function printQueryIO() {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new Error('No query type found in schema');
    }
    const queryFields = queryType.getFields();
    const queryFieldsNames = Object.keys(queryFields);
    
    return `type QueryIO = {
  ${queryFieldsNames.map((fieldName) => `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`).join('\n  ')}
}`;
  };

  return `${printPreloadTypes()}

${printQueryIO()}`;
  }
};
