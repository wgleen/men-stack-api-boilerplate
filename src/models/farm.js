import { Schema, model } from 'mongoose'

export const FarmNDVISchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

export const FarmPrecipitationSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

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
  },
  ndvi: {
    type: [FarmNDVISchema],
    default: []
  },
  precipitation: {
    type: [FarmPrecipitationSchema],
    default: []
  }
})

export default model('Farm', FarmSchema)
