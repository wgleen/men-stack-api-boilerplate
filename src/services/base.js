import baseSerializer from '../serializers/base'

import Errors from '../lib/errors'

class BaseService {
  constructor({ serializer } = {}) {
    this.success = false
    this.error = null
    this.data = null
    this.status = null
    this.serializer = serializer || baseSerializer
  }

  isValid() {
    return !this.error
  }

  isSuccess() {
    return this.success && this.isValid()
  }

  isFail() {
    return !this.isSuccess()
  }

  addError(err) {
    this.error = err
  }

  addSuccessResponse(data, status = 200) {
    this.success = true
    this.data = this.serializer(data)
    this.status = status
  }

  addErrorResponse(err) {
    this.success = false

    const errorsSerializer = new Errors(err)

    errorsSerializer.serialize()

    this.status = errorsSerializer.status

    this.addError(errorsSerializer.serializedErrors)
  }
}

export default BaseService
