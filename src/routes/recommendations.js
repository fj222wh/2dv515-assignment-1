import { Router } from 'express'
import { RecommendationController } from '../controllers/RecommendationController.js'

const router = Router()
const controller = new RecommendationController()

router.get('/', (req, res, next) => controller.index(req, res, next))

export default router