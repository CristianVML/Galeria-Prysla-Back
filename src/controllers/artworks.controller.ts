import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function listArtworks(req: Request, res: Response) {
  try {
    const { status, artist_id } = req.query
    const where: any = {}

    if (status) where.approvalStatus = status
    if (artist_id) where.artistId = Number(artist_id)

    const artworks = await prisma.artwork.findMany({
      where,
      include: {
        artist: {
          select: { id: true, name: true, firstName: true, photoUrl: true },
        },
        images: { orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(artworks)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al listar obras' })
  }
}

export async function getArtwork(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: {
        artist: {
          select: { id: true, name: true, firstName: true, photoUrl: true, bio: true },
        },
        images: { orderBy: { order: 'asc' } },
        reviews: {
          include: { admin: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
    if (!artwork) {
      return res.status(404).json({ error: 'Obra no encontrada' })
    }
    return res.json(artwork)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener obra' })
  }
}

export async function createArtwork(req: Request, res: Response) {
  try {
    const {
      title, description, technique, style, dimensions, year,
      hasOriginal, hasPrint, originalPrice, printPrice,
      artistId, images,
    } = req.body

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description: description || null,
        technique: technique || null,
        style: style || null,
        dimensions: dimensions || null,
        year: year ? Number(year) : null,
        hasOriginal: hasOriginal ?? false,
        hasPrint: hasPrint ?? false,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        printPrice: printPrice ? Number(printPrice) : null,
        artistId: Number(artistId),
        images: images && images.length > 0
          ? {
              create: images.map((img: any, idx: number) => ({
                urlCloudinary: img.urlCloudinary,
                publicId: img.publicId || '',
                order: img.order ?? idx,
              })),
            }
          : undefined,
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        artist: { select: { id: true, name: true } },
      },
    })

    return res.status(201).json(artwork)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al crear obra' })
  }
}

export async function updateArtwork(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const {
      title, description, technique, style, dimensions, year,
      hasOriginal, hasPrint, originalPrice, printPrice,
    } = req.body

    const artwork = await prisma.artwork.update({
      where: { id },
      data: {
        title,
        description,
        technique,
        style,
        dimensions,
        year: year ? Number(year) : null,
        hasOriginal,
        hasPrint,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        printPrice: printPrice ? Number(printPrice) : null,
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        artist: { select: { id: true, name: true } },
      },
    })
    return res.json(artwork)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al actualizar obra' })
  }
}

export async function deleteArtwork(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.artwork.delete({ where: { id } })
    return res.json({ message: 'Obra eliminada correctamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al eliminar obra' })
  }
}
