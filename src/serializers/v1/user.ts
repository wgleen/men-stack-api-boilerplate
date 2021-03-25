import { IUser } from '../../models/user'
import BaseSerializer from '../base'

export interface IUserSerializerV1User {
  _id: string
  username: string
  email: string
}

export interface IData {
  user: IUser
}

export interface IDataSerialized {
  user: IUserSerializerV1User
}

class UserSerializerV1 extends BaseSerializer<IData, IDataSerialized> {
  serializer(): IDataSerialized {
    return {
      user: {
        _id: this.data.user._id,
        username: this.data.user.username,
        email: this.data.user.email
      }
    }
  }
}

export default UserSerializerV1
