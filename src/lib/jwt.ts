import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'fallback-secret'

export type TokenPayload = {
  id: number
  tipo: 'artist' | 'admin'
  email: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, SECRET) as TokenPayload
}
