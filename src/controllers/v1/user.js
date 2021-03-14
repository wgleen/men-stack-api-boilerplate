import UserCreateServiceV1 from '../../services/v1/userCreate'
import BaseController from '../base'

class UserControllerV1 extends BaseController {
  async create(req, res) {
    const { username, email, password } = req.body

    const service = new UserCreateServiceV1({ username, email, password })

    await service.execute()

    this.responseServiceHandler(res, service)
  }
}

export default UserControllerV1
