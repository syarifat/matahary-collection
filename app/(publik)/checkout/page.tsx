"use client";

import { useCart } from "@/lib/store";
import { useEffect, useState } from "react";
import { createOrder } from "./action";
import Script from "next/script";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePay = async () => {
    setLoading(true);
    try {
      const snapToken = await createOrder(items, total);
      
      // Buka Popup Midtrans
      (window as any).snap.pay(snapToken, {
        onSuccess: (result: any) => {
          alert("Pembayaran Berhasil!");
          clearCart();
          window.location.href = "/";
        },
        onPending: (result: any) => {
          alert("Menunggu Pembayaran...");
        },
        onError: (result: any) => {
          alert("Pembayaran Gagal!");
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      {/* Script Midtrans Snap */}
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} 
      />

      <h1 className="text-3xl font-black mb-4">Finalisasi Pesanan</h1>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
        <p className="text-slate-500 mb-2">Total yang harus dibayar:</p>
        <p className="text-4xl font-black text-amber-600">Rp {total.toLocaleString('id-ID')}</p>
      </div>

      <button 
        onClick={handlePay}
        disabled={loading || items.length === 0}
        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-500 transition-all disabled:bg-slate-300"
      >
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>
    </div>
  );
}