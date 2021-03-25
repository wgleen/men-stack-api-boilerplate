import BaseSerializer from '../base'
import { IUser } from '../../models/user'
import UserSerializerV1, { IUserSerializerV1User } from './user'

export interface IData {
  user: IUser
  token: string
}

export interface IDataSerialized {
  user: IUserSerializerV1User
  token: string
}

class AuthLoginSerializerV1 extends BaseSerializer<IData, IDataSerialized> {
  serializer(): IDataSerialized {
    const userSerializerV1 = new UserSerializerV1({ user: this.data.user })

    return {
      user: userSerializerV1.serialize().user,
      token: this.data.token
    }
  }
}

export default AuthLoginSerializerV1
