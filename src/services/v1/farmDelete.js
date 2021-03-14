import BaseService from '../base'
import Farm from '../../models/farm'

class FarmDeleteServiceV1 extends BaseService {
  constructor(params) {
    super()

    this.params = params
  }

  async execute() {
    const { id } = this.params

    try {
      await Farm.findOneAndDelete({ id })

      this.addSuccessResponse()
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmDeleteServiceV1
