import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from './lib/logger'
import routes from './routes'
import './db'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.use(routes)

export default app
