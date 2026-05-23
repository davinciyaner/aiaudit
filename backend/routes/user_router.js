import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { getProfile } from '../controllers/user_controller.js'

const router = Router()

router.get('/profile', auth, getProfile)

export default router