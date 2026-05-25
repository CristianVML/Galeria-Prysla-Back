import { Router } from 'express'
import { approveArtwork, listReviews } from '../controllers/reviews.controller'
import { authenticate, requireAdmin } from '../middlewares/auth'

const router: Router = Router()

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Listar todas las revisiones (admin)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de revisiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       403:
 *         description: Acceso denegado
 */
router.get('/', authenticate, requireAdmin, listReviews)

/**
 * @swagger
 * /api/reviews/artworks/{id}/approve:
 *   post:
 *     summary: Aprobar o rechazar una obra (admin)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApproveInput'
 *     responses:
 *       200:
 *         description: Revisión procesada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Decisión inválida
 *       404:
 *         description: Obra no encontrada
 *       403:
 *         description: Acceso denegado
 */
router.post('/artworks/:id/approve', authenticate, requireAdmin, approveArtwork)

export default router
