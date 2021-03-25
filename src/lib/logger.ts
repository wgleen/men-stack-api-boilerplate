import winston, { createLogger } from 'winston'
import morgan, { StreamOptions } from 'morgan'

const level = process.env.LOG_LEVEL || 'debug'

export const logger = createLogger({
  level,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

const stream: StreamOptions = {
  write: (message) => logger.http(message)
}

export default morgan('combined', { stream })
