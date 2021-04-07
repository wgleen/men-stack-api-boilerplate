import ParamsError from '../../exceptions/errors/paramsError'
import NotFoundError from '../../exceptions/errors/notFoundError'
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
      this.setErrorResponse(new ParamsError())

      return
    }

    const { id } = this.params

    try {
      const farm = await Farm.findOne({ id })

      if (!farm) {
        return this.setErrorResponse(new NotFoundError())
      }

      this.setSuccessResponse({ farm })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmFindByIdServiceV1
