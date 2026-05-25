import { Request, Response } from 'express'
import { hash, compare } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { generateToken } from '../lib/jwt'

export async function registerArtist(req: Request, res: Response) {
  try {
    const { name, email, password, bio, whatsappNumber } = req.body

    const exists = await prisma.artist.findUnique({ where: { email } })
    if (exists) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    const passwordHash = await hash(password, 12)

    const artist = await prisma.artist.create({
      data: {
        name,
        email,
        passwordHash,
        bio: bio || null,
        whatsappNumber: whatsappNumber || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        accountStatus: true,
      },
    })

    const token = generateToken({ id: artist.id, tipo: 'artist', email: artist.email })

    return res.status(201).json({ token, artist })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al registrar artista' })
  }
}

export async function loginArtist(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const artist = await prisma.artist.findUnique({ where: { email } })
    if (!artist) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    if (artist.accountStatus === 'suspended') {
      return res.status(403).json({ error: 'Cuenta suspendida' })
    }

    const valid = await compare(password, artist.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const token = generateToken({ id: artist.id, tipo: 'artist', email: artist.email })

    return res.json({
      token,
      artist: {
        id: artist.id,
        name: artist.name,
        email: artist.email,
        photoUrl: artist.photoUrl,
        accountStatus: artist.accountStatus,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const valid = await compare(password, admin.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const token = generateToken({ id: admin.id, tipo: 'admin', email: admin.email })

    return res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}
