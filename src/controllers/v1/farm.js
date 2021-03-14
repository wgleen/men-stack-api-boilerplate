import FarmCreateServiceV1 from '../../services/v1/farmCreate'
import FarmCreateFromCSVServiceV1 from '../../services/v1/farmCreateFromCSV'
import FarmListServiceV1 from '../../services/v1/farmList'
import FarmFindByIdServiceV1 from '../../services/v1/farmFindById'
import FarmUpdateServiceV1 from '../../services/v1/farmUpdate'
import FarmUpdateNDVIFromCSVServiceV1 from '../../services/v1/farmUpdateNDVIFromCSV'
import FarmUpdatePrecipitationFromCSVServiceV1 from '../../services/v1/farmUpdatePrecipitationFromCSV'
import FarmDeleteServiceV1 from '../../services/v1/farmDelete'
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

    this.responseServiceHandler(res, service)
  }

  async createFromCSV(req, res) {
    const { file } = req

    const service = new FarmCreateFromCSVServiceV1({ file })

    await service.execute()

    this.responseServiceHandler(res, service)
  }

  async index(_, res) {
    const service = new FarmListServiceV1()

    await service.execute()

    this.responseServiceHandler(res, service)
  }

  async show(req, res) {
    const id = req.params.id

    const service = new FarmFindByIdServiceV1({ id })

    await service.execute()

    this.responseServiceHandler(res, service)
  }

  async update(req, res) {
    const id = req.params.id

    const {
      name,
      latitude,
      longitude,
      culture,
      variety,
      totalArea,
      yieldEstimation,
      price
    } = req.body

    const service = new FarmUpdateServiceV1({
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

    this.responseServiceHandler(res, service)
  }

  async updateNDVIFromCSV(req, res) {
    const { file } = req

    const service = new FarmUpdateNDVIFromCSVServiceV1({ file })

    await service.execute()

    this.responseServiceHandler(res, service)
  }

  async updatePrecipitationFromCSV(req, res) {
    const { file } = req

    const service = new FarmUpdatePrecipitationFromCSVServiceV1({ file })

    await service.execute()

    this.responseServiceHandler(res, service)
  }

  async destroy(req, res) {
    const id = req.params.id

    const service = new FarmDeleteServiceV1({ id })

    await service.execute()

    this.responseServiceHandler(res, service)
  }
}

export default FarmControllerV1
