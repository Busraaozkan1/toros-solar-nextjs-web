import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return null;
  }

  try {
    const product = await prisma.product.findUnique({ where: { id: numericId } });
    if (!product) return null;
    return {
      ...product,
      imageUrl:
        typeof product.imageUrl === "string" && product.imageUrl.trim() === ""
          ? null
          : product.imageUrl,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Ürün Bulunamadı" };
  }

  const description = product.description
    ? product.description.replace(/\s+/g, " ").slice(0, 155)
    : `${product.name} - Toros Solar ürün detayı, fiyat ve teknik özellikler.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/urunler/${product.id}` },
    openGraph: {
      title: `${product.name} | Toros Solar`,
      description,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl || undefined,
    brand: { "@type": "Brand", name: "Toros Solar" },
    offers: {
      "@type": "Offer",
      url: `https://www.torossolar.com/urunler/${product.id}`,
      priceCurrency: "TRY",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Toros Solar" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient
        product={{
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          priceText: product.priceText,
          description: product.description,
        }}
      />
    </>
  );
}
