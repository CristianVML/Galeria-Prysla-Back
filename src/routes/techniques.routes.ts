import { Router } from 'express'
import { listTechniques } from '../controllers/techniques.controller'

const router: Router = Router()

/**
 * @swagger
 * /api/techniques:
 *   get:
 *     summary: Listar técnicas disponibles
 *     tags: [Techniques]
 *     responses:
 *       200:
 *         description: Lista de técnicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/', listTechniques)

export default router
