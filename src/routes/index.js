import { Router } from 'express'
import routerV1 from './v1/routerV1'

const rootRouter = Router()

rootRouter.use('/v1', routerV1)

export default rootRouter
