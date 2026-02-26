"use client";

import { useCart } from "@/lib/store";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  // Mencegah hydration error karena localStorage
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const totalHarga = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Keranjang Belanja</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <ShoppingBag size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 mb-6">Keranjangmu masih kosong nih.</p>
          <Link href="/" className="bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-bold">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Daftar Barang */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-xl flex-shrink-0"></div>
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-amber-600 font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white rounded-md transition"><Minus size={16} /></button>
                  <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white rounded-md transition"><Plus size={16} /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={20} /></button>
              </div>
            ))}
          </div>

          {/* Ringkasan Belanja */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 h-fit sticky top-24">
            <h2 className="font-bold text-xl mb-6 text-slate-800">Ringkasan Pesanan</h2>
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex justify-between text-slate-500">
                <span>Total Barang</span>
                <span>{items.length} item</span>
              </div>
            </div>
            <div className="flex justify-between py-6">
              <span className="font-bold">Total Harga</span>
              <span className="font-black text-xl text-amber-600">Rp {totalHarga.toLocaleString('id-ID')}</span>
            </div>
            <Link href="/checkout" className="block w-full bg-slate-900 text-white text-center font-bold py-4 rounded-2xl hover:bg-slate-800 transition shadow-lg">
              Lanjut ke Pembayaran
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}