const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");



const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  cors: {
    origin: '*',
    credentials: true
  } });

server.listen().then(({ url }) => {
  console.log(`🚀 Mock GraphQL server ready at ${url}`);
});
