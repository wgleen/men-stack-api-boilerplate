import BaseService from '../base'
import Farm from '../../models/farm'
import farmSerializerV1 from '../../serializers/v1/farm'
import * as errors from '../../lib/errors'

class FarmUpdateServiceV1 extends BaseService {
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
        return this.addErrorResponse(new errors.NotFoundError())
      }

      this.addSuccessResponse({
        farm
      })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmUpdateServiceV1
