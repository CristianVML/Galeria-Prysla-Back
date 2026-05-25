import { Router } from 'express'
import {
  listArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from '../controllers/artworks.controller'
import { authenticate } from '../middlewares/auth'

const router = Router()

router.get('/', listArtworks)
router.get('/:id', getArtwork)
router.post('/', authenticate, createArtwork)
router.patch('/:id', authenticate, updateArtwork)
router.delete('/:id', authenticate, deleteArtwork)

export default router
