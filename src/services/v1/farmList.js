import BaseService from '../base'
import Farm from '../../models/farm'
import farmListSerializerV1 from '../../serializers/v1/farmList'

class FarmListServiceV1 extends BaseService {
  constructor(params) {
    super({
      serializer: farmListSerializerV1
    })

    this.params = params
  }

  async execute() {
    try {
      const farms = await Farm.find({})

      this.addSuccessResponse({ farms })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmListServiceV1
