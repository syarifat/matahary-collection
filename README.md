# ☀️ Matahary Collection - E-Commerce System

**Matahary Collection** adalah platform e-commerce modern yang dikembangkan menggunakan **Next.js 15**, **Prisma**, dan **MySQL**. Sistem ini dirancang khusus untuk memenuhi kebutuhan bisnis konveksi dan penjualan pakaian, seperti setelan training olahraga, seragam sekolah, dan pesanan custom organisasi.

Sistem ini mengintegrasikan alur belanja pelanggan yang mulus dengan dashboard manajemen admin yang kuat, serta dukungan pembayaran otomatis dan notifikasi real-time.

---

## 🚀 Fitur Utama (Sudah Diimplementasikan)

### 🛒 Sisi Pelanggan (Public)
* **Katalog Produk Dinamis**: Menampilkan daftar produk (Training, Seragam, Custom) langsung dari database MySQL.
* **Responsive UI/UX**: Tampilan premium dengan tema warna *Amber & Slate* yang dioptimalkan untuk perangkat mobile dan desktop.
* **Sistem Keranjang Belanja**: Manajemen keranjang berbasis *Client-side state* menggunakan **Zustand** agar data tetap tersimpan meski halaman direfresh.
* **Dynamic Product Detail**: Halaman detail produk otomatis berdasarkan ID dengan informasi stok dan kategori.
* **Integrasi Pembayaran Midtrans**: Proses checkout yang memunculkan *popup* Snap Midtrans untuk berbagai metode pembayaran (VA, E-Wallet, dll).

### 🛠️ Sisi Administrator (Dashboard)
* **Overview Dashboard**: Ringkasan statistik performa toko.
* **Manajemen Produk (CRUD)**: Menambah, melihat, mengubah, dan menghapus data produk pakaian.
* **Manajemen Pesanan (Orders)**: Daftar seluruh transaksi masuk dengan status pembayaran yang sinkron dengan Midtrans.
* **Detail Pesanan Mendalam**: Melihat rincian item yang dibeli per transaksi untuk mempermudah pengepakan barang.
* **Seeder Database Otomatis**: Skrip untuk mengisi data katalog awal secara cepat untuk kebutuhan pengembangan.

### 🔌 Integrasi Pihak Ketiga
* **Midtrans Snap API**: Gateway pembayaran otomatis.
* **Fonnte (Webhook Ready)**: Fondasi untuk pengiriman notifikasi pesanan otomatis via WhatsApp ke admin dan pelanggan.

---

## 🏗️ Tech Stack
* **Framework**: Next.js 15 (App Router)
* **Database**: MySQL
* **ORM**: Prisma Client
* **State Management**: Zustand (Persist Middleware)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Payment**: Midtrans Node.js SDK

---

## 💡 Saran Pengembangan Selanjutnya

Mengingat latar belakang Anda dalam mengembangkan sistem sekolah seperti **SIPREDI** dan **KaSiPay**, berikut adalah beberapa peningkatan yang disarankan:

1.  **Sistem Otentikasi (NextAuth.js)**: Menambahkan fitur Login/Register untuk pelanggan agar dapat melihat riwayat pesanan mereka sendiri.
2.  **Manajemen Stok Otomatis**: Implementasi logika di server untuk mengurangi stok produk secara otomatis segera setelah status pembayaran menjadi `PAID`.
3.  **Upload Gambar Produk**: Mengintegrasikan *Uploadthing* atau *Cloudinary* agar admin bisa mengunggah foto baju asli dari dashboard.
4.  **Laporan Penjualan (Export PDF/Excel)**: Menambahkan fitur rekap harian atau bulanan untuk membantu evaluasi bisnis sesuai kompetisi *National Business Plan* yang pernah diikuti.
5.  **Integrasi WhatsApp Gateway Penuh**: Mengaktifkan webhook Fonnte agar setiap perubahan status (dikirim, selesai) otomatis memberikan notifikasi ke WA pelanggan.

---

## 🛠️ Cara Menjalankan di Lokal
1.  Clone repository ini.
2.  Install dependensi: `npm install`.
3.  Sesuaikan `.env` dengan kredensial MySQL dan Midtrans Anda.
4.  Push skema database: `npx prisma db push`.
5.  Jalankan seeder: `npx prisma db seed`.
6.  Mulai server: `npm run dev`.