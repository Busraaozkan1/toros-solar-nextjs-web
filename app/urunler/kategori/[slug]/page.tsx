import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PRODUCT_CATEGORIES, categoryBySlug } from "@/lib/categories";
import UrunlerClient from "../../UrunlerClient";

export const revalidate = 600;

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/urunler/kategori/${cat.slug}` },
  };
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

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({
      where: { category: cat.label },
      orderBy: { id: "desc" },
    });
  } catch (err) {
    if (process.env.NEXT_PHASE !== "phase-production-build") throw err;
  }

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

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.title,
    numberOfItems: initialProducts.length,
    itemListElement: initialProducts.slice(0, 30).map((p: { id: number; name: string }, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.torossolar.com/urunler/${p.id}`,
      name: p.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <UrunlerClient
        initialProducts={initialProducts}
        title={cat.label}
        subtitle={cat.description}
        showFilters={false}
      />
    </>
  );
}
