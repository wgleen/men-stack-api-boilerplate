import BaseService from '../base'
import UserFindByEmailServiceV1 from './userFindByEmail'
import * as jwt from '../../lib/jwt'
import * as errors from '../../lib/errors'
import { IUser } from '../../models/user'

export interface IParams {
  token: string
}

export interface IData {
  user: IUser
}

class AuthAuthenticationServiceV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new errors.ParamsError())

      return
    }

    const { token } = this.params

    try {
      const decoded = await jwt.verifyToken(token)

      if (!decoded || !decoded.email) {
        this.setErrorResponse(new errors.UnauthorizedError())

        return
      }

      const service = new UserFindByEmailServiceV1({ email: decoded.email })

      await service.execute()

      if (service.isSuccess()) {
        this.setSuccessResponse(service.data, service.status)
      } else {
        this.setErrorResponse(new errors.UnauthorizedError())
      }
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default AuthAuthenticationServiceV1
