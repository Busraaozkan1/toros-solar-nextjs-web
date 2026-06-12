import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import HomeClient from "./components/HomeClient";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Toros Solar | Mersin Güneş Enerjisi Sistemleri ve Güneş Paneli Kurulumu",
  description:
    "Mersin ve Adana'da anahtar teslim güneş enerjisi: çatı GES, güneş paneli kurulumu, tarımsal sulama ve off-grid çözümler. 15 yıllık tecrübe, ücretsiz keşif: 0536 733 36 78.",
  alternates: { canonical: "/" },
};

type DbProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  priceText: string | null;
  imageUrl: string | null;
};

type DbProject = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
};

function normalizeImage<T extends { imageUrl: string | null }>(item: T): T {
  return {
    ...item,
    imageUrl:
      typeof item.imageUrl === "string" && item.imageUrl.trim() === ""
        ? null
        : item.imageUrl,
  };
}

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    [products, projects] = await Promise.all([
      prisma.product.findMany({ orderBy: { id: "desc" } }),
      prisma.project.findMany({ orderBy: { id: "desc" } }),
    ]);
  } catch (err) {
    // Build sirasinda DB yoksa bos listelerle devam et; canlida hata firlat ki
    // Next.js bos sayfayi cache'lemek yerine son saglam sayfayi sunmaya devam etsin
    if (process.env.NEXT_PHASE !== "phase-production-build") throw err;
  }

  const initialProducts = products.map(normalizeImage).map((p: DbProduct) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceText: p.priceText,
    imageUrl: p.imageUrl,
  }));

  const initialProjects = projects.map(normalizeImage).map((p: DbProject) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
  }));

  return <HomeClient initialProducts={initialProducts} initialProjects={initialProjects} />;
}
