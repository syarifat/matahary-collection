import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();

  // 1. Verifikasi status dari Midtrans
  const orderId = data.order_id;
  const transactionStatus = data.transaction_status;

  if (transactionStatus === "settlement" || transactionStatus === "capture") {
    // 2. Update Status di Database jadi PAID
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID" },
      include: { user: true }
    });

    // 3. Kirim WA via Fonnte
    await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: { Authorization: process.env.FONNTE_TOKEN || "" },
      body: new URLSearchParams({
        target: process.env.ADMIN_WHATSAPP || "",
        message: `🔥 *PESANAN BARU MASUK!*\n\nOrder ID: ${orderId}\nPelanggan: ${updatedOrder.user.name}\nTotal: Rp ${updatedOrder.totalAmount.toLocaleString('id-ID')}\n\nSegera proses pesanan di Dashboard Admin!`,
      }),
    });
  }

  return NextResponse.json({ status: "ok" });
}