import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes'
import artistsRoutes from './routes/artists.routes'
import artworksRoutes from './routes/artworks.routes'
import reviewsRoutes from './routes/reviews.routes'
import imagesRoutes from './routes/images.routes'
import dashboardRoutes from './routes/dashboard.routes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/artists', artistsRoutes)
app.use('/api/artworks', artworksRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/images', imagesRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
