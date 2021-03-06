import ExceptionHandler from '../exceptions/handler'
import { IError } from '../exceptions/types'

class BaseService<IParams, IData> {
  success = false
  error?: IError
  data?: IData
  status = 200

  private _params?: IParams

  get params(): IParams | undefined {
    return this._params
  }

  constructor(params?: IParams) {
    this._params = params
  }

  isValid(): boolean {
    return !this.error
  }

  isSuccess(): boolean {
    return this.success && this.isValid()
  }

  isFail(): boolean {
    return !this.isSuccess()
  }

  setError(err: IError): void {
    this.error = err
  }

  setSuccessResponse(data?: IData, status?: number): void {
    this.success = true

    if (data) this.data = data
    if (status) this.status = status
  }

  setErrorResponse(err: IError): void {
    this.success = false

    const exceptionHandler = new ExceptionHandler(err)

    this.status = exceptionHandler.error.status

    this.setError(exceptionHandler.error)
  }
}

export default BaseService
