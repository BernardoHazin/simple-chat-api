const fs = require('fs')
const path = require('path')
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'mysecret'

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync(path.join(__dirname, './schema.graphql'), { encoding: 'utf-8' })

const knex = require('./db/db')

function checkForAuth({ authorization }) {
  if (authorization) {
    const [tk] = authorization.match(/[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, 'g')
    if (tk) {
      return new Promise((resolve, reject) => {
        jwt.verify(tk, SECRET, function(err, decoded) {
          if (err) return reject(err)
          return resolve(decoded)
        })
      })
    }
  }
  return {}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        knex,
        connection
      }
    }
    return {
      knex,
      auth: await checkForAuth(req.headers)
    }
  }
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
