import { ApolloServer, gql } from 'apollo-server-micro'
import { runs } from './_queries/'
import { addRun } from './_mutations/'

const typeDefs = gql`
  type Run {
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
    addRun(input: RunInput): Run
  }
`

const resolvers = {
  Query: {
    runs,
  },
  Mutation: {
    addRun,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
