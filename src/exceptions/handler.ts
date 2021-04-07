import { IError } from './types'
import ValidationError from './errors/validationError'
import MongoError from './errors/mongoError'

class ExceptionHandler {
  error: IError

  constructor(err: IError) {
    const newError = this.tryTransformError(err)

    this.error = {
      name: newError.name || 'ApplicationError',
      message: newError.message || 'Application Error',
      code: newError.code || 500,
      status: newError.status || 500,
      stack: newError
    }
  }

  private tryTransformError(err: IError): IError {
    switch (err.name) {
      case ValidationError.name: {
        return new ValidationError(err)
        break
      }

      case MongoError.name: {
        return new MongoError(err)
        break
      }

      default: {
        return err
      }
    }
  }
}

export default ExceptionHandler
