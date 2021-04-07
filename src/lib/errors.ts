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
  name: string
  message = 'Base error'
  status = 500
  code = 500

  constructor(message?: string) {
    this.name = this.constructor.name

    if (message) this.message = message
  }
}

export class ParamsError extends BaseError {
  constructor(message?: string) {
    super(message || 'Params required')

    this.status = 400
    this.code = 400
  }
}

export class InternalServerError extends BaseError {
  constructor(message?: string) {
    super(message || 'Internal server error')

    this.status = 500
    this.code = 500
  }
}

export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(message || 'Resource not found')

    this.status = 404
    this.code = 404
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(message || 'Unauthorized to access the resource')

    this.status = 401
    this.code = 401
  }
}

export class MongoError extends BaseError {
  static MONGO_ERROR_CODES = {
    DUPLICATE_KEY_ERROR: 11000
  }

  constructor(err: IError) {
    super('Mongo error')

    this.status = 500
    this.code = 500

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
