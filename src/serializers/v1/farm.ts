import { IFarm } from '../../models/farm'
import BaseSerializer from '../base'

export interface IFarmSerializerV1Farm extends IFarm {
  _id: string
}

export interface IData {
  farm: IFarm
}

export interface IDataSerialized {
  farm: IFarmSerializerV1Farm
}

class FarmSerializerV1 extends BaseSerializer<IData, IDataSerialized> {
  serializer(): IDataSerialized {
    return {
      farm: {
        _id: this.data.farm._id,
        id: this.data.farm.id,
        name: this.data.farm.name,
        latitude: this.data.farm.latitude,
        longitude: this.data.farm.longitude,
        culture: this.data.farm.culture,
        variety: this.data.farm.variety,
        totalArea: this.data.farm.totalArea,
        yieldEstimation: this.data.farm.yieldEstimation,
        price: this.data.farm.price,
        ndvi: this.data.farm.ndvi,
        precipitation: this.data.farm.precipitation
      }
    }
  }
}

export default FarmSerializerV1
