import { requireUser, useAuth0 } from '../utils/auth0'

const Dashboard = () => {
  const { user } = useAuth0()
  return <h1>Hi {user.nickname}, you have reached the dashboard!</h1>
}

export default requireUser(Dashboard)
