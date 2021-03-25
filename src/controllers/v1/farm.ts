import Express from 'express'
import FarmCreateServiceV1 from '../../services/v1/farmCreate'
import FarmCreateFromCSVServiceV1 from '../../services/v1/farmCreateFromCSV'
import FarmListServiceV1 from '../../services/v1/farmList'
import FarmFindByIdServiceV1 from '../../services/v1/farmFindById'
import FarmUpdateServiceV1 from '../../services/v1/farmUpdate'
import FarmUpdateNDVIFromCSVServiceV1 from '../../services/v1/farmUpdateNDVIFromCSV'
import FarmUpdatePrecipitationFromCSVServiceV1 from '../../services/v1/farmUpdatePrecipitationFromCSV'
import FarmDeleteServiceV1 from '../../services/v1/farmDelete'
import FarmSerializerV1 from '../../serializers/v1/farm'
import FarmListSerializerV1 from '../../serializers/v1/farmList'
import BaseController from '../base'

class FarmControllerV1 extends BaseController {
  async create(req: Express.Request, res: Express.Response): Promise<void> {
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

    this.responseServiceHandler(res, service, FarmSerializerV1)
  }

  async createFromCSV(
    req: Express.Request,
    res: Express.Response
  ): Promise<void> {
    const { file } = req

    const service = new FarmCreateFromCSVServiceV1({ file })

    await service.execute()

    this.responseServiceHandler(res, service, FarmListSerializerV1)
  }

  async index(_: Express.Request, res: Express.Response): Promise<void> {
    const service = new FarmListServiceV1()

    await service.execute()

    this.responseServiceHandler(res, service, FarmListSerializerV1)
  }

  async show(req: Express.Request, res: Express.Response): Promise<void> {
    const id = parseInt(req.params.id, 10)

    const service = new FarmFindByIdServiceV1({ id })

    await service.execute()

    this.responseServiceHandler(res, service, FarmSerializerV1)
  }

  async update(req: Express.Request, res: Express.Response): Promise<void> {
    const id = parseInt(req.params.id, 10)

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

    this.responseServiceHandler(res, service, FarmSerializerV1)
  }

  async updateNDVIFromCSV(
    req: Express.Request,
    res: Express.Response
  ): Promise<void> {
    const { file } = req

    const service = new FarmUpdateNDVIFromCSVServiceV1({ file })

    await service.execute()

    this.responseServiceHandler(res, service, FarmListSerializerV1)
  }

  async updatePrecipitationFromCSV(
    req: Express.Request,
    res: Express.Response
  ): Promise<void> {
    const { file } = req

    const service = new FarmUpdatePrecipitationFromCSVServiceV1({ file })

    await service.execute()

    this.responseServiceHandler(res, service, FarmListSerializerV1)
  }

  async destroy(req: Express.Request, res: Express.Response): Promise<void> {
    const id = parseInt(req.params.id, 10)

    const service = new FarmDeleteServiceV1({ id })

    await service.execute()

    this.responseServiceHandler(res, service)
  }
}

export default FarmControllerV1
