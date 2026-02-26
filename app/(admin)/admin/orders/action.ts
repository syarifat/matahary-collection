"use server";

export async function kirimTagihanWA(noWA: string, namaSiswa: string, linkBayar: string) {
  const pesan = `Halo *${namaSiswa}*,\n\nPesanan custom kamu di *Matahary Collection* sudah siap. Silakan lakukan pembayaran melalui link berikut:\n\n${linkBayar}\n\nTerima kasih!`;

  await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: { Authorization: process.env.FONNTE_TOKEN || "" },
    body: new URLSearchParams({
      target: noWA,
      message: pesan,
    }),
  });
  
  return { success: true };
}