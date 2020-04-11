import { connectDb } from '../_db'

const resolver = async (
  _,
  { input: { distance, time, pace, elevation, imageUrl } }
) => {
  const { Run } = await connectDb()
  const newRun = await Run.create({ distance, time, pace, elevation, imageUrl })
  return newRun
}

export default resolver
