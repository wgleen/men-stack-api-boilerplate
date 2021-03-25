import dotenv from 'dotenv'

dotenv.config()

import database from './database'
import jwt from './jwt'

export default {
  port: process.env.PORT || 4000,
  database,
  jwt
}
