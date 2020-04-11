import mongoose from 'mongoose'
import Run from './models/Run'

const connectDb = async () => {
  if (mongoose.connection.readyState !== 1) {
    const uri = process.env.MONGO_URI
    try {
      await mongoose.connect(uri, { useNewUrlParser: true })
      console.log('connected to mongo db')
    } catch (error) {
      console.log(error)
    }
  }
  return { Run }
}

export { connectDb }
