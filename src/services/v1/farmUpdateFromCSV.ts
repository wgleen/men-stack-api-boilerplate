import * as files from '../../lib/files'
import ParamsError from '../../exceptions/errors/paramsError'
import InternalServerError from '../../exceptions/errors/internalServerError'
import BaseService from '../base'
import Farm, { IFarm, IFarmDocument, IFarmStatistics } from '../../models/farm'

export interface IParams {
  file: globalThis.Express.Multer.File
}

export enum Identifier {
  ndvi = 'ndvi',
  precipitation = 'precipitation'
}

export interface ICSVData {
  date?: Date
  [key: string]: string | Date | undefined
}

export interface INormalizedData {
  id: number
  [Identifier.ndvi]?: IFarmStatistics[]
  [Identifier.precipitation]?: IFarmStatistics[]
}

export interface IData {
  farms: IFarm[]
}

class FarmUpdateFromCSVServiceV1 extends BaseService<IParams, IData> {
  identifier: Identifier = Identifier.ndvi

  static parseValueToFloat(value: string): number {
    if (!value) return 0

    return parseFloat(value.replace(',', '.'))
  }

  async updateFromCSV(): Promise<IFarm[]> {
    if (!this.params) {
      throw new ParamsError()
    }

    const { file } = this.params

    const data: ICSVData[] = await files.readCSV(file.buffer)

    const normalizedData = this.normalizeData(data)

    const farms: IFarm[] = []

    await Promise.all(
      normalizedData.map(async (item) => {
        const farm: IFarmDocument = await Farm.findOne({ id: item.id })
        const data = item[this.identifier]

        if (!farm || !data) return

        farm[this.identifier].push(...data)

        await farm.save()

        farms.push(farm)
      })
    )

    return farms
  }

  async execute(): Promise<void> {
    try {
      const farms = await this.updateFromCSV()

      if (!farms) this.setErrorResponse(new InternalServerError())

      this.setSuccessResponse({ farms })
    } catch (err) {
      this.setErrorResponse(err)
    }
  }

  normalizeData(data: ICSVData[]): INormalizedData[] {
    const normalizedData: INormalizedData[] = []

    data.forEach((item) => {
      const farmIds: string[] = Object.keys(item).filter(
        (key) => key !== 'date'
      )

      farmIds.forEach((farmIdUnformated) => {
        const farmId = parseInt(
          farmIdUnformated.replace(`${this.identifier}_`, ''),
          10
        )

        const currentFarmSerializedIndex = normalizedData.findIndex(
          (farm) => farm.id === farmId
        )

        let currentFarmSerialized = normalizedData[currentFarmSerializedIndex]

        if (!currentFarmSerialized) {
          normalizedData.push({
            id: farmId,
            [this.identifier]: []
          })

          currentFarmSerialized = normalizedData[0]
        }

        const currentFarmSerializedData = currentFarmSerialized[this.identifier]

        if (currentFarmSerializedData && item.date) {
          currentFarmSerializedData.push({
            date: item.date,
            value: FarmUpdateFromCSVServiceV1.parseValueToFloat(
              String(item[farmIdUnformated])
            )
          })
        }
      })
    })

    return normalizedData
  }
}

export default FarmUpdateFromCSVServiceV1
