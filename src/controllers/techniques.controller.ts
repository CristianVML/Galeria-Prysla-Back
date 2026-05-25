import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function listTechniques(req: Request, res: Response) {
  try {
    const results = await prisma.artwork.findMany({
      where: { technique: { not: null } },
      select: { technique: true },
      distinct: ['technique'],
      orderBy: { technique: 'asc' },
    })
    return res.json(results.map((r) => r.technique))
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al listar técnicas' })
  }
}
