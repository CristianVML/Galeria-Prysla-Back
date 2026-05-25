import { Router } from 'express'
import { subscribe } from '../controllers/newsletter.controller'

const router: Router = Router()

/**
 * @swagger
 * /api/newsletter/subscribe:
 *   post:
 *     summary: Suscribirse al newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsletterSubscribeInput'
 *     responses:
 *       201:
 *         description: Suscripción exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       200:
 *         description: Ya estás suscrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Email requerido o captcha inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/subscribe', subscribe)

export default router
