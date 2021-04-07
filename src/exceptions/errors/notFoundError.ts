import BaseError from '../base'

class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(message || 'Resource not found')

    this.status = 404
    this.code = 404
  }
}

export default NotFoundError
