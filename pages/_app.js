import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import withData from '../utils/apolloClient'
import { Auth0Provider } from '../utils/auth0'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo, router } = this.props
    const onRedirectCallback = (appState) =>
      router.push(appState && appState.targetUrl ? appState.targetUrl : '/')

    return (
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENT_ID}
        redirectUri="/callback"
        onRedirectCallback={onRedirectCallback}
      >
        <ApolloProvider client={apollo}>
          <Component {...pageProps} router={router} />
        </ApolloProvider>
      </Auth0Provider>
    )
  }
}

export default withData(MyApp)
