import ParamsError from '../../exceptions/errors/paramsError'
import BaseService from '../base'
import Farm, { IFarm, IFarmDocument } from '../../models/farm'

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

class FarmCreateServiceV1 extends BaseService<IParams, IData> {
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

    const farm: IFarmDocument = new Farm()

    farm.id = id
    farm.name = name
    farm.latitude = latitude
    farm.longitude = longitude
    farm.culture = culture
    farm.variety = variety
    farm.totalArea = totalArea
    farm.yieldEstimation = yieldEstimation
    farm.price = price

    try {
      await farm.save()

      this.setSuccessResponse({ farm })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmCreateServiceV1
