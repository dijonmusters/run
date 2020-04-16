import { ApolloServer, gql } from 'apollo-server-micro'
import { runs } from './_queries'
import { createRun } from './_mutations'
import { validateJwt } from './_utils/auth0'

const typeDefs = gql`
  type Run {
    id: String
    distance: Int
    time: Int
    pace: Int
    elevation: Int
    imageUrl: String
  }
  input RunInput {
    distance: Int
    time: Int
    pace: Int
    elevation: Int
    imageUrl: String
  }
  type Query {
    runs: [Run]
  }
  type Mutation {
    createRun(input: RunInput): Run
  }
`

const resolvers = {
  Query: {
    runs,
  },
  Mutation: {
    createRun,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: validateJwt,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = server.createHandler({ path: '/api/graphql' })

export default handler
