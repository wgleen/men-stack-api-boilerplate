import UserCreateServiceV1 from '../../services/v1/userCreate'
import BaseController from '../base'

class UserControllerV1 extends BaseController {
  async create(req, res) {
    const { username, email, password } = req.body

    const service = new UserCreateServiceV1({ username, email, password })

    await service.execute()

    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data)
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default UserControllerV1
