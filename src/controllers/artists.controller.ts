import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function listArtists(req: Request, res: Response) {
  try {
    const artists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        photoUrl: true,
        bio: true,
        email: true,
        whatsappNumber: true,
        accountStatus: true,
        createdAt: true,
        _count: { select: { artworks: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(artists)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al listar artistas' })
  }
}

export async function getArtist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const artist = await prisma.artist.findUnique({
      where: { id },
      include: {
        artworks: {
          include: { images: { orderBy: { order: 'asc' } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
    if (!artist) {
      return res.status(404).json({ error: 'Artista no encontrado' })
    }
    return res.json(artist)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener artista' })
  }
}

export async function updateArtist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const { name, firstName, bio, whatsappNumber, photoUrl, city, email } = req.body

    const artist = await prisma.artist.update({
      where: { id },
      data: { name, firstName, bio, whatsappNumber, photoUrl, city, email },
      select: {
        id: true,
        name: true,
        firstName: true,
        email: true,
        photoUrl: true,
        bio: true,
        city: true,
        whatsappNumber: true,
        accountStatus: true,
      },
    })
    return res.json(artist)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al actualizar artista' })
  }
}

export async function updateArtistStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const { accountStatus } = req.body

    if (!['active', 'suspended'].includes(accountStatus)) {
      return res.status(400).json({ error: 'Estado inválido. Use: active o suspended' })
    }

    const artist = await prisma.artist.update({
      where: { id },
      data: { accountStatus },
      select: { id: true, name: true, email: true, accountStatus: true },
    })
    return res.json(artist)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al cambiar estado del artista' })
  }
}

export async function deleteArtist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.artist.delete({ where: { id } })
    return res.json({ message: 'Artista eliminado correctamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al eliminar artista' })
  }
}
