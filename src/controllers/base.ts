import Express from 'express'
import ExceptionHandler from '../exceptions/handler'
import { IError } from '../exceptions/types'

export type IResponseType = 'data' | 'error'

class BaseController {
  responseHandler(
    type: IResponseType,
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
    let responseStatus = status
    let type: IResponseType = 'data'

    if (Serializer) {
      const serializer = new Serializer(data)

      responseData = serializer.serialize()

      if (serializer.isFail()) {
        responseData = serializer.error
        type = 'error'
        responseStatus = serializer.error.status
      }
    }

    this.responseHandler(type, res, responseStatus, responseData)
  }

  responseErrorHandler(
    res: Express.Response,
    status: number,
    error?: IError
  ): void {
    this.responseHandler('error', res, status, error)
  }

  responseErrorSerialized(err: IError): IError {
    const exceptionHandler = new ExceptionHandler(err)

    return exceptionHandler.error
  }

  responseServiceHandler(
    res: Express.Response,
    service: any,
    Serializer?: any
  ): void {
    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data, Serializer)
    } else if (service.error) {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default BaseController
