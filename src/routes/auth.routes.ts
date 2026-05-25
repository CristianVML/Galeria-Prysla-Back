import { Router } from 'express'
import { registerArtist, loginArtist, loginAdmin } from '../controllers/auth.controller'

const router = Router()

router.post('/artists/register', registerArtist)
router.post('/artists/login', loginArtist)
router.post('/admin/login', loginAdmin)

export default router
