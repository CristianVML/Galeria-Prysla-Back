import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await hash('admin123', 12)

  await prisma.admin.upsert({
    where: { email: 'admin@galeriaprysla.co' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@galeriaprysla.co',
      passwordHash: adminPassword,
    },
  })

  console.log('Admin creado: admin@galeriaprysla.co')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
