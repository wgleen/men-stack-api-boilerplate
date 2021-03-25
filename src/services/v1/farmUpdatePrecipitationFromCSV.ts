import FarmUpdateFromCSVServiceV1, { Identifier } from './farmUpdateFromCSV'

class FarmUpdateNDVIFromCSVServiceV1 extends FarmUpdateFromCSVServiceV1 {
  identifier = Identifier.precipitation
}

export default FarmUpdateNDVIFromCSVServiceV1
