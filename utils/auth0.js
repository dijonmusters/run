import createAuth0Client from '@auth0/auth0-spa-js'
import { useRouter } from 'next/router'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext(null)
export const useAuth0 = () => React.useContext(Auth0Context)

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  domain,
  clientId,
  redirectUri,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState()
  const [user, setUser] = React.useState()
  const [auth0Client, setAuth0] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const [popupOpen, setPopupOpen] = React.useState(false)
  const host = typeof window !== 'undefined' ? window.location.origin : ''

  React.useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({
        domain,
        client_id: clientId,
        redirect_uri: `${host}${redirectUri}`,
      })
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }

    initAuth0()
  }, [])

  const loginWithPopup = async () => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  const handleLogout = (p) => {
    localStorage.removeItem('token')
    auth0Client.logout({
      ...p,
      returnTo: host,
    })
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => handleLogout(...p),
      }}
    >
      {loading ? <p>Loading...</p> : children}
    </Auth0Context.Provider>
  )
}

export const requireUser = (page) => {
  return (props) => {
    const router = useRouter()
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

    React.useEffect(() => {
      if (loading || isAuthenticated) {
        return
      }

      const fn = async () => {
        await loginWithRedirect({
          appState: { targetUrl: router.asPath },
        })
      }
      fn()
    }, [loading, isAuthenticated, loginWithRedirect, router.pathname])

    if (loading || !isAuthenticated) {
      return null
    }

    return React.createElement(page, props)
  }
}
