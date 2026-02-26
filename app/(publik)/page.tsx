import { prisma } from "../../lib/prisma"; 
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";

export default async function BerandaToko() {
  // Ambil data produk dari database (Hanya yang stoknya lebih dari 0)
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="pb-20">
      {/* HERO SECTION */}
      <section className="bg-amber-500 text-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Kualitas Terbaik untuk <br className="hidden md:block" /> Aktivitasmu.
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto opacity-90">
            Temukan setelan training, seragam sekolah, dan layanan pakaian custom dengan bahan premium di Matahary Collection.
          </p>
          <a href="#katalog" className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors inline-block shadow-lg">
            Lihat Koleksi Kami
          </a>
        </div>
      </section>

      {/* KATALOG PRODUK */}
      <section id="katalog" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 font-sans">Koleksi Terbaru</h2>
            <p className="text-slate-500 mt-2">Pakaian siap kirim untuk kebutuhanmu.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-lg font-medium">Belum ada produk yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
                
                {/* Area Gambar (Link ke Detail) */}
                <Link href={`/produk/${product.id}`} className="relative block overflow-hidden aspect-[4/5] bg-slate-100">
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-slate-400 font-medium text-sm">No Image</span>
                  </div>
                  
                  {/* Overlay saat Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full text-slate-900 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Eye size={20} />
                    </div>
                  </div>

                  {/* Badge Kategori */}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm z-10">
                    {product.category}
                  </span>
                </Link>

                {/* Info Produk */}
                <div className="p-6 flex flex-col flex-grow">
                  <Link href={`/produk/${product.id}`}>
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-2 leading-tight mb-4 group-hover:text-amber-600 transition-colors h-12">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Harga</p>
                      <p className="font-black text-slate-900 text-xl">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    
                    <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg active:scale-95">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}