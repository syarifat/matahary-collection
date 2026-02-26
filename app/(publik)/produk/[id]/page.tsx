import { prisma } from "@/lib/prisma"; // sesuaikan jika path masih ../../../lib/prisma
import { notFound } from "next/navigation";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

// Tambahkan Promise pada tipe params
export default async function DetailProduk({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  // 1. Wajib di-await dulu untuk mengambil id dari URL
  const { id } = await params;
  const productId = parseInt(id);

  // 2. Jika ID bukan angka, langsung 404
  if (isNaN(productId)) {
    notFound();
  }

  // 3. Query database berdasarkan ID
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition mb-8 w-fit">
        <ArrowLeft size={20} /> Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sisi Kiri: Placeholder Gambar */}
        <div className="bg-white rounded-3xl border border-slate-200 aspect-square flex items-center justify-center overflow-hidden shadow-sm">
           <span className="text-slate-400 font-medium">No Image Available</span>
        </div>

        {/* Sisi Kanan: Detail & Aksi */}
        <div className="flex flex-col">
          <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg w-fit mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl font-black text-slate-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-amber-600 mb-6 font-sans">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
            <h3 className="font-bold mb-2 text-slate-800">Deskripsi Produk:</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <ShieldCheck className="text-emerald-500" size={20} />
              <span>Bahan Premium & Jahitan Rapi khas Matahary</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <Truck className="text-blue-500" size={20} />
              <span>Siap kirim ke seluruh Indonesia dari Tulungagung</span>
            </div>
          </div>

          <div className="mt-auto flex gap-4">
            <AddToCartButton 
                product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    quantity: 1
                }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}