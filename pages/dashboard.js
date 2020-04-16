import { requireUser, useAuth0 } from '../utils/auth0'
import styled from 'styled-components'

const Title = styled.h1`
  border: 1px solid red;
`

const Dashboard = () => {
  const { user } = useAuth0()
  return <Title>Hi {user.nickname}, you have reached the dashboard!</Title>
}

export default requireUser(Dashboard)
