import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getStats(req: Request, res: Response) {
  try {
    const [totalArtworks, totalArtists, pendingArtworks, approvedArtworks, rejectedArtworks] =
      await Promise.all([
        prisma.artwork.count(),
        prisma.artist.count(),
        prisma.artwork.count({ where: { approvalStatus: 'pending' } }),
        prisma.artwork.count({ where: { approvalStatus: 'approved' } }),
        prisma.artwork.count({ where: { approvalStatus: 'rejected' } }),
      ])

    return res.json({
      total_artworks: totalArtworks,
      total_artists: totalArtists,
      pending_artworks: pendingArtworks,
      approved_artworks: approvedArtworks,
      rejected_artworks: rejectedArtworks,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener estadísticas' })
  }
}
