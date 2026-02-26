"use client"; // Kita ubah ke Client Component agar Navbar bisa interaktif dengan Zustand

import Link from "next/link";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { useCart } from "@/lib/store";
import { useEffect, useState } from "react";

export default function PublikLayout({ children }: { children: React.ReactNode }) {
  const items = useCart((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Pastikan komponen sudah "mounted" di browser sebelum menampilkan angka keranjang
  // Ini trik paling ampuh untuk menghindari Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hitung total item (misal: 2 baju A + 1 baju B = 3 item)
  const totalItem = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* === NAVBAR PUBLIK === */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 text-2xl font-black tracking-tighter hover:opacity-80 transition">
              <span className="text-amber-500">Matahary</span>
              <span className="text-slate-900">Collection</span>
            </Link>

            {/* Search Bar (Desktop) - Tetap Statis */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Cari setelan training, seragam..." 
                  className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-full py-2 pl-4 pr-10 outline-none transition-all text-sm"
                />
                <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
              </div>
            </div>

            {/* Menu Kanan */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/cart" className="relative p-2 text-slate-600 hover:text-amber-500 transition-colors group">
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                
                {/* Badge Angka Keranjang - Hanya muncul jika sudah mounted */}
                {mounted && totalItem > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                    {totalItem}
                  </span>
                )}
              </Link>

              <div className="hidden md:block h-6 w-px bg-slate-200"></div>

              <Link href="/admin" className="hidden md:flex items-center gap-2 p-2 text-slate-600 hover:text-amber-500 transition-colors text-sm font-semibold">
                <User size={20} />
                <span>Admin</span>
              </Link>
              
              <button className="md:hidden p-2 text-slate-600">
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* === KONTEN UTAMA === */}
      <main className="flex-grow">
        {children}
      </main>

      {/* === FOOTER === */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-white text-2xl font-black mb-6">Matahary Collection</h3>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Pusat konveksi dan penjualan setelan training olahraga, seragam sekolah, dan pakaian custom dengan standar kualitas tinggi di Tulungagung.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Layanan</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/" className="hover:text-amber-500 transition">Katalog Produk</Link></li>
                <li><Link href="/custom" className="hover:text-amber-500 transition">Pesanan Custom</Link></li>
                <li><Link href="/track" className="hover:text-amber-500 transition">Cek Status Pesanan</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Bantuan</h3>
              <p className="text-sm text-slate-400">WhatsApp: 0812-3456-7890</p>
              <p className="text-sm text-slate-400 mt-4 font-semibold text-white underline cursor-pointer">Lokasi: Kauman, Tulungagung</p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            &copy; 2026 Matahary Collection. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}