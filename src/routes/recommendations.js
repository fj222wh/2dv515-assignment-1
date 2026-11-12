import { Router } from 'express'
import { RecommendationController } from '../controllers/RecommendationController.js'

const router = Router()
const controller = new RecommendationController()

router.put('/users', (req, res, next) => controller.matchingUsers(req, res, next))
router.put('/movies', (req, res, next) => controller.recommendedMovies(req, res, next))
router.put('/item-based', (req, res, next) => controller.itemBasedRecommendations(req, res, next))

export default router
