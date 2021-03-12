import { Router } from 'express'
import UserControllerV1 from '../../controllers/v1/user'
import AuthControllerV1 from '../../controllers/v1/auth'
import FarmControllerV1 from '../../controllers/v1/farm'

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

export default routerV1
