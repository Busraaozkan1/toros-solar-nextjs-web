import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SolarWizard from "../components/SolarWizard";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Solar İhtiyaç Sihirbazı | Size Özel Güneş Enerjisi Sistemi",
  description:
    "Cihazlarınıza, elektrik faturanıza veya tarımsal pompanıza göre size en uygun güneş enerjisi sistemini saniyeler içinde keşfedin. Ücretsiz keşif ve net teklif: 0536 733 36 78.",
  alternates: { canonical: "/ihtiyac-sihirbazi" },
};

type DbProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  priceText: string | null;
  category: string | null;
};

export default async function IhtiyacSihirbaziPage() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  } catch (err) {
    if (process.env.NEXT_PHASE !== "phase-production-build") throw err;
  }

  const items = products.map((p: DbProduct) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    priceText: p.priceText,
    category: p.category,
  }));

  return <SolarWizard products={items} />;
}
