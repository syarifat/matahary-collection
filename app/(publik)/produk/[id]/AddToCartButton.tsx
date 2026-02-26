"use client";

import { useCart, CartItem } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast"; // Opsional: npm install react-hot-toast

export default function AddToCartButton({ product }: { product: CartItem }) {
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    alert(`${product.name} berhasil ditambah ke keranjang!`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
    >
      <ShoppingCart size={20} /> Tambah ke Keranjang
    </button>
  );
}