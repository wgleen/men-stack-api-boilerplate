import BaseController from '../base'
import AuthLoginServiceV1 from '../../services/v1/authLogin'

class AuthControllerV1 extends BaseController {
  async login(req, res) {
    const { email, password } = req.body

    const service = new AuthLoginServiceV1({ email, password })

    await service.execute()

    this.responseServiceHandler(res, service)
  }

  async authentication(req, res) {
    this.responseSuccessHandler(res, 200, { user: req.user })
  }
}

export default AuthControllerV1
