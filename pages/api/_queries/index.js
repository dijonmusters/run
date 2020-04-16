import { allRuns } from '../_db'

const runs = async (_, __, user) => await allRuns(user)

export { runs }
