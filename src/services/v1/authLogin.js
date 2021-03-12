import BaseService from '../base'
import User from '../../models/user'
import authLoginSerializerV1 from '../../serializers/v1/authLogin'
import * as hash from '../../lib/hash'
import * as jwt from '../../lib/jwt'
import * as errors from '../../lib/errors'

class AuthLoginServiceV1 extends BaseService {
  constructor(params) {
    super({
      serializer: authLoginSerializerV1
    })

    this.params = params
  }

  async execute() {
    const { email, password } = this.params

    try {
      const user = await User.findOne({ email }).exec()

      if (!user) {
        this.addErrorResponse(new errors.UnauthorizedError())

        return
      }

      const match = await hash.compareHash(password, user.password)

      if (!match) {
        this.addErrorResponse(new errors.UnauthorizedError())

        return
      }

      const token = jwt.generateToken({ email: user.email })

      this.addSuccessResponse({
        user,
        token
      })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default AuthLoginServiceV1
