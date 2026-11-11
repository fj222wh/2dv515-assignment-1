import Router from 'express'
import { UserController } from '../controllers/UserController.js'

const router = Router()
const controller = UserController()

router.get('/', (req, res, next) => controller.index(req, res, next) )

export default router