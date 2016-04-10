/*
 * service type schema
 */
function schema(types) {
  return {
    name: 'jobService',
    def: {
      status: {
        type: types.STRING
      }
    }
  };
}


module.exports = {
  schema: schema
};
