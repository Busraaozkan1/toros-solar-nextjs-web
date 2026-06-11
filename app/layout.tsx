import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SiteChrome from "./components/SiteChrome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.torossolar.com"),
  title: {
    default: "Toros Solar | Mersin Güneş Enerjisi Sistemleri ve Güneş Paneli Kurulumu",
    template: "%s | Toros Solar",
  },
  description:
    "Mersin ve Adana'da anahtar teslim güneş enerjisi sistemleri: çatı GES, güneş paneli kurulumu, tarımsal sulama ve off-grid çözümler. Ücretsiz keşif için arayın: 0536 733 36 78.",
  keywords: [
    "güneş paneli mersin",
    "güneş enerjisi mersin",
    "çatı ges",
    "güneş paneli kurulumu",
    "tarımsal sulama güneş paneli",
    "güneş enerjisi sistemleri",
    "solar panel mersin",
    "ges kurulumu",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.torossolar.com",
    siteName: "Toros Solar",
    title: "Toros Solar | Mersin Güneş Enerjisi Sistemleri",
    description:
      "Mersin ve Adana'da anahtar teslim güneş enerjisi sistemleri. 15 yıllık tecrübe, ücretsiz keşif.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.torossolar.com/#business",
  name: "Toros Solar",
  description:
    "Mersin merkezli güneş enerjisi sistemleri firması. Çatı GES, güneş paneli kurulumu, tarımsal sulama ve off-grid solar çözümleri.",
  url: "https://www.torossolar.com",
  telephone: "+905367333678",
  email: "info@torossolar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cumhuriyet Mah. 1653 Sokak No.3",
    addressLocality: "Yenişehir",
    addressRegion: "Mersin",
    addressCountry: "TR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Mersin" },
    { "@type": "AdministrativeArea", name: "Adana" },
  ],
  sameAs: ["https://wa.me/905367333678"],
  priceRange: "₺₺",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${poppins.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
