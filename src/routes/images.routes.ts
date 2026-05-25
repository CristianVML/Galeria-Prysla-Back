import { Router } from 'express'
import multer from 'multer'
import { uploadImage, deleteImage, reorderImages } from '../controllers/images.controller'
import { authenticate } from '../middlewares/auth'

const upload = multer({ storage: multer.memoryStorage() })

const router = Router()

router.post('/upload', authenticate, upload.single('image'), uploadImage)
router.delete('/:id', authenticate, deleteImage)
router.put('/reorder', authenticate, reorderImages)

export default router
