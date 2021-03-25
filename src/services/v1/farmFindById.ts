import * as errors from '../../lib/errors'
import Farm, { IFarm } from '../../models/farm'
import BaseService from '../base'

export interface IParams {
  id: number
}

export interface IData {
  farm: IFarm
}

class FarmFindByIdServiceV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new errors.ParamsError())

      return
    }

    const { id } = this.params

    try {
      const farm = await Farm.findOne({ id })

      if (!farm) {
        return this.setErrorResponse(new errors.NotFoundError())
      }

      this.setSuccessResponse({ farm })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmFindByIdServiceV1
