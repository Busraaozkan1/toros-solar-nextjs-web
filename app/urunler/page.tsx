import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
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

  const categoryOrder = new Map(PRODUCT_CATEGORIES.map((c, i) => [c.label, i]));

  const initialProducts = products
    .map((p: DbProduct) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      priceText: p.priceText,
      category: p.category ?? null,
      imageUrl:
        typeof p.imageUrl === "string" && p.imageUrl.trim() === "" ? null : p.imageUrl,
    }))
    // Kategori sirasina gore grupla (kategorisizler en sona), kategori icinde ada gore sirala
    .sort((a: { category: string | null; name: string }, b: { category: string | null; name: string }) => {
      const ai = a.category != null ? (categoryOrder.get(a.category) ?? 99) : 99;
      const bi = b.category != null ? (categoryOrder.get(b.category) ?? 99) : 99;
      if (ai !== bi) return ai - bi;
      return a.name.localeCompare(b.name, "tr");
    });

  return <UrunlerClient initialProducts={initialProducts} />;
}
