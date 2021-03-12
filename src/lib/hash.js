import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const generateHash = async (plaintext) => {
  if (!plaintext) return null

  const hash = await bcrypt.hash(plaintext, SALT_ROUNDS)

  return hash
}

export const compareHash = async (plaintext, hash) => {
  const match = await bcrypt.compare(plaintext, hash)

  return !!match
}
