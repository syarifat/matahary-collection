import { PrismaClient } from '@prisma/client'

// Inisialisasi prisma di luar fungsi main agar bisa dibaca di seluruh file
const prisma = new PrismaClient()

async function main() {
  console.log('Sedang membersihkan data lama...')
  
  // Menghapus data transaksi terlebih dahulu untuk menghindari Foreign Key Error
  // Karena kamu sudah terlibat di berbagai proyek database seperti KaSiPay dan SIPREDI, 
  // kamu pasti familiar dengan urutan hapus child-to-parent ini.
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  console.log('Data lama dibersihkan. Sedang mengisi katalog baru...')

  const products = [
    {
      name: 'Setelan Training Olahraga SD - Merah Putih',
      description: 'Bahan kaos PE berkualitas, celana bahan Lotto. Cocok untuk kegiatan olahraga sekolah. Tersedia ukuran S, M, L, XL.',
      price: 125000,
      stock: 50,
      category: 'Training',
    },
    {
      name: 'Setelan Training Olahraga SMP - Biru Dongker',
      description: 'Bahan atasan bahan KH, celana bahan Diadora premium. Nyaman menyerap keringat. Tersedia ukuran M, L, XL, XXL.',
      price: 145000,
      stock: 35,
      category: 'Training',
    },
    {
      name: 'Seragam Pramuka Penggalang Lengkap',
      description: 'Kemeja bahan Drill, rok/celana bahan Drill. Jahitan rapi sesuai standar nasional.',
      price: 175000,
      stock: 20,
      category: 'Seragam',
    },
    {
      name: 'Kaos Olahraga Komunitas (Custom)',
      description: 'Menerima pesanan custom sablon dan bordir untuk komunitas atau organisasi seperti IPNU-IPPNU.',
      price: 85000,
      stock: 100,
      category: 'Custom',
    },
    {
      name: 'Jaket Almamater Sekolah / Organisasi',
      description: 'Bahan American Drill dengan furing dalam. Free bordir logo di dada kiri.',
      price: 160000,
      stock: 15,
      category: 'Custom',
    }
  ]

  // Proses input data satu per satu ke MySQL
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Seeding katalog produk selesai! ✅')
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