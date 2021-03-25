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

export class BaseError implements IError {
  name = BaseError.name
  message = 'Base error'
  status = 500
  code = 500

  constructor(message?: string) {
    if (message) this.message = message
  }
}

export class ParamsError extends BaseError {
  name = ParamsError.name
  message = 'Params required'
  status = 400
  code = 400
}

export class InternalServerError extends BaseError {
  name = InternalServerError.name
  message = 'Internal server error'
  status = 500
  code = 500
}

export class NotFoundError extends BaseError {
  name = NotFoundError.name
  message = 'Resource not found'
  status = 404
  code = 404
}

export class UnauthorizedError extends BaseError {
  name = UnauthorizedError.name
  message = 'Unauthorized to access the resource'
  status = 401
  code = 401
}

export class MongoError extends BaseError {
  static MONGO_ERROR_CODES = {
    DUPLICATE_KEY_ERROR: 11000
  }

  name = MongoError.name
  message = 'Mongo error'
  status = 500
  code = 500

  constructor(err: IError) {
    super()

    this.setError(err)
  }

  private setError(err: IError): void {
    switch (err.code) {
      case MongoError.MONGO_ERROR_CODES.DUPLICATE_KEY_ERROR: {
        this.name = 'MongoDuplicatedKeyError'
        this.message = 'Duplicated property'
        this.status = 400
        this.code = 400
      }
    }
  }
}

export class ValidationError extends BaseError {
  name = ValidationError.name
  message
  code = 400
  status = 400
  meta: {
    properties: (mongoose.Error.ValidatorError | mongoose.Error.CastError)[]
  } = {
    properties: []
  }

  constructor(err: IError) {
    super()

    this.message = err.message
    this.setProperties(err)
  }

  private setProperties(err: IError): void {
    for (const path in err.errors) {
      const propertyError = err.errors[path]

      this.meta.properties.push(propertyError)
    }
  }
}

class ErrorHandler {
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

export default ErrorHandler
