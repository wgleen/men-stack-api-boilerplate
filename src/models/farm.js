import { Schema, model } from 'mongoose'

export const FarmSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  culture: {
    type: String,
    required: true
  },
  variety: {
    type: String,
    required: true
  },
  totalArea: {
    type: Number,
    required: true
  },
  yieldEstimation: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

export default model('Farm', FarmSchema)
