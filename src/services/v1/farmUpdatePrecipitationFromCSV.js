import FarmUpdateFromCSV from './FarmUpdateFromCSV'

class FarmUpdateNDVIFromCSVServiceV1 extends FarmUpdateFromCSV {
  constructor(params) {
    super(params)

    this.identifier = 'precipitation'
  }

  async execute() {
    try {
      const farms = await this.updateFromCSV()

      this.addSuccessResponse({ farms })
    } catch (err) {
      this.addErrorResponse(err)
    }
  }
}

export default FarmUpdateNDVIFromCSVServiceV1
