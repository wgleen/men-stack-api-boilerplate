import BaseService from '../base'
import User, { IUser } from '../../models/user'
import * as hash from '../../lib/hash'
import * as jwt from '../../lib/jwt'
import * as errors from '../../lib/errors'

export interface IParams {
  email: string
  password: string
}

export interface IData {
  user: IUser
  token: string
}

class AuthLoginServiceV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new errors.ParamsError())

      return
    }

    const { email, password } = this.params

    try {
      const user = await User.findOne({ email }).exec()

      if (!user) {
        this.setErrorResponse(new errors.UnauthorizedError())

        return
      }

      const match = await hash.compareHash(password, user.password)

      if (!match) {
        this.setErrorResponse(new errors.UnauthorizedError())

        return
      }

      const token = jwt.generateToken({ email: user.email })

      this.setSuccessResponse({
        user,
        token
      })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default AuthLoginServiceV1
