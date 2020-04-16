import { useEffect } from 'react'
import { useAuth0 } from '../utils/auth0'

const Callback = () => {
  const { getIdTokenClaims } = useAuth0()

  const getToken = async () => {
    const { __raw: token } = await getIdTokenClaims()
    localStorage.setItem('token', token)
  }

  useEffect(() => {
    getToken()
  }, [])

  return null
}

export default Callback
