import React from "react";
import type { Metadata } from "next";
import SolarWizard from "../components/SolarWizard";

export const metadata: Metadata = {
  title: "Solar İhtiyaç Sihirbazı | Size Özel Güneş Enerjisi Sistemi",
  description:
    "Cihazlarınıza, elektrik tüketiminize veya tarımsal pompanıza göre yaklaşık enerji ihtiyacınızı saniyeler içinde hesaplayın. Ücretsiz keşif ve net teklif: 0536 733 36 78.",
  alternates: { canonical: "/ihtiyac-sihirbazi" },
};

export default function IhtiyacSihirbaziPage() {
  return <SolarWizard />;
}
