import { useAuth0 } from '../utils/auth0'

const Index = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <div>
      <h1>Initial Page</h1>

      <div>
        {!isAuthenticated && (
          <button onClick={loginWithRedirect}>Log in</button>
        )}

        {isAuthenticated && (
          <div>
            <p>{user && user.nickname}</p>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index

// TODO: Add Styled Components
// TODO: Add authorization to graphql/fauna
