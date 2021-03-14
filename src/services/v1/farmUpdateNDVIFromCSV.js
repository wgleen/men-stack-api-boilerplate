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

  // TODO
  async execute() {
    const { file } = this.params

    const data = await files.readCSV(file.buffer)

    const farms = []

    try {
      this.addSuccessResponse({ farms })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmCreateFromCSVServiceV1
