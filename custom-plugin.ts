module.exports = {
  plugin(schema, _documents, _config) {
  if (!schema.getQueryType()) {
    throw new Error('No query type found in schema');
  }

  function capitalize(str) {                          
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function printPreloadTypes() {
    const extractFieldsType = 
`export type ExtractFields<T, F extends (keyof T)[] | undefined> = F extends (keyof T)[]
  ? Pick<T, F[number]>
  : T;`;

    const addFieldsType = 
`type AddFields<Args, TypeFields> = Args & { fields: (keyof TypeFields)[] }`;

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
      extractFieldsType,
      '',
      addFieldsType,
      '',
      generateIOType
    ].join('\n');
  };

  function printQueryIO() {
    const queryType = schema.getQueryType();
    const queryFields = queryType.getFields();
    let queryFieldsNames = Object.keys(queryFields);
    queryFieldsNames = queryFieldsNames.filter(name => name !== 'squidStatus');  //TODO: Not using this query ??                                                                                                                                                            │ │
    return `export type QueryIO = {
  ${queryFieldsNames.map((fieldName) => `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>`).join('\n  ')}
}`;
  };

// return its done like this bc of indentation and keeping stuff _nice_ 
  return `${printPreloadTypes()}

${printQueryIO()}`;
  }
};
