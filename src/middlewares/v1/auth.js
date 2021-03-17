import BaseMiddleware from '../base'
import AuthAuthenticationServiceV1 from '../../services/v1/authAuthentication'
import { UnauthorizedError } from '../../lib/errors'
import * as jwt from '../../lib/jwt'

class AuthMiddlewareV1 extends BaseMiddleware {
  async middleware(req, res, next) {
    const token = jwt.getTokenByHeaders(req.headers)

    if (!token) {
      const err = this.responseErrorSerialized(new UnauthorizedError())

      return this.responseErrorHandler(res, err.status, err.serializedErrors)
    }

    const service = new AuthAuthenticationServiceV1({ token })

    await service.execute()

    if (service.isSuccess()) {
      req.user = service.data.user

      next()
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default AuthMiddlewareV1
