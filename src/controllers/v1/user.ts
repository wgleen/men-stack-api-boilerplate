import Express from 'express'
import UserCreateServiceV1 from '../../services/v1/userCreate'
import BaseController from '../base'

export interface ICreateBody {
  username: string
  email: string
  password: string
}

export interface ICreateResquest extends Express.Request {
  body: ICreateBody
}

class UserControllerV1 extends BaseController {
  async create(req: ICreateResquest, res: Express.Response): Promise<void> {
    const { username, email, password } = req.body

    const service = new UserCreateServiceV1({ username, email, password })

    await service.execute()

    this.responseServiceHandler(res, service)
  }
}

export default UserControllerV1
