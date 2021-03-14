import BaseService from '../base'
import Farm from '../../models/farm'
import farmListSerializerV1 from '../../serializers/v1/farmList'
import * as files from '../../lib/files'

class FarmUpdateFromCSV extends BaseService {
  constructor(params) {
    super({
      serializer: farmListSerializerV1
    })

    this.params = params
  }

  static parseValueToFloat(value) {
    if (!value) return 0

    return parseFloat(value.replace(',', '.'))
  }

  async updateFromCSV() {
    const { file } = this.params

    const data = await files.readCSV(file.buffer)

    const normalizedData = this.normalizeData(data)

    const farms = []

    await Promise.all(
      normalizedData.map(async (item) => {
        const farm = await Farm.findOne({ id: item.id })

        if (!farm) return

        farm[this.identifier].push(...item[this.identifier])

        await farm.save()

        farms.push(farm)
      })
    )

    return farms
  }

  normalizeData(data) {
    const normalizedData = []

    data.forEach((item) => {
      const farmIds = Object.keys(item).filter((key) => key !== 'date')

      farmIds.forEach((farmIdUnformated) => {
        const farmId = farmIdUnformated.replace(`${this.identifier}_`, '')

        let currentFarmSerializedIndex = normalizedData.findIndex(
          (farm) => farm.id === farmId
        )

        if (currentFarmSerializedIndex === -1) {
          normalizedData.push({
            id: farmId,
            [this.identifier]: []
          })

          currentFarmSerializedIndex = normalizedData.length
            ? 0
            : normalizedData.length - 1
        }

        normalizedData[currentFarmSerializedIndex][this.identifier].push({
          date: item.date,
          value: FarmUpdateFromCSV.parseValueToFloat(item[farmIdUnformated])
        })
      })
    })

    return normalizedData
  }
}

export default FarmUpdateFromCSV
