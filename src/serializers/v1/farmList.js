import farmSerializerV1 from './farm'

const farmListSerializerV1 = ({ farms }) => {
  return {
    farms: farms.map((farm) => farmSerializerV1({ farm }).farm)
  }
}

export default farmListSerializerV1
