import { Router } from 'express'
import UserControllerV1 from '../../controllers/v1/user'
import AuthControllerV1 from '../../controllers/v1/auth'
import FarmControllerV1 from '../../controllers/v1/farm'

import * as files from '../../lib/files'

const routerV1 = Router()

// Users routes
const userControllerV1 = new UserControllerV1()

routerV1.post('/users', userControllerV1.create.bind(userControllerV1))

// Auth routes
const authControllerV1 = new AuthControllerV1()

routerV1.post('/auth/login', authControllerV1.login.bind(authControllerV1))
routerV1.get('/auth', authControllerV1.authentication.bind(authControllerV1))

// Farms routes
const farmControllerV1 = new FarmControllerV1()

routerV1.post('/farms', farmControllerV1.create.bind(farmControllerV1))
routerV1.post(
  '/farms/csv',
  files.uploadMiddleware.single('file'),
  farmControllerV1.createFromCSV.bind(farmControllerV1)
)
routerV1.get('/farms', farmControllerV1.index.bind(farmControllerV1))
routerV1.get('/farms/:id', farmControllerV1.show.bind(farmControllerV1))
routerV1.put('/farms/:id', farmControllerV1.update.bind(farmControllerV1))
routerV1.patch(
  '/farms/ndvi/csv',
  files.uploadMiddleware.single('file'),
  farmControllerV1.updateNDVIFromCSV.bind(farmControllerV1)
)
routerV1.delete('/farms/:id', farmControllerV1.destroy.bind(farmControllerV1))

export default routerV1
