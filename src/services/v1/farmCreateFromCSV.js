import BaseService from '../base'
import FarmCreateServiceV1 from './farmCreate'
import farmListSerializerV1 from '../../serializers/v1/farmList'
import * as files from '../../lib/files'

class FarmCreateFromCSVServiceV1 extends BaseService {
  constructor(params) {
    super({
      serializer: farmListSerializerV1
    })

    this.params = params
  }

  async execute() {
    const { file } = this.params

    try {
      const data = await files.readCSV(file.buffer)

      const farms = await Promise.all(
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
            id: farm_id,
            name,
            latitude,
            longitude,
            culture,
            variety,
            totalArea: total_area,
            yieldEstimation: yield_estimation,
            price
          })

          await service.execute()

          if (service.isFail()) throw service.error

          return service.data.farm
        })
      )

      this.addSuccessResponse({ farms })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmCreateFromCSVServiceV1
