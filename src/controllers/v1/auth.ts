import Express from 'express'
import BaseController from '../base'
import AuthLoginServiceV1 from '../../services/v1/authLogin'
import AuthLoginSerializerV1 from '../../serializers/v1/authLogin'
import UserSerializerV1 from '../../serializers/v1/user'

export interface ILoginRequest extends Express.Request {
  body: {
    email: string
    password: string
  }
}

class AuthControllerV1 extends BaseController {
  async login(req: ILoginRequest, res: Express.Response): Promise<void> {
    const { email, password } = req.body

    const service = new AuthLoginServiceV1({ email, password })

    await service.execute()

    this.responseServiceHandler(res, service, AuthLoginSerializerV1)
  }

  async authentication(
    req: Express.Request,
    res: Express.Response
  ): Promise<void> {
    this.responseSuccessHandler(
      res,
      200,
      { user: res.locals.user },
      UserSerializerV1
    )
  }
}

export default AuthControllerV1
