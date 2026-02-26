import Link from "next/link";
import { LayoutDashboard, Shirt, ShoppingBag, Users, LogOut, Search, Bell } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // Langsung mulai dari div, karena html & body sudah ada di Root Layout
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20">
        {/* ... (Isi Sidebar Sama Seperti Sebelumnya) ... */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xl tracking-wide">
            <span className="bg-amber-500 p-1.5 rounded-lg text-slate-900"><Shirt size={20} /></span>
            Matahary
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all group">
            <LayoutDashboard size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/admin/produk" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all group">
            <Shirt size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
            <span className="font-medium">Katalog Produk</span>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ... (Isi Header & Main Sama Seperti Sebelumnya) ... */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}