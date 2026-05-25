import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function subscribe(req: Request, res: Response) {
  try {
    const { email, name, captchaToken } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email es requerido' })
    }

    if (!captchaToken) {
      return res.status(400).json({ error: 'Captcha requerido' })
    }

    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: 'POST' }
    )
    const verifyData = await verifyRes.json() as { success: boolean }

    if (!verifyData.success) {
      return res.status(400).json({ error: 'Captcha inválido' })
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
