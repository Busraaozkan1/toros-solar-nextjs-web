import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BundleDeals from "../components/BundleDeals";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Güneş Enerjisi Paketleri | Anahtar Teslim Solar Paket Fiyatları",
  description:
    "Mersin ve Adana'da anahtar teslim güneş enerjisi paketleri: konteyner ev, ev, villa ve işletme/tarım için off-grid ve çatı çözümleri. Başlangıç fiyatları ve ücretsiz keşif: 0536 733 36 78.",
  alternates: { canonical: "/paketler" },
  openGraph: {
    title: "Güneş Enerjisi Paketleri | Toros Solar",
    description:
      "İhtiyacınıza göre kurgulanmış, anahtar teslim güneş enerjisi paketleri. Başlangıç fiyatları ve ücretsiz keşif.",
  },
};

const FAQ = [
  {
    q: "Paket fiyatlarına neler dahil?",
    a: "Başlangıç fiyatları; güneş panellerini, invertörü (off-grid paketlerde akü), taşıyıcı konstrüksiyonu, nakliyeyi ve montajı kapsar. Kesin fiyat, ücretsiz keşif sonrası ihtiyacınıza göre netleşir.",
  },
  {
    q: "Paketi kendi ihtiyacıma göre değiştirebilir miyim?",
    a: "Evet. Paketler bir başlangıç noktasıdır; panel sayısı, akü kapasitesi ve ek ekipman keşif sonrası kullanımınıza göre uyarlanır.",
  },
  {
    q: "Off-grid (şebekesiz) paket nedir?",
    a: "Şebeke elektriği bulunmayan ya da bağımsız çalışmak istenen yerler için panel, akü ve invertörden oluşan; enerjiyi kendi başına üretip depolayan sistemdir. Konteyner ev, yayla evi ve bağ evleri için idealdir.",
  },
  {
    q: "Keşif ücretli mi?",
    a: "Hayır. Mersin, Adana ve çevre ilçelerde keşif ve fiyat teklifi ücretsizdir.",
  },
];

export default function PaketlerPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      {/* Paket kartlari — ana sayfadaki bilesenin aynisi (tek kaynak: lib/bundles.ts) */}
      <BundleDeals />

      {/* Paketler hakkinda — bu sayfaya ozel icerik (SEO derinligi) */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 text-white">
              <h2 className="h3 text-gold mb-3">Anahtar Teslim Güneş Enerjisi Paketleri</h2>
              <p className="opacity-75">
                Paketlerimiz, Mersin ve Adana&apos;da en sık karşılaştığımız ihtiyaçlara göre
                önceden kurgulanmış başlangıç çözümleridir. Her paket anahtar teslimdir; yani
                nakliye ve montaj fiyata dahildir. Listelenen rakamlar başlangıç fiyatı olup,
                kesin teklif çatınıza, arazinize veya cihaz yükünüze göre ücretsiz keşif
                sonrasında belirlenir.
              </p>

              <h2 className="h3 text-gold mt-5 mb-3">Neden Hazır Paket?</h2>
              <ul className="opacity-75">
                <li className="mb-2"><strong>Net başlangıç:</strong> Hangi bütçeyle neye sahip olacağınızı baştan görürsünüz.</li>
                <li className="mb-2"><strong>Anahtar teslim:</strong> Ekipman, taşıyıcı sistem, nakliye ve montaj tek elden.</li>
                <li className="mb-2"><strong>İhtiyaca göre:</strong> Konteyner ev, müstakil ev, villa ve işletme/tarım için ayrı kurgular.</li>
                <li className="mb-2"><strong>Esnek:</strong> Paketler keşif sonrası panel sayısı ve akü kapasitesiyle size uyarlanır.</li>
              </ul>

              <h2 className="h3 text-gold mt-5 mb-3">Sıkça Sorulan Sorular</h2>
              {FAQ.map((f, i) => (
                <div key={i} className="mb-3">
                  <h3 className="h6 text-white mb-1">{f.q}</h3>
                  <p className="opacity-75 mb-0">{f.a}</p>
                </div>
              ))}

              <LandingCta title="Size Uygun Paket İçin Ücretsiz Keşif" />

              <p className="text-white-50 small">
                İlgili sayfalar:{" "}
                <Link href="/ihtiyac-sihirbazi" className="text-gold">İhtiyaç Sihirbazı</Link> ·{" "}
                <Link href="/cati-ges" className="text-gold">Çatı GES sistemleri</Link> ·{" "}
                <Link href="/tarimsal-sulama" className="text-gold">Tarımsal sulama</Link> ·{" "}
                <Link href="/ev-sarj-istasyonu" className="text-gold">EV şarj istasyonu</Link> ·{" "}
                <Link href="/urunler" className="text-gold">Ürünlerimiz</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
