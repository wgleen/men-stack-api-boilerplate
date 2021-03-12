import jwt from 'jsonwebtoken'
import config from '../config'

export const generateToken = (data) => {
  return jwt.sign(data, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
}

export const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, config.jwt.secret)

    return decoded
  } catch (err) {
    return null
  }
}

export const getTokenByHeaders = (headers) => {
  const bearerHeader = headers.authorization

  if (!bearerHeader) {
    return false
  }

  const bearer = bearerHeader.split(' ')
  const token = bearer[1]

  if (!token) return false

  return token
}
