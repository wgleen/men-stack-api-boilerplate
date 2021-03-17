import { Router } from 'express'
import UserControllerV1 from '../../controllers/v1/user'
import AuthControllerV1 from '../../controllers/v1/auth'
import FarmControllerV1 from '../../controllers/v1/farm'
import AuthMiddlewareV1 from '../../middlewares/v1/auth'
import * as files from '../../lib/files'

// Router instance
const routerV1 = Router()

// Auth middleware
const authMiddlewareV1 = new AuthMiddlewareV1()

// Users routes
const userControllerV1 = new UserControllerV1()

routerV1.post('/users', userControllerV1.create.bind(userControllerV1))

// Auth routes
const authControllerV1 = new AuthControllerV1()

routerV1.post('/auth/login', authControllerV1.login.bind(authControllerV1))
routerV1.get(
  '/auth',
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  authControllerV1.authentication.bind(authControllerV1)
)

// Farms routes
const farmControllerV1 = new FarmControllerV1()

routerV1.post(
  '/farms',
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  farmControllerV1.create.bind(farmControllerV1)
)
routerV1.post(
  '/farms/csv',
  files.uploadMiddleware.single('file'),
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  farmControllerV1.createFromCSV.bind(farmControllerV1)
)
routerV1.get('/farms', farmControllerV1.index.bind(farmControllerV1))
routerV1.get('/farms/:id', farmControllerV1.show.bind(farmControllerV1))
routerV1.put(
  '/farms/:id',
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  farmControllerV1.update.bind(farmControllerV1)
)
routerV1.patch(
  '/farms/ndvi/csv',
  files.uploadMiddleware.single('file'),
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  farmControllerV1.updateNDVIFromCSV.bind(farmControllerV1)
)
routerV1.patch(
  '/farms/precipitation/csv',
  files.uploadMiddleware.single('file'),
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  farmControllerV1.updatePrecipitationFromCSV.bind(farmControllerV1)
)
routerV1.delete(
  '/farms/:id',
  authMiddlewareV1.middleware.bind(authMiddlewareV1),
  farmControllerV1.destroy.bind(farmControllerV1)
)

export default routerV1
