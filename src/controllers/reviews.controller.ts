import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function approveArtwork(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const { decision, comment } = req.body
    const adminId = req.user!.id

    if (!['approved', 'rejected'].includes(decision)) {
      return res.status(400).json({ error: 'Decisión inválida. Use: approved o rejected' })
    }

    const artwork = await prisma.artwork.findUnique({ where: { id } })
    if (!artwork) {
      return res.status(404).json({ error: 'Obra no encontrada' })
    }

    const [review] = await prisma.$transaction([
      prisma.review.create({
        data: {
          artworkId: id,
          adminId,
          decision,
          comment: comment || null,
        },
      }),
      prisma.artwork.update({
        where: { id },
        data: {
          approvalStatus: decision,
          adminComment: comment || null,
        },
      }),
    ])

    return res.json(review)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al procesar revisión' })
  }
}

export async function listReviews(req: Request, res: Response) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        artwork: { select: { id: true, title: true } },
        admin: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(reviews)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al listar revisiones' })
  }
}
