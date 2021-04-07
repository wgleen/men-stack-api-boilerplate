import jwt from 'jsonwebtoken'
import config from '../config'
import UnauthorizedError from '../exceptions/errors/unauthorizedError'

export const generateToken = (data: Record<string, unknown>): string => {
  return jwt.sign(data, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
}

type IDecoded = {
  id?: number
  email?: string
}

export const verifyToken = async (token: string): Promise<IDecoded> => {
  try {
    const decoded = await jwt.verify(token, config.jwt.secret)

    return <IDecoded>decoded
  } catch (err) {
    throw new UnauthorizedError()
  }
}

export const getTokenByHeaders = (headers: {
  authorization?: string
}): string | undefined => {
  const bearerHeader = headers.authorization

  if (!bearerHeader) {
    return
  }

  const bearer = bearerHeader.split(' ')
  const token = bearer[1]

  return token
}
