const farmSerializerV1 = ({ farm }) => {
  return {
    farm: {
      _id: farm._id,
      id: farm.id,
      name: farm.name,
      latitude: farm.latitude,
      longitude: farm.longitude,
      culture: farm.culture,
      variety: farm.variety,
      totalArea: farm.totalArea,
      yieldEstimation: farm.yieldEstimation,
      price: farm.price,
      ndvi: farm.ndvi,
      precipitation: farm.precipitation
    }
  }
}

export default farmSerializerV1
