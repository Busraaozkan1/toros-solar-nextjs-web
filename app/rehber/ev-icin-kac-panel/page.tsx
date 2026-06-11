import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../../components/LandingCta";

export const metadata: Metadata = {
  title: "Ev İçin Kaç Güneş Paneli Gerekir? (Hesaplama Rehberi)",
  description:
    "4 kişilik bir ev için kaç güneş paneli gerekir? Aylık tüketime göre panel sayısı hesaplama, örnek senaryolar ve çatı alanı gereksinimleri. Pratik rehber.",
  alternates: { canonical: "/rehber/ev-icin-kac-panel" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "4 kişilik bir ev için kaç güneş paneli gerekir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aylık ortalama 250-350 kWh tüketen 4 kişilik bir ev için Akdeniz bölgesinde genellikle 5-7 adet 550W panel (yaklaşık 3 kW sistem) yeterlidir. Klima kullanımı yoğunsa 8-10 panele çıkılabilir.",
      },
    },
    {
      "@type": "Question",
      name: "1 güneş paneli ne kadar elektrik üretir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Güncel 550W bir panel, Mersin-Adana bölgesinde yılda yaklaşık 800-900 kWh elektrik üretir. Bu, aylık ortalama 65-75 kWh demektir.",
      },
    },
    {
      "@type": "Question",
      name: "Panel sayısı için çatımda ne kadar alan olmalı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "550W bir panel yaklaşık 2,6 m² yer kaplar. 6 panellik tipik bir ev sistemi için 16-20 m² gölgesiz çatı alanı yeterlidir.",
      },
    },
  ],
};

export default function EvIcinKacPanelPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="bg-dark text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">Ev İçin Kaç Güneş Paneli Gerekir?</h1>

            <p className="lead text-white opacity-75 mb-4">
              Kısa cevap: aylık elektrik tüketiminize bağlı. Bu rehberde kendi panel
              sayınızı iki dakikada hesaplamanızı sağlayacak pratik yöntemi ve örnek
              senaryoları bulacaksınız.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Adım 1: Aylık Tüketiminizi Bulun</h2>
            <p className="text-white opacity-75">
              Elektrik faturanızda &quot;tüketim&quot; satırına bakın; kWh cinsinden aylık
              kullanımınız yazar. Türkiye&apos;de 4 kişilik bir hane ortalama 250-350 kWh/ay
              tüketir; klima yoğun kullanılan Akdeniz evlerinde yaz aylarında bu 450-600
              kWh&apos;e çıkabilir. Sağlıklı hesap için son 12 ayın ortalamasını alın.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Adım 2: Panel Üretimini Bilin</h2>
            <p className="text-white opacity-75">
              Güncel standart bir 550W panel, Mersin-Adana bölgesinin güneşlenme
              koşullarında <strong>ayda ortalama 65-75 kWh</strong> üretir (yılda ~800-900 kWh).
              Kuzey bölgelerde bu değer %15-25 düşer.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Adım 3: Basit Formül</h2>
            <p className="text-white opacity-75 mb-3">
              <strong>Panel sayısı = Aylık tüketim (kWh) ÷ 70</strong>
            </p>
            <ul className="text-white opacity-75">
              <li className="mb-2">200 kWh/ay tüketim → <strong>3 panel</strong> (~1,7 kW sistem)</li>
              <li className="mb-2">300 kWh/ay tüketim → <strong>5 panel</strong> (~2,8 kW sistem)</li>
              <li className="mb-2">450 kWh/ay tüketim → <strong>7 panel</strong> (~3,9 kW sistem)</li>
              <li className="mb-2">600 kWh/ay tüketim → <strong>9 panel</strong> (~5 kW sistem)</li>
            </ul>
            <p className="text-white opacity-75">
              Her panel yaklaşık 2,6 m² yer kaplar; 6 panellik tipik bir sistem için
              16-20 m² gölgesiz çatı alanı yeterlidir.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Hesabı Etkileyen Faktörler</h2>
            <p className="text-white opacity-75">
              Çatınızın yönü ve eğimi, gölgelenme, inverter verimi ve gelecekteki tüketim
              planlarınız (elektrikli araç, klima ilavesi) sistemin boyutunu değiştirir.
              Bu yüzden formül size güçlü bir ön fikir verir; kesin boyutlandırma için
              yerinde keşif şarttır — <Link href="/gunes-paneli-mersin" className="text-gold">Mersin ve
              çevresinde keşfimiz ücretsizdir</Link>.
            </p>

            <LandingCta title="Eviniz İçin Net Hesap İsteyin" />

            <p className="text-white-50 small">
              Devamını okuyun:{" "}
              <Link href="/rehber/cati-ges-maliyeti" className="text-gold">Çatı GES maliyeti ne kadar?</Link> ·{" "}
              <Link href="/cati-ges" className="text-gold">Çatı GES kurulum hizmetimiz</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
