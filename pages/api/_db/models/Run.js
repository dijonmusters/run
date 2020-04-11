import mongoose from 'mongoose'

const schema = {
  distance: Number,
  time: Number,
  pace: Number,
  elevation: Number,
  imageUrl: String,
}

export default mongoose.model('Run', schema)
