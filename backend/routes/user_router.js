import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { getProfile, getAuditHistory } from '../controllers/user_controller.js'

const router = Router()

router.get('/profile', auth, getProfile)
router.get('/history', auth, getAuditHistory)

export default router