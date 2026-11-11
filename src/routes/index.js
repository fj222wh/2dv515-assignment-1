import { Router } from 'express'
import { router as userRouter }from './user.js'

const router = Router()

router.use('/api/user', userRouter)


export default router
