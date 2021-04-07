import BaseError from '../base'

export class InternalServerError extends BaseError {
  constructor(message?: string) {
    super(message || 'Internal server error')

    this.status = 500
    this.code = 500
  }
}

export default InternalServerError
