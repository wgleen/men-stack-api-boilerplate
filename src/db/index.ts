import mongoose from 'mongoose'
import config from '../config'
import { logger } from '../lib/logger'

const uri = `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`

mongoose.connect(uri, { useNewUrlParser: true })

const db = mongoose.connection

db.once('open', () => {
  logger.info('Database connected:', uri)
})

db.on('error', (err) => {
  logger.error('connection error:', err)
})
