import BaseSerializer from '../base'
import { IFarm } from '../../models/farm'
import FarmSerializerV1, { IFarmSerializerV1Farm } from './farm'

export interface IData {
  farms: IFarm[]
}

export interface IDataSerialized {
  farms: IFarmSerializerV1Farm[]
}

class FarmListSerializerV1 extends BaseSerializer<IData, IDataSerialized> {
  serializer(): IDataSerialized {
    return {
      farms: this.data.farms.map((farm) => {
        const farmSerializerV1 = new FarmSerializerV1({ farm })

        return farmSerializerV1.serialize().farm
      })
    }
  }
}

export default FarmListSerializerV1
