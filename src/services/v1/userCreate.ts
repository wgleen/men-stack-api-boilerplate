import BaseService from '../base'
import User, { IUser, IUserDocument } from '../../models/user'
import * as hash from '../../lib/hash'
import ParamsError from '../../exceptions/errors/paramsError'
import InternalServerError from '../../exceptions/errors/internalServerError'

export interface IParams {
  username: string
  email: string
  password: string
}

export interface IData {
  user: IUser
}

class UserCreateServiceV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new ParamsError())

      return
    }

    const { username, email, password } = this.params

    const user: IUserDocument = new User()

    user.username = username
    user.email = email

    const hashPassword = await hash.generateHash(password)

    if (!hashPassword) {
      this.setErrorResponse(new InternalServerError())

      return
    }

    user.password = hashPassword

    try {
      await user.save()

      this.setSuccessResponse({
        user
      })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default UserCreateServiceV1
