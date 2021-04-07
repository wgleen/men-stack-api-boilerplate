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
    const farms: IFarm[] = []

    this.data.farms.forEach((farm) => {
      const farmSerializerV1 = new FarmSerializerV1({ farm })

      const dataSerialized = farmSerializerV1.serialize()

      if (farmSerializerV1.isSuccess() && dataSerialized) {
        farms.push(dataSerialized.farm)
      }
    })

    return {
      farms
    }
  }
}

export default FarmListSerializerV1
