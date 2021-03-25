import Express from 'express'
import Http from 'http'
import BaseMiddleware from '../base'
import AuthAuthenticationServiceV1 from '../../services/v1/authAuthentication'
import { UnauthorizedError } from '../../lib/errors'
import * as jwt from '../../lib/jwt'

export interface IHeaders extends Http.IncomingHttpHeaders {
  authorization?: string
}

export interface IRequest extends Express.Request {
  headers: IHeaders
}

class AuthMiddlewareV1 extends BaseMiddleware {
  async middleware(
    req: IRequest,
    res: Express.Response,
    next: Express.NextFunction
  ): Promise<void> {
    const token = jwt.getTokenByHeaders(req.headers)

    if (!token) {
      this.setUnauthorizedError(res)

      return
    }

    const service = new AuthAuthenticationServiceV1({ token })

    await service.execute()

    if (service.isSuccess()) {
      if (!service.data || !service.data.user) {
        this.setUnauthorizedError(res)

        return
      }

      res.locals.user = service.data.user

      next()
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }

  private setUnauthorizedError(res: Express.Response): void {
    const err = this.responseErrorSerialized(new UnauthorizedError())

    this.responseErrorHandler(res, err.status, err)
  }
}

export default AuthMiddlewareV1
