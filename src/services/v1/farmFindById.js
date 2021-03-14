import BaseService from '../base'
import Farm from '../../models/farm'
import farmSerializerV1 from '../../serializers/v1/farm'
import * as errors from '../../lib/errors'

class FarmFindByIdServiceV1 extends BaseService {
  constructor(params) {
    super({
      serializer: farmSerializerV1
    })

    this.params = params
  }

  async execute() {
    const { id } = this.params

    try {
      const farm = await Farm.findOne({ id })

      if (!farm) {
        return this.addErrorResponse(new errors.NotFoundError())
      }

      this.addSuccessResponse({ farm })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmFindByIdServiceV1
