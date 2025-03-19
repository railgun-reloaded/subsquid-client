module.exports = {
  plugin(schema, _documents, _config) {

  console.log('///////////////BEGIN CUSTOM PLUGIN///////////////');
  // Get all query types from the schema

    // HELPERS 
    function capitalize(str) {                          
      return str.charAt(0).toUpperCase() + str.slice(1);
    }                                                       
    // FINISH HELPERS 

  function printQueryIO() {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new Error('No query type found in schema');
    }
    const queryFields = queryType.getFields();
    const queryFieldsNames = Object.keys(queryFields);

    const queryIOKvs = queryFieldsNames.map((fieldName) => {
      const queryFieldKv = `${fieldName}: GenerateIO<'${fieldName}', Query${capitalize(fieldName)}Args>\n`;
      return queryFieldKv;
    });
    const queryIOTemplate = `type QueryIO = {
        ${queryIOKvs}
      }
    `;
    return queryIOTemplate;
  };

  return `${printQueryIO()}`;
  }
};
