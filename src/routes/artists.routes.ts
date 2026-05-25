import { Router } from 'express'
import {
  listArtists,
  getArtist,
  updateArtist,
  updateArtistStatus,
  deleteArtist,
} from '../controllers/artists.controller'
import { authenticate, requireAdmin } from '../middlewares/auth'

const router: Router = Router()

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Listar todos los artistas
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: Lista de artistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
router.get('/', listArtists)

/**
 * @swagger
 * /api/artists/{id}:
 *   get:
 *     summary: Obtener un artista por ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     responses:
 *       200:
 *         description: Datos del artista con sus obras
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Artist'
 *                 - type: object
 *                   properties:
 *                     artworks:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Artwork'
 *       404:
 *         description: Artista no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getArtist)

/**
 * @swagger
 * /api/artists/{id}:
 *   patch:
 *     summary: Actualizar perfil de artista
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstName:
 *                 type: string
 *               bio:
 *                 type: string
 *               whatsappNumber:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *               city:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artista actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 */
router.patch('/:id', authenticate, updateArtist)

/**
 * @swagger
 * /api/artists/{id}/status:
 *   patch:
 *     summary: Cambiar estado de un artista (admin)
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateArtistStatusInput'
 *     responses:
 *       200:
 *         description: Estado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       400:
 *         description: Estado inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acceso denegado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/status', authenticate, requireAdmin, updateArtistStatus)

/**
 * @swagger
 * /api/artists/{id}:
 *   delete:
 *     summary: Eliminar un artista (admin)
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artista eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       403:
 *         description: Acceso denegado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, requireAdmin, deleteArtist)

export default router
