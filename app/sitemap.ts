import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.torossolar.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/urunler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projelerimiz`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/gunes-paneli-mersin`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cati-ges`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tarimsal-sulama`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/gunes-paneli-adana`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/ev-sarj-istasyonu`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/rehber/ev-icin-kac-panel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/rehber/cati-ges-maliyeti`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/rehber/mersin-gunes-enerjisi-uretimi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/rehber/ciftciler-icin-solar-sulama`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({ select: { id: true } });
    productRoutes = products.map((p: { id: number }) => ({
      url: `${BASE_URL}/urunler/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB erisilemezse statik rotalarla devam et
  }

  return [...staticRoutes, ...productRoutes];
}
