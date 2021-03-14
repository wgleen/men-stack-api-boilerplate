import FarmUpdateFromCSVServiceV1 from './FarmUpdateFromCSV'

class FarmUpdateNDVIFromCSVServiceV1 extends FarmUpdateFromCSVServiceV1 {
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
