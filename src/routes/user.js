import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

const router = Router()
const controller = new UserController()

router.get('/', (req, res, next) => controller.index(req, res, next))

export default router
