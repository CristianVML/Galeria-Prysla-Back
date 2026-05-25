import { Router } from 'express'
import {
  listArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from '../controllers/artworks.controller'
import { authenticate } from '../middlewares/auth'

const router: Router = Router()

/**
 * @swagger
 * /api/artworks:
 *   get:
 *     summary: Listar obras de arte
 *     tags: [Artworks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filtrar por estado de aprobación
 *       - in: query
 *         name: artist_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de artista
 *     responses:
 *       200:
 *         description: Lista de obras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artwork'
 */
router.get('/', listArtworks)

/**
 * @swagger
 * /api/artworks/{id}:
 *   get:
 *     summary: Obtener una obra por ID
 *     tags: [Artworks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la obra con imágenes, artista y revisiones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
 *       404:
 *         description: Obra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getArtwork)

/**
 * @swagger
 * /api/artworks:
 *   post:
 *     summary: Crear una nueva obra de arte
 *     tags: [Artworks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateArtworkInput'
 *     responses:
 *       201:
 *         description: Obra creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
 */
router.post('/', authenticate, createArtwork)

/**
 * @swagger
 * /api/artworks/{id}:
 *   patch:
 *     summary: Actualizar una obra de arte
 *     tags: [Artworks]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               technique:
 *                 type: string
 *               dimensions:
 *                 type: string
 *               year:
 *                 type: integer
 *               hasOriginal:
 *                 type: boolean
 *               hasPrint:
 *                 type: boolean
 *               originalPrice:
 *                 type: number
 *               printPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Obra actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
 */
router.patch('/:id', authenticate, updateArtwork)

/**
 * @swagger
 * /api/artworks/{id}:
 *   delete:
 *     summary: Eliminar una obra de arte
 *     tags: [Artworks]
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
 *         description: Obra eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.delete('/:id', authenticate, deleteArtwork)

export default router
