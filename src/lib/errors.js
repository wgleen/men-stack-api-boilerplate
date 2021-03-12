export const ERROR_TYPES = {
  VALIDATION_ERROR: 'ValidationError',
  MONGO_ERROR: 'MongoError',
  MONGO_DUPLICATE_KEY_ERROR: 'MongoDuplicatedKeyError',
  DEFAULT_ERROR: 'ApplicationError',
  NOT_FOUND_ERROR: 'NotFoundError',
  UNAUTHORIZED_ERROR: 'Unauthorized'
}

export const MONGO_ERROR_CODES = {
  DUPLICATE_KEY_ERROR: 11000
}

export class NotFoundError extends Error {
  constructor() {
    super()
    this.name = ERROR_TYPES.NOT_FOUND_ERROR
    this.message = 'Resource not found'
    this.status = 404
    this.code = 404
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super()
    this.name = ERROR_TYPES.UNAUTHORIZED_ERROR
    this.message = 'Unauthorized to access the resource'
    this.status = 401
    this.code = 401
  }
}

export class MongoGenericError extends Error {
  constructor(err) {
    super()

    this.err = err

    this.serialize()
  }

  serialize() {
    switch (this.err.code) {
      case MONGO_ERROR_CODES.DUPLICATE_KEY_ERROR: {
        this.name = ERROR_TYPES.MONGO_DUPLICATE_KEY_ERROR
        this.message = 'Duplicated property'
        this.status = 400
        this.code = 400
      }
    }
  }
}

export class MongoValidationError extends Error {
  constructor(err) {
    super()

    this.err = err

    this.serialize()
  }

  serialize() {
    this.name = ERROR_TYPES.VALIDATION_ERROR
    this.message = this.err.message
    this.code = this.err.code
    this.status = 400
    this.meta = {
      properties: []
    }

    const keys = Object.keys(this.err.errors)

    keys.forEach((key) => {
      const propertyError = this.err.errors[key]

      this.meta.properties.push(propertyError)
    })
  }
}

class Errors {
  constructor(err) {
    this.name = ERROR_TYPES.DEFAULT_ERROR
    this.message = 'Application Error'
    this.code = 400
    this.status = 400
    this.serializedErrors = null

    this.setError(err)
  }

  setError(err) {
    switch (err.name) {
      case ERROR_TYPES.VALIDATION_ERROR: {
        this.err = new MongoValidationError(err)
        break
      }

      case ERROR_TYPES.MONGO_ERROR: {
        this.err = new MongoGenericError(err)
        break
      }

      default: {
        this.err = err
      }
    }
  }

  serialize() {
    this.setErrorProperties()

    if (Array.isArray(this.err)) return this.setSerializedErrors()

    this.setSerializedError()
  }

  setErrorProperties() {
    if (this.err.name) this.name = this.err.name
    if (this.err.message) this.message = this.err.message
    if (this.err.code) this.code = this.err.code
    if (this.err.status) this.status = this.err.status
  }

  setSerializedError() {
    const { name, message, meta } = this.err

    this.serializedErrors = {
      name,
      message,
      meta,
      stack: this.err
    }
  }

  setSerializedErrors() {
    this.err.forEach((err) => {
      this.setSerializedError(err)
    })
  }
}

export default Errors
