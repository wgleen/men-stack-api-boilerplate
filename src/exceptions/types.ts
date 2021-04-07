import mongoose from 'mongoose'

export interface IError {
  name: string
  message: string
  status: number
  code: number
  stack?: IError
  meta?: Record<string, unknown>
  errors?: {
    [path: string]: mongoose.Error.ValidatorError | mongoose.Error.CastError
  }
}
