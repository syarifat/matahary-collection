import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageCircle, 
  Search 
} from "lucide-react";

export default async function AdminOrdersPage() {
  // Fetch data orders dengan relasi User
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manajemen Pesanan</h1>
          <p className="text-slate-500 text-sm mt-1">Pantau semua transaksi masuk di Matahary Collection.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Cari ID Pesanan..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[11px]">Order ID</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[11px]">Pelanggan</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[11px]">Total Bayar</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[11px]">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[11px]">Waktu Transaksi</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-400 bg-slate-50/30">
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag size={40} className="text-slate-200" />
                      <p>Belum ada riwayat pesanan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400 italic">
                      #{order.id.toString().slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{order.user.name}</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-tight">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-slate-900">Rp {order.totalAmount.toLocaleString('id-ID')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </Link>
                        <button 
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Hubungi WA"
                        >
                          <MessageCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    PENDING: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock size={12} /> },
    PAID: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 size={12} /> },
    SHIPPED: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: <ShoppingBag size={12} /> },
    CANCELLED: { color: "bg-red-100 text-red-700 border-red-200", icon: <XCircle size={12} /> },
  };

  const current = config[status as keyof typeof config] || config.PENDING;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${current.color}`}>
      {current.icon}
      {status}
    </span>
  );
}