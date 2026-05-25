import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import cloudinary from '../lib/cloudinary'
import { UploadApiResponse } from 'cloudinary'

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ningún archivo' })
    }

    const buffer = req.file.buffer
    const artworkId = Number(req.body.artworkId)

    if (!artworkId) {
      return res.status(400).json({ error: 'artworkId es requerido' })
    }

    const artwork = await prisma.artwork.findUnique({ where: { id: artworkId } })
    if (!artwork) {
      return res.status(404).json({ error: 'Obra no encontrada' })
    }

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `prysla/obras/${artworkId}`, resource_type: 'image' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result!)
        }
      )
      uploadStream.end(buffer)
    })

    const lastOrder = await prisma.image.aggregate({
      where: { artworkId },
      _max: { order: true },
    })

    const image = await prisma.image.create({
      data: {
        urlCloudinary: result.secure_url,
        publicId: result.public_id,
        order: (lastOrder._max.order ?? -1) + 1,
        artworkId,
      },
    })

    return res.status(201).json(image)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al subir imagen' })
  }
}

export async function deleteImage(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    const image = await prisma.image.findUnique({ where: { id } })
    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' })
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId)
    }

    await prisma.image.delete({ where: { id } })
    return res.json({ message: 'Imagen eliminada correctamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al eliminar imagen' })
  }
}

export async function reorderImages(req: Request, res: Response) {
  try {
    const { images } = req.body

    for (const img of images) {
      await prisma.image.update({
        where: { id: img.id },
        data: { order: img.order },
      })
    }

    return res.json({ message: 'Orden actualizado' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al reordenar imágenes' })
  }
}
