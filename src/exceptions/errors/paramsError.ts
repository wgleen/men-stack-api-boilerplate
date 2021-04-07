import BaseError from '../base'

class ParamsError extends BaseError {
  constructor(message?: string) {
    super(message || 'Params required')

    this.status = 400
    this.code = 400
  }
}

export default ParamsError
