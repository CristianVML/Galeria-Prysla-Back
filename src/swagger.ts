import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Galería Prysla API',
      version: '1.0.0',
      description: 'API REST para la Galería de Arte Prysla',
    },
    servers: [
      { url: 'http://localhost:4000', description: 'Desarrollo' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: { error: { type: 'string' } },
        },
        Artist: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            firstName: { type: 'string', nullable: true },
            email: { type: 'string' },
            bio: { type: 'string', nullable: true },
            city: { type: 'string', nullable: true },
            photoUrl: { type: 'string', nullable: true },
            whatsappNumber: { type: 'string', nullable: true },
            accountStatus: { type: 'string', enum: ['active', 'suspended'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Artwork: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            technique: { type: 'string', nullable: true },
            dimensions: { type: 'string', nullable: true },
            year: { type: 'integer', nullable: true },
            hasOriginal: { type: 'boolean' },
            hasPrint: { type: 'boolean' },
            originalPrice: { type: 'number', nullable: true },
            printPrice: { type: 'number', nullable: true },
            approvalStatus: { type: 'string', enum: ['pending', 'approved', 'rejected'] },
            adminComment: { type: 'string', nullable: true },
            artistId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            images: {
              type: 'array',
              items: { $ref: '#/components/schemas/Image' },
            },
            artist: { $ref: '#/components/schemas/ArtistSummary' },
          },
        },
        ArtistSummary: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            firstName: { type: 'string', nullable: true },
            photoUrl: { type: 'string', nullable: true },
          },
        },
        Image: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            urlCloudinary: { type: 'string' },
            publicId: { type: 'string' },
            order: { type: 'integer' },
            artworkId: { type: 'integer' },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            artworkId: { type: 'integer' },
            adminId: { type: 'integer' },
            decision: { type: 'string', enum: ['approved', 'rejected'] },
            comment: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            admin: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
              },
            },
          },
        },
        DashboardStats: {
          type: 'object',
          properties: {
            total_artworks: { type: 'integer' },
            total_artists: { type: 'integer' },
            pending_artworks: { type: 'integer' },
            approved_artworks: { type: 'integer' },
            rejected_artworks: { type: 'integer' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            artist: { $ref: '#/components/schemas/Artist' },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            bio: { type: 'string' },
            whatsappNumber: { type: 'string' },
            photoUrl: { type: 'string' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        CreateArtworkInput: {
          type: 'object',
          required: ['title', 'artistId'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            technique: { type: 'string' },
            dimensions: { type: 'string' },
            year: { type: 'integer' },
            hasOriginal: { type: 'boolean' },
            hasPrint: { type: 'boolean' },
            originalPrice: { type: 'number' },
            printPrice: { type: 'number' },
            artistId: { type: 'integer' },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  urlCloudinary: { type: 'string' },
                  publicId: { type: 'string' },
                  order: { type: 'integer' },
                },
              },
            },
          },
        },
        ApproveInput: {
          type: 'object',
          required: ['decision'],
          properties: {
            decision: { type: 'string', enum: ['approved', 'rejected'] },
            comment: { type: 'string' },
          },
        },
        UpdateArtistStatusInput: {
          type: 'object',
          required: ['accountStatus'],
          properties: {
            accountStatus: { type: 'string', enum: ['active', 'suspended'] },
          },
        },
        NewsletterSubscribeInput: {
          type: 'object',
          required: ['email', 'captchaToken'],
          properties: {
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            captchaToken: { type: 'string' },
          },
        },
        MessageResponse: {
          type: 'object',
          properties: { message: { type: 'string' } },
        },
        ImageReorderInput: {
          type: 'object',
          required: ['images'],
          properties: {
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  order: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Autenticación y registro' },
      { name: 'Artists', description: 'Gestión de artistas' },
      { name: 'Artworks', description: 'Gestión de obras de arte' },
      { name: 'Reviews', description: 'Revisión y aprobación de obras' },
      { name: 'Images', description: 'Subida y gestión de imágenes' },
      { name: 'Dashboard', description: 'Estadísticas del dashboard' },
      { name: 'Newsletter', description: 'Suscripción al newsletter' },
      { name: 'Techniques', description: 'Listado de técnicas' },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
