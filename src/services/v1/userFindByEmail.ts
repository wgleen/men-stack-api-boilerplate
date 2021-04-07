import BaseService from '../base'
import User, { IUser } from '../../models/user'
import ParamsError from '../../exceptions/errors/paramsError'
import NotFoundError from '../../exceptions/errors/notFoundError'

export type IParams = {
  email: string
}

export type IData = {
  user: IUser
}

class UserFindByEmailV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new ParamsError())

      return
    }

    const { email } = this.params

    try {
      const user: IUser = await User.findOne({ email }).exec()

      if (!user) {
        this.setErrorResponse(new NotFoundError())

        return
      }

      return this.setSuccessResponse({ user })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default UserFindByEmailV1
