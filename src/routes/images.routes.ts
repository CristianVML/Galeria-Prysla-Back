import { Router } from 'express'
import multer from 'multer'
import { uploadImage, uploadProfilePhoto, uploadTempProfilePhoto, deleteImage, reorderImages } from '../controllers/images.controller'
import { authenticate } from '../middlewares/auth'

const upload = multer({ storage: multer.memoryStorage() })

const router: Router = Router()

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Subir imagen a una obra
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - artworkId
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               artworkId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Imagen subida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       400:
 *         description: No se envió ningún archivo o falta artworkId
 */
router.post('/upload', authenticate, upload.single('image'), uploadImage)

/**
 * @swagger
 * /api/images/upload-profile-temp:
 *   post:
 *     summary: Subir foto de perfil temporal (registro)
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: URL de la imagen temporal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: No se envió ningún archivo
 */
router.post('/upload-profile-temp', upload.single('image'), uploadTempProfilePhoto)

/**
 * @swagger
 * /api/images/upload-profile:
 *   post:
 *     summary: Subir foto de perfil definitiva
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - artistId
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               artistId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 photoUrl:
 *                   type: string
 *       400:
 *         description: No se envió ningún archivo o falta artistId
 */
router.post('/upload-profile', authenticate, upload.single('image'), uploadProfilePhoto)

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     summary: Eliminar una imagen
 *     tags: [Images]
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
 *         description: Imagen eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Imagen no encontrada
 */
router.delete('/:id', authenticate, deleteImage)

/**
 * @swagger
 * /api/images/reorder:
 *   put:
 *     summary: Reordenar imágenes de una obra
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageReorderInput'
 *     responses:
 *       200:
 *         description: Orden actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.put('/reorder', authenticate, reorderImages)

export default router
