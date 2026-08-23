import React from "react";
import type { Metadata } from "next";
import SolarWizard from "../components/SolarWizard";

export const metadata: Metadata = {
  title: "Solar İhtiyaç Sihirbazı | Size Özel Güneş Enerjisi Sistemi",
  description:
    "Cihazlarınıza, 12 aylık ortalama elektrik tüketiminize veya tarımsal pompanıza göre yaklaşık güç ve yaz koşullarındaki panel ihtiyacınızı hesaplayın. Ücretsiz keşif ve net teklif: 0536 733 36 78.",
  alternates: { canonical: "/ihtiyac-sihirbazi" },
};

export default function IhtiyacSihirbaziPage() {
  return <SolarWizard />;
}
