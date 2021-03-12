import FarmCreateServiceV1 from '../../services/v1/farmCreate'
import BaseController from '../base'

class FarmControllerV1 extends BaseController {
  async create(req, res) {
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
    } = req.body

    const service = new FarmCreateServiceV1({
      id,
      name,
      latitude,
      longitude,
      culture,
      variety,
      totalArea,
      yieldEstimation,
      price
    })

    await service.execute()

    if (service.isSuccess()) {
      this.responseSuccessHandler(res, service.status, service.data)
    } else {
      this.responseErrorHandler(res, service.status, service.error)
    }
  }
}

export default FarmControllerV1
