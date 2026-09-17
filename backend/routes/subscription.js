import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { paypalWebhookLimiter } from '../middleware/rateLimiter.js'
import { captureSubscription, getStatus, cancelSubscription, getBilling, downloadInvoice, handlePaypalWebhook } from '../controllers/subscription_controller.js'

const router = Router()

// Called by PayPal directly (no user session) — auth is the verified webhook signature, not JWT.
router.post('/paypal-webhook', paypalWebhookLimiter, handlePaypalWebhook)
router.post('/capture', auth, captureSubscription)
router.get('/status', auth, getStatus)
router.delete('/cancel', auth, cancelSubscription)
router.get('/billing', auth, getBilling)
router.get('/invoice/:transactionId', auth, downloadInvoice)

export default router