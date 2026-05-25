import { Router } from 'express'
import { getStats } from '../controllers/dashboard.controller'
import { authenticate, requireAdmin } from '../middlewares/auth'

const router = Router()

router.get('/stats', authenticate, requireAdmin, getStats)

export default router
