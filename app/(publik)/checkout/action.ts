"use server";

import { prisma } from "@/lib/prisma";
import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function createOrder(cartItems: any[], totalAmount: number) {
  // 1. Buat record Order di Database (MySQL)
  // Catatan: Sementara kita pakai dummy User ID 1 sampai fitur Auth beres
  const order = await prisma.order.create({
    data: {
      userId: 1, 
      totalAmount: totalAmount,
      status: "PENDING",
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // 2. Siapkan parameter untuk Midtrans
  const parameter = {
    transaction_details: {
      order_id: order.id,
      gross_amount: totalAmount,
    },
    item_details: cartItems.map((item) => ({
      id: item.id.toString(),
      price: item.price,
      quantity: item.quantity,
      name: item.name,
    })),
  };

  // 3. Minta Snap Token dari Midtrans
  const transaction = await snap.createTransaction(parameter);
  
  // 4. Update order dengan Snap Token di Database
  await prisma.order.update({
    where: { id: order.id },
    data: { snapToken: transaction.token },
  });

  return transaction.token;
}