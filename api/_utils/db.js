const {faunaServerKey} = require('./config');
const faunadb = require('faunadb');
const query = faunadb.query;
function createClient() {
  if (!faunaServerKey) {
    throw new Error(
      `No FAUNA_SERVER key found in environment, skipping client creation`
    );
  }
  const client = new faunadb.Client({
    secret: faunaServerKey
  });
  return client;
}
exports.client = createClient();
exports.query = query;
