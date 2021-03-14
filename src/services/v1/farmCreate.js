import BaseService from '../base'
import Farm from '../../models/farm'
import farmSerializerV1 from '../../serializers/v1/farm'

class FarmCreateServiceV1 extends BaseService {
  constructor(params) {
    super({
      serializer: farmSerializerV1
    })

    this.params = params
  }

  async execute() {
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

    const farm = new Farm()

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

      this.addSuccessResponse({ farm })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmCreateServiceV1
