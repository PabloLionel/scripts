const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');
const { join } = require('path');
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: require('./lib/resolvers'),
});
// (async /* main */ () => {
  /**
   * sin los resolvers tenemos la siguiente salida:
   * { data: [Object: null prototype] { hello: null } }
   * luego de definir los resolvers:
   * { data: [Object: null prototype] { hello: 'Hola mundo' } }
   */
//   console.log(await graphql(schema, '{hello}', resolvers));
// })()

module.exports = {
  schema,
}
