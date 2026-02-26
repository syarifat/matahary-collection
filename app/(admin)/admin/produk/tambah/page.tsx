import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function TambahProdukPage() {
  async function simpanProduk(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;

    await prisma.product.create({
      data: { name, category, price, stock, description },
    });

    redirect("/admin/produk");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/produk" className="p-2 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tambah Produk Baru</h1>
          <p className="text-slate-500 text-sm mt-1">Masukkan detail pakaian ke dalam katalog Matahary.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form action={simpanProduk} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Produk</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Cth: Setelan Training SD Warna Merah"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
              <select 
                name="category" 
                required 
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white"
              >
                <option value="Training">Training Olahraga</option>
                <option value="Seragam">Seragam Sekolah</option>
                <option value="Custom">Pesanan Custom / Sablon</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Harga (Rp)</label>
                <input 
                  type="number" 
                  name="price" 
                  required 
                  placeholder="150000"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Stok Awal</label>
                <input 
                  type="number" 
                  name="stock" 
                  required 
                  placeholder="50"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Lengkap</label>
              <textarea 
                name="description" 
                required 
                rows={4} 
                placeholder="Masukkan detail bahan, ukuran (S, M, L, XL), dan catatan lainnya..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-y"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              className="bg-slate-900 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center gap-2 shadow-sm"
            >
              <Save size={18} /> Simpan ke Katalog
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}