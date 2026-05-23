import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { captureSubscription, getStatus, cancelSubscription, getBilling, downloadInvoice } from '../controllers/subscription_controller.js'

const router = Router()

router.post('/capture', auth, captureSubscription)
router.get('/status', auth, getStatus)
router.delete('/cancel', auth, cancelSubscription)
router.get('/billing', auth, getBilling)
router.get('/invoice/:transactionId', auth, downloadInvoice)

export default router