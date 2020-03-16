const fs = require('fs')
const path = require('path')
const { ApolloServer } = require('apollo-server')

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync(path.join(__dirname, './schema.graphql'), { encoding: 'utf-8' })

const knex = require('./db/db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    knex,
    auth
  })
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
