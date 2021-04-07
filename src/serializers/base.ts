import ExceptionHandler from '../exceptions/handler'
import { IError } from '../exceptions/types'
import InternalServerError from '../exceptions/errors/internalServerError'

class BaseSerializer<IData, IDataSerialized> {
  private _success = false
  private _data: IData
  error?: IError
  private _serialized?: IDataSerialized | void

  get data(): IData {
    return this._data
  }

  constructor(data: IData) {
    this._data = data
  }

  deserialize(): IData {
    return this._data
  }

  serialize(): IDataSerialized | void {
    if (!this._serialized) {
      this._serialized = this.serializer()
    }

    if (this._serialized && !this.error) {
      this._success = true
    }

    return this._serialized
  }

  serializer(): void {
    this.setError(
      new InternalServerError('You should create serializer method')
    )
  }

  isValid(): boolean {
    return !this.error
  }

  isSuccess(): boolean {
    return this._success && this.isValid()
  }

  isFail(): boolean {
    return !this.isSuccess()
  }

  setError(err: IError): void {
    this._success = false

    const exceptionHandler = new ExceptionHandler(err)

    this.error = exceptionHandler.error
  }
}

export default BaseSerializer
