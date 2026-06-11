import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Mersin Güneş Paneli Kurulumu | Anahtar Teslim GES",
  description:
    "Mersin'de güneş paneli kurulumu: çatı GES, ev tipi güneş enerjisi sistemleri ve tarımsal sulama. 15 yıllık tecrübe, ücretsiz keşif. Tarsus, Erdemli, Silifke dahil tüm ilçelere hizmet.",
  alternates: { canonical: "/gunes-paneli-mersin" },
  openGraph: {
    title: "Mersin Güneş Paneli Kurulumu | Toros Solar",
    description:
      "Mersin'de anahtar teslim güneş enerjisi sistemleri. Ücretsiz keşif için arayın.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Mersin'de güneş paneli kurulumu ne kadar sürer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ev tipi bir çatı GES kurulumu, keşif ve projelendirme sonrası genellikle 1-3 gün içinde tamamlanır. Şebeke bağlantı izinleri dahil tüm süreç ortalama 4-8 hafta sürer.",
      },
    },
    {
      "@type": "Question",
      name: "Mersin güneş enerjisi için uygun bir şehir mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mersin, Türkiye'nin en yüksek güneşlenme sürelerine sahip illerinden biridir. Yıllık 3.000 saati aşan güneşlenme süresiyle güneş paneli yatırımının geri dönüş süresi Türkiye ortalamasının altındadır.",
      },
    },
    {
      "@type": "Question",
      name: "Hangi ilçelere hizmet veriyorsunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yenişehir, Mezitli, Toroslar, Akdeniz başta olmak üzere Tarsus, Erdemli, Silifke, Mut, Anamur ve tüm Mersin ilçeleri ile Adana iline hizmet veriyoruz.",
      },
    },
  ],
};

export default function GunesPaneliMersinPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="bg-dark text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">Mersin Güneş Paneli Kurulumu</h1>

            <p className="lead text-white opacity-75 mb-4">
              Toros Solar, Mersin merkezli güneş enerjisi firması olarak konutlara,
              işletmelere ve tarım arazilerine <strong>anahtar teslim güneş paneli kurulumu</strong> yapar.
              Keşiften projelendirmeye, montajdan şebeke bağlantısına kadar tüm süreci tek elden yürütüyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Neden Mersin&apos;de Güneş Enerjisi?</h2>
            <p className="text-white opacity-75">
              Mersin, yıllık 3.000 saati aşan güneşlenme süresiyle Türkiye&apos;nin güneş enerjisi
              potansiyeli en yüksek illerinden biridir. Akdeniz ikliminin sunduğu bu avantaj,
              güneş paneli sisteminizin kendini amorti etme süresini kısaltır: doğru
              boyutlandırılmış bir çatı GES, elektrik faturanızı sıfıra yaklaştırırken
              fazla üretimi şebekeye satarak ek gelir de sağlayabilir.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Hizmetlerimiz</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2">
                <Link href="/cati-ges" className="text-gold">Çatı GES kurulumu</Link> — evler,
                apartmanlar ve işletmeler için öz tüketim sistemleri
              </li>
              <li className="mb-2">
                <Link href="/tarimsal-sulama" className="text-gold">Tarımsal sulama sistemleri</Link> —
                şebekenin ulaşmadığı arazilerde güneş enerjili sulama
              </li>
              <li className="mb-2">Off-grid (şebekeden bağımsız) sistemler — bağ evi, yayla evi ve karavanlar için</li>
              <li className="mb-2">Hibrit ve depolamalı sistemler — kesintisiz enerji için akülü çözümler</li>
              <li className="mb-2">
                <Link href="/urunler" className="text-gold">Panel, inverter ve ekipman satışı</Link> —
                Türkiye geneline gönderim
              </li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Kurulum Süreci Nasıl İşler?</h2>
            <ol className="text-white opacity-75">
              <li className="mb-2"><strong>Ücretsiz keşif:</strong> Çatınızı veya arazinizi yerinde inceliyor, tüketiminizi analiz ediyoruz.</li>
              <li className="mb-2"><strong>Projelendirme ve teklif:</strong> İhtiyacınıza göre sistem tasarlıyor, net fiyat veriyoruz.</li>
              <li className="mb-2"><strong>İzin ve başvurular:</strong> Şebeke bağlantısı ve resmi başvuruları sizin adınıza yürütüyoruz.</li>
              <li className="mb-2"><strong>Montaj:</strong> Uzman ekibimiz kurulumu genellikle 1-3 günde tamamlar.</li>
              <li className="mb-2"><strong>Devreye alma ve takip:</strong> Sistemi teslim ediyor, üretimi birlikte izliyoruz.</li>
            </ol>

            <h2 className="h3 text-gold mt-5 mb-3">Hizmet Bölgelerimiz</h2>
            <p className="text-white opacity-75">
              Yenişehir, Mezitli, Toroslar ve Akdeniz merkez ilçeleri başta olmak üzere
              Tarsus, Erdemli, Silifke, Mut, Gülnar, Aydıncık ve Anamur dahil tüm Mersin&apos;e;
              ayrıca <Link href="/gunes-paneli-adana" className="text-gold">Adana ve ilçelerine</Link> hizmet
              veriyoruz.
            </p>

            <LandingCta title="Mersin'de Ücretsiz Keşif Randevusu" />

            <p className="text-white-50 small">
              Merak ettikleriniz için rehberlerimize göz atın:{" "}
              <Link href="/rehber/ev-icin-kac-panel" className="text-gold">Ev için kaç panel gerekir?</Link>{" "}
              ·{" "}
              <Link href="/rehber/cati-ges-maliyeti" className="text-gold">Çatı GES maliyeti ne kadar?</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
