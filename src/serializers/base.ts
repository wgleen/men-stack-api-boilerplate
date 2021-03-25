import { InternalServerError } from '../lib/errors'

class BaseSerializer<IData, IDataSerialized> {
  private _data: IData
  private _serialized?: IDataSerialized

  get data(): IData {
    return this._data
  }

  constructor(data: IData) {
    this._data = data
  }

  deserialize(): IData {
    return this._data
  }

  serialize(): IDataSerialized {
    if (!this._serialized) {
      this._serialized = this.serializer()
    }

    return this._serialized
  }

  serializer(): IDataSerialized {
    throw new InternalServerError('You should create serializer method')
  }
}

export default BaseSerializer
