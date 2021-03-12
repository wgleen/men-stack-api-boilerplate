import BaseService from '../base'
import User from '../../models/user'
import userSerializerV1 from '../../serializers/v1/user'
import * as errors from '../../lib/errors'

class UserFindByEmailV1 extends BaseService {
  constructor(params) {
    super({
      serializer: userSerializerV1
    })

    this.params = params
  }

  async execute() {
    const { email } = this.params

    try {
      const user = await User.findOne({ email }).exec()

      if (!user) {
        this.addErrorResponse(new errors.NotFoundError())

        return
      }

      return this.addSuccessResponse({ user })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default UserFindByEmailV1
