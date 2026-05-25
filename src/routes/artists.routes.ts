import { Router } from 'express'
import {
  listArtists,
  getArtist,
  updateArtist,
  updateArtistStatus,
  deleteArtist,
} from '../controllers/artists.controller'
import { authenticate, requireAdmin } from '../middlewares/auth'

const router = Router()

router.get('/', listArtists)
router.get('/:id', getArtist)
router.patch('/:id', authenticate, updateArtist)
router.patch('/:id/status', authenticate, requireAdmin, updateArtistStatus)
router.delete('/:id', authenticate, requireAdmin, deleteArtist)

export default router
