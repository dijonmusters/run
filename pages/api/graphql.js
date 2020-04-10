import { ApolloServer, gql } from 'apollo-server-micro'
import { hello, goodbye } from './_queries/'

const typeDefs = gql`
  type Query {
    hello: String
    goodbye: String
  }
`

console.log(hello)

const resolvers = {
  Query: {
    hello,
    goodbye,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
