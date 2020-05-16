const {faunaAdminKey} = require('./config');
const {createHttpLink } = require('apollo-link-http');
const { ApolloServer, makeRemoteExecutableSchema, introspectSchema } = require('apollo-server-micro');
const fetch = require('isomorphic-fetch');

const link = createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    fetch,
    headers: {
      Authorization: `Bearer ${faunaAdminKey}`,
    },
  })

  const schema = makeRemoteExecutableSchema({
    schema: introspectSchema(link),
    link,
  })

const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true
});

module.exports = (req, res, ...args) => {
    if (req.method === "OPTIONS") return res.status(200).send();
  
    const handler = server.createHandler();
  
    return handler(req, res, ...args);
  };