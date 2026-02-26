import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Membuat user dummy untuk testing checkout
  const user = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      id: 1, // Kita paksa ID 1 agar sesuai dengan Server Action kita
      email: 'customer@test.com',
      name: 'Customer Tester',
      password: 'password123', // Nanti kita bahas enkripsi password
      role: 'CUSTOMER',
    },
  })

  // Membuat user admin
  await prisma.user.upsert({
    where: { email: 'admin@matahary.com' },
    update: {},
    create: {
      email: 'admin@matahary.com',
      name: 'Admin Matahary',
      password: 'adminpassword',
      role: 'ADMIN',
    },
  })

  console.log('Seed data berhasil dibuat!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })