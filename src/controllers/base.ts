import Express from 'express'
import ErrorHandler, { IError } from '../lib/errors'

class BaseController {
  responseHandler(
    type: 'data' | 'error',
    res: Express.Response,
    status: number,
    data?: Record<string, unknown> | IError | undefined
  ): void {
    res.status(status).json({
      status,
      [type]: data
    })
  }

  responseSuccessHandler(
    res: Express.Response,
    status: number,
    data?: Record<string, unknown>,
    Serializer?: any
  ): void {
    let responseData = data

    if (Serializer) {
      const serializer = new Serializer(data)

      responseData = serializer.serialize()
    }

    this.responseHandler('data', res, status, responseData)
  }

  responseErrorHandler(
    res: Express.Response,
    status: number,
    error?: IError
  ): void {
    this.responseHandler('error', res, status, error)
  }

  responseErrorSerialized(err: IError): IError {
    const errorHandler = new ErrorHandler(err)

    return errorHandler.error
  }

  responseServiceHandler(res: Express.Response, service: any, Serializer?: any): void {
    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data, Serializer)
    } else if (service.error) {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default BaseController
