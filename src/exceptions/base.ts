import { IError } from './types'

class BaseError implements IError {
  name: string
  message = 'Base error'
  status = 500
  code = 500

  constructor(message?: string) {
    this.name = this.constructor.name

    if (message) this.message = message
  }
}

export default BaseError
