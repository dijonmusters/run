import { connectDb } from '../_db'

const resolver = async () => {
  const { Run } = await connectDb()
  const runs = await Run.find()
  return runs
}

export default resolver
