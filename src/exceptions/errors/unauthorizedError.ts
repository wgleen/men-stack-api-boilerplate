import BaseError from '../base'

class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(message || 'Unauthorized to access the resource')

    this.status = 401
    this.code = 401
  }
}

export default UnauthorizedError
