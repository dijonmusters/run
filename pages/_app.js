import React from 'react'
import App from 'next/app'
import { Auth0Provider } from '../utils/auth0'
import { ApolloProvider } from '@apollo/react-hooks'
import withApolloClient from '../utils/withApolloClient'

class MyApp extends App {
  render() {
    const { Component, pageProps, router, apollo } = this.props
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

export default withApolloClient(MyApp)
