import BaseService from '../base'
import Farm, { IFarm } from '../../models/farm'

export interface IData {
  farms: IFarm[]
}

class FarmListServiceV1 extends BaseService<undefined, IData> {
  async execute(): Promise<void> {
    try {
      const farms = await Farm.find({})

      this.setSuccessResponse({ farms })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }
}

export default FarmListServiceV1
