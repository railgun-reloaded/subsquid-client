module.exports = {
  plugin(schema, documents, config) {

  function isListType(type) {
    return type.toString().startsWith('[') && type.toString().endsWith(']');
  }

  function isNullableType(type) {
    return !type.toString().endsWith('!');
  }

  function unwrapType(type) {
    // Unwrap from List and Non-null wrappers to get the base type
    let baseType = type;
    while (baseType.ofType) {
      baseType = baseType.ofType;
    }
    return baseType;
  }

  function printType(type) {
    if (type.kind === 'NON_NULL') {
      return `${printType(type.ofType)}`;
    } else if (type.kind === 'LIST') {
      return `Array<${printType(type.ofType)}>`;
    } else {
      return `InputMaybe<${type.name}>`;
    }
  }

  console.log('PLUGIN///////////////');
  // Get all query types from the schema
  const queryType = schema.getQueryType();

  console.log('query type; ', queryType);

  if (!queryType) {
    throw new Error('No query type found in schema');
  }

  const queryFields = queryType.getFields();

  console.log('query type; ', queryFields);

  // Let's extract one specific field as a test case (e.g., 'ciphertexts')
  const sampleField = queryFields['ciphertexts'];
  if (!sampleField) {
    return '// No ciphertexts field found in schema';
  }

  console.log('sampleFields: ', sampleField)

  // Extract return type
  const returnType = sampleField.type;
  const isArray = isListType(returnType);
  const isMaybe = isNullableType(returnType);

  const entityType = unwrapType(returnType);
  const entityName = entityType.name;

  const argsMap = sampleField.args.reduce((acc, arg) => {
    acc[arg.name] = printType(arg.type);
    return acc;
  }, {});

  const wrapper = isArray ? 'array' : isMaybe ? 'maybe' : 'simple';

  return `
    // Test generation for a single type
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
        entity: Entity,
        input: AddFields<QueryArgs, Entity>
        output: Field
        wrapper: Wrapper
    }

    type AddFields<Args, TypeFields> = Args & { fields: (keyof TypeFields)[] }

    // Sample generated type for ciphertexts
    type CiphertextsIO = GenerateIO<'ciphertexts', QueryCiphertextsArgs>;

    // This would be part of the full QueryIO type
    type PartialQueryIO = {
      ciphertexts: GenerateIO<'ciphertexts', QueryCiphertextsArgs>,
    };

    // Sample QueryInput (partial)
    type PartialQueryInput = {
      ciphertexts?: PartialQueryIO['ciphertexts']['input']
    };

    // This is what our query function signature would look like for this field
    async function querySample<T extends PartialQueryInput>(input: T & Record<Exclude<keyof T, keyof PartialQueryInput>, never>): Promise<T> {
      // Implementation logic
      return {} as any;
    }
    `;
    }
};
