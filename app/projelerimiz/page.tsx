import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProjelerClient from "./ProjelerClient";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Projelerimiz | Tamamlanan Güneş Enerjisi Kurulumları",
  description:
    "Mersin ve Adana'da tamamladığımız güneş enerjisi projeleri: çatı GES, tarımsal sulama ve off-grid kurulum referanslarımız.",
  alternates: { canonical: "/projelerimiz" },
};

export default async function ProjelerPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    projects = await prisma.project.findMany({ orderBy: { id: "desc" } });
  } catch {
    // DB erisilemezse bos listeyle render et
  }

  type DbProject = {
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
  };

  const initialProjects = projects.map((p: DbProject) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    imageUrl:
      typeof p.imageUrl === "string" && p.imageUrl.trim() === "" ? null : p.imageUrl,
  }));

  return <ProjelerClient initialProjects={initialProjects} />;
}
