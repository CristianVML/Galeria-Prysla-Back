import { Router } from 'express'
import { getStats } from '../controllers/dashboard.controller'
import { authenticate, requireAdmin } from '../middlewares/auth'

const router: Router = Router()

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Obtener estadísticas del dashboard (admin)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardStats'
 *       403:
 *         description: Acceso denegado
 */
router.get('/stats', authenticate, requireAdmin, getStats)

export default router
