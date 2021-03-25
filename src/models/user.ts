import { Schema, model, Document } from 'mongoose'

export interface IUser {
  _id: string
  username: string
  email: string
  password: string
}

export interface IUserDocument extends IUser, Document {
  _id: string
}

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

export default model('User', UserSchema)
