import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from '@apollo/link-context'
import fetch from 'isomorphic-unfetch'

const uri = '/api/graphql'

const authLink = setContext(async () => {
  const token = localStorage.getItem('token') || ''

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
})

const httpLink = createHttpLink({
  fetch,
  uri,
})

const getClient = ({ initialState }) =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  })

export default withApollo(getClient)
