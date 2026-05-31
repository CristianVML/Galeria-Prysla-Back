import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function subscribe(req: Request, res: Response) {
  try {
    const { email, name } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' })
    }

    const exists = await prisma.subscriber.findUnique({ where: { email } })
    if (exists) {
      return res.status(200).json({ message: 'Ya estás suscrito' })
    }

    await prisma.subscriber.create({
      data: { email, name: name || null },
    })

    return res.status(201).json({ message: '¡Suscripción exitosa!' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al suscribir' })
  }
}
