import BaseController from '../base'
import AuthLoginServiceV1 from '../../services/v1/authLogin'
import AuthAuthenticationServiceV1 from '../../services/v1/authAuthentication'
import { UnauthorizedError } from '../../lib/errors'
import * as jwt from '../../lib/jwt'

class AuthControllerV1 extends BaseController {
  async login(req, res) {
    const { email, password } = req.body

    const service = new AuthLoginServiceV1({ email, password })

    await service.execute()

    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data)
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }

  async authentication(req, res) {
    const token = jwt.getTokenByHeaders(req.headers)

    if (!token) {
      const err = this.responseErrorSerialized(new UnauthorizedError())

      return this.responseErrorHandler(res, err.status, err.serializedErrors)
    }

    const service = new AuthAuthenticationServiceV1({ token })

    await service.execute()

    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data)
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default AuthControllerV1
