import mongoose from 'mongoose'
import BaseError from '../base'
import { IError } from '../types'

class ValidationError extends BaseError {
  meta: {
    properties: (mongoose.Error.ValidatorError | mongoose.Error.CastError)[]
  } = {
    properties: []
  }

  constructor(err: IError) {
    super(err.message)

    this.code = 400
    this.status = 400

    this.setProperties(err)
  }

  private setProperties(err: IError): void {
    for (const path in err.errors) {
      const propertyError = err.errors[path]

      this.meta.properties.push(propertyError)
    }
  }
}

export default ValidationError
