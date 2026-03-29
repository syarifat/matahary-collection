import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Package, 
  User, 
  CreditCard, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Phone,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Ambil ID dari params (tunggu promise selesai)
  const { id } = await params;

  // 2. Query database - Hilangkan parseInt jika ID di database adalah String/UUID
  // Jika di schema.prisma ID Order adalah @id @default(autoincrement()), gunakan Number(id)
  // Jika di schema.prisma ID Order adalah @id @default(cuid()) atau @default(uuid()), gunakan id langsung
  const order = await prisma.order.findUnique({
    where: { 
      id: id // Coba kirim string langsung dulu
    }, 
    include: {
      user: true,
      items: {
        include: {
          product: true 
        }
      }
    }
  });

  if (!order) {
    const orderWithInt = await prisma.order.findUnique({
      where: { id: parseInt(id) || 0 },
      include: {
        user: true,
        items: { include: { product: true } }
      }
    });
    
    if (!orderWithInt) notFound();
    return <OrderContent order={orderWithInt} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
       {}
       <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-2 hover:bg-white border border-transparent hover:border-slate-200 text-slate-500 rounded-xl transition-all shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Detail Pesanan</h1>
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-mono">#{order.id}</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">Informasi lengkap mengenai transaksi pelanggan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-slate-700 uppercase text-xs tracking-widest">
                <Package size={18} className="text-amber-500" /> Item Pesanan
              </div>
              <span className="text-xs font-bold text-slate-400">{order.items.length} Macam Produk</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 border border-slate-200 group-hover:bg-white transition-colors">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg leading-tight">{item.product.name}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        <span className="font-bold text-slate-700">{item.quantity}</span> x Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">
                      Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Total</p>
                <h2 className="text-3xl font-black text-amber-500">
                  Rp {order.totalAmount.toLocaleString('id-ID')}
                </h2>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <User size={16} className="text-blue-500" /> Profil Pelanggan
            </h3>
            <p className="font-black text-slate-800 leading-none mb-1">{order.user.name}</p>
            <p className="text-xs text-slate-500 mb-4">{order.user.email}</p>
            <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-emerald-100">
              <Phone size={14} /> Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}