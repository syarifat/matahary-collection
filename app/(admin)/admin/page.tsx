import { Package, TrendingUp, Users, ShoppingCart } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Pantau performa penjualan Matahary Collection hari ini.</p>
      </div>
      
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pendapatan" value="Rp 4.5M" icon={<TrendingUp size={24} />} color="text-emerald-600" bg="bg-emerald-100" />
        <StatCard title="Pesanan Baru" value="12" icon={<ShoppingCart size={24} />} color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Total Produk" value="86" icon={<Package size={24} />} color="text-amber-600" bg="bg-amber-100" />
        <StatCard title="Pelanggan Aktif" value="340" icon={<Users size={24} />} color="text-purple-600" bg="bg-purple-100" />
      </div>

      {/* Placeholder untuk Chart/Tabel Aktivitas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Pesanan Terbaru</h2>
        <div className="flex items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
          <p className="text-slate-400 text-sm">Belum ada pesanan masuk hari ini.</p>
        </div>
      </div>
    </div>
  );
}

// Komponen Card kecil untuk mempermudah koding
function StatCard({ title, value, icon, color, bg }: { title: string, value: string, icon: React.ReactNode, color: string, bg: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}