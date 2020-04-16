import { allRuns } from '../_db'

const runs = async (_, __, user) => {
  console.log(user)
  return await allRuns(user)
}

export { runs }
