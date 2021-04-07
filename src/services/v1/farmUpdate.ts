import BaseService from '../base'
import Farm, { IFarm } from '../../models/farm'
import ParamsError from '../../exceptions/errors/paramsError'
import NotFoundError from '../../exceptions/errors/notFoundError'

export interface IParams {
  id: number
  name: string
  latitude: number
  longitude: number
  culture: string
  variety: string
  totalArea: number
  yieldEstimation: number
  price: number
}

export interface IData {
  farm: IFarm
}

class FarmUpdateServiceV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new ParamsError())

      return
    }

    const {
      id,
      name,
      latitude,
      longitude,
      culture,
      variety,
      totalArea,
      yieldEstimation,
      price
    } = this.params

    try {
      const farm = await Farm.findOneAndUpdate(
        { id },
        {
          name,
          latitude,
          longitude,
          culture,
          variety,
          totalArea,
          yieldEstimation,
          price
        },
        { new: true }
      )

      if (!farm) {
        return this.setErrorResponse(new NotFoundError())
      }

      this.setSuccessResponse({
        farm
      })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmUpdateServiceV1
