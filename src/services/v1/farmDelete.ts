import * as errors from '../../lib/errors'
import BaseService from '../base'
import Farm from '../../models/farm'

export interface IParams {
  id: number
}

class FarmDeleteServiceV1 extends BaseService<IParams, undefined> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new errors.ParamsError())

      return
    }

    const { id } = this.params

    try {
      await Farm.findOneAndDelete({ id })

      this.setSuccessResponse()
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmDeleteServiceV1
