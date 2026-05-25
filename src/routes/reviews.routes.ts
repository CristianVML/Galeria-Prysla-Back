import { Router } from 'express'
import { approveArtwork, listReviews } from '../controllers/reviews.controller'
import { authenticate, requireAdmin } from '../middlewares/auth'

const router = Router()

router.get('/', authenticate, requireAdmin, listReviews)
router.post('/artworks/:id/approve', authenticate, requireAdmin, approveArtwork)

export default router
