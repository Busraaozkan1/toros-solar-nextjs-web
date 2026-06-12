import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import UrunlerClient from "./UrunlerClient";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Ürünlerimiz | Güneş Paneli, İnverter ve Solar Paketler",
  description:
    "Güneş panelleri, inverterler, aküler ve hazır solar paketler. Mersin'den Türkiye geneline gönderim, kurulum desteğiyle birlikte. Ürün kataloğumuzu inceleyin.",
  alternates: { canonical: "/urunler" },
};

export default async function UrunlerPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];

  try {
    products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  } catch (err) {
    // Build sirasinda DB yoksa bos listeyle devam et; canlida hata firlat ki
    // Next.js bos sayfayi cache'lemek yerine son saglam sayfayi sunmaya devam etsin
    if (process.env.NEXT_PHASE !== "phase-production-build") throw err;
  }

  type DbProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    priceText: string | null;
    imageUrl: string | null;
    category?: string | null;
  };

  const initialProducts = products.map((p: DbProduct) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceText: p.priceText,
    category: p.category ?? null,
    imageUrl:
      typeof p.imageUrl === "string" && p.imageUrl.trim() === "" ? null : p.imageUrl,
  }));

  return <UrunlerClient initialProducts={initialProducts} />;
}
