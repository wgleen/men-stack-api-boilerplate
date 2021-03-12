import BaseService from '../base'
import UserFindByEmailServiceV1 from './userFindByEmail'
import * as jwt from '../../lib/jwt'
import * as errors from '../../lib/errors'

class AuthAuthenticationServiceV1 extends BaseService {
  constructor(params) {
    super()

    this.params = params
  }

  async execute() {
    const { token } = this.params

    try {
      const decoded = await jwt.verifyToken(token)

      if (!decoded) {
        return this.addErrorResponse(new errors.UnauthorizedError())
      }

      const service = new UserFindByEmailServiceV1({ email: decoded.email })

      await service.execute()

      if (service.isSuccess()) {
        this.addSuccessResponse(service.data)
      } else {
        this.addErrorResponse(new errors.UnauthorizedError())
      }
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default AuthAuthenticationServiceV1
