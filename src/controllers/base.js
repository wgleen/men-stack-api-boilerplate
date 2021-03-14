import Errors from '../lib/errors'

class BaseController {
  responseHandler(type, res, status, data) {
    res.status(status).json({
      status,
      [type]: data
    })
  }

  responseSuccessHandler(res, status, data) {
    this.responseHandler('data', res, status, data)
  }

  responseErrorHandler(res, status, error) {
    this.responseHandler('error', res, status, error)
  }

  responseErrorSerialized(err) {
    const errorsSerializer = new Errors(err)

    errorsSerializer.serialize()

    return errorsSerializer
  }

  responseServiceHandler(res, service) {
    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data)
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default BaseController
