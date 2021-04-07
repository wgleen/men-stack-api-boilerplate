import BaseError from '../base'
import { IError } from '../types'

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

export default MongoError
