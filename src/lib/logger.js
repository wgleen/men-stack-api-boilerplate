import winston, { createLogger } from 'winston'
import morgan from 'morgan'

const level = process.env.LOG_LEVEL || 'debug'

export const logger = createLogger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp: () => new Date().toISOString(),
      format: winston.format.combine(winston.format.colorize())
    })
  ],
  exitOnError: false
})

logger.stream = { write: (message) => logger.info(message) }

export default morgan('combined', { stream: logger.stream })
