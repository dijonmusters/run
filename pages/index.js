import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ALL_RUNS = gql`
  query AllRuns {
    runs {
      id
      distance
      time
    }
  }
`

const renderRun = ({ id, distance, time }) => (
  <div key={id}>
    <p>{distance}</p>
    <p>{time}</p>
  </div>
)

const Index = () => {
  const { loading, error, data } = useQuery(ALL_RUNS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.runs.map(renderRun)
}

export default Index
