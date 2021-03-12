import config from './config'
import { logger } from './lib/logger'
import app from './app'

app.listen(config.port, () => {
  logger.info(`App is running at http://localhost: ${config.port}`)
})
