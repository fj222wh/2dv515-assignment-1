import { Router } from 'express'
import userRouter from './user.js'
import recommendationRouter from './recommendations.js'

const router = Router()

router.use('/api/user', userRouter)
router.use('/api/recommendations', recommendationRouter)


export default router
