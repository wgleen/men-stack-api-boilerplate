import * as files from '../../lib/files'
import ParamsError from '../../exceptions/errors/paramsError'
import { IFarm } from '../../models/farm'
import BaseService from '../base'
import FarmCreateServiceV1 from './farmCreate'

export interface IParams {
  file: globalThis.Express.Multer.File
}

export interface IData {
  farms: IFarm[]
}

class FarmCreateFromCSVServiceV1 extends BaseService<IParams, IData> {
  async execute(): Promise<void> {
    if (!this.params) {
      this.setErrorResponse(new ParamsError())

      return
    }

    const { file } = this.params

    try {
      const data = await files.readCSV(file.buffer)

      const farmsPromise: IFarm[] = []

      data.map(async (item) => {
        const {
          farm_id,
          name,
          latitude,
          longitude,
          culture,
          variety,
          total_area,
          yield_estimation,
          price
        } = item

        const service = new FarmCreateServiceV1({
          id: parseInt(farm_id, 10),
          name,
          latitude: parseInt(latitude, 10),
          longitude: parseInt(longitude, 10),
          culture,
          variety,
          totalArea: parseInt(total_area, 10),
          yieldEstimation: parseInt(yield_estimation, 10),
          price: parseFloat(price)
        })

        await service.execute()

        if (service.isFail()) throw service.error
        if (!service.data) return

        return farmsPromise.push(service.data.farm)
      })

      const farms = await Promise.all(farmsPromise)

      if (farms && farms.length > 0) {
        this.setSuccessResponse({ farms })
      }
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmCreateFromCSVServiceV1
