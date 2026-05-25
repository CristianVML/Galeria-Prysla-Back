import { Request, Response, NextFunction } from 'express'
import { verifyToken, TokenPayload } from '../lib/jwt'

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  try {
    const token = header.split(' ')[1]
    req.user = verifyToken(token)
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.tipo !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' })
  }
  next()
}

export function requireArtista(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.tipo !== 'artist') {
    return res.status(403).json({ error: 'Acceso denegado: se requiere rol de artista' })
  }
  next()
}
