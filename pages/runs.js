import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

const ALL_RUNS = gql`
  query AllRuns {
    runs {
      id
      distance
      time
    }
  }
`

const Run = styled.div`
  border: 1px solid black;
`

const renderRun = ({ id, distance, time }) => (
  <Run key={id}>
    <p>{distance}</p>
    <p>{time}</p>
  </Run>
)

const Runs = () => {
  const { loading, error, data } = useQuery(ALL_RUNS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return data.runs.map(renderRun)
}

export default Runs
