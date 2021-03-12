import BaseService from '../base'
import User from '../../models/user'
import userSerializerV1 from '../../serializers/v1/user'
import * as hash from '../../lib/hash'

class UserCreateServiceV1 extends BaseService {
  constructor(params) {
    super({
      serializer: userSerializerV1
    })

    this.params = params
  }

  async execute() {
    const { username, email, password } = this.params

    const user = new User()

    user.username = username
    user.email = email
    user.password = await hash.generateHash(password)

    try {
      await user.save()

      this.addSuccessResponse({
        user
      })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default UserCreateServiceV1
