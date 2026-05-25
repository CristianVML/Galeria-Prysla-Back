import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import authRoutes from './routes/auth.routes'
import artistsRoutes from './routes/artists.routes'
import artworksRoutes from './routes/artworks.routes'
import reviewsRoutes from './routes/reviews.routes'
import imagesRoutes from './routes/images.routes'
import dashboardRoutes from './routes/dashboard.routes'
import newsletterRoutes from './routes/newsletter.routes'
import techniquesRoutes from './routes/techniques.routes'
import { swaggerSpec } from './swagger'

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
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/techniques', techniquesRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Galería Prysla - API Docs',
}))

app.get('/api/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(swaggerSpec)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log(`Documentación Swagger: http://localhost:${PORT}/api/docs`)
})
