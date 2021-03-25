import bcrypt from 'bcrypt'
import * as errors from './errors'

const SALT_ROUNDS = 10

export const generateHash = async (plaintext: string): Promise<string> => {
  if (!plaintext) {
    throw new errors.InternalServerError()
  }

  const hash = await bcrypt.hash(plaintext, SALT_ROUNDS)

  return hash
}

export const compareHash = async (
  plaintext: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plaintext, hash)

  return !!match
}
