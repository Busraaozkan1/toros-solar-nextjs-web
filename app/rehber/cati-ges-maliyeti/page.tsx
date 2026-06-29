import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../../components/LandingCta";

export const metadata: Metadata = {
  title: "Çatı GES Maliyeti Ne Kadar? Fiyatı Belirleyen 5 Faktör",
  description:
    "Çatı GES maliyeti neye göre belirlenir? Sistem boyutu, panel ve inverter kalitesi, çatı tipi ve montaj koşulları. Yatırımın geri dönüş süresi ve bütçe rehberi.",
  alternates: { canonical: "/rehber/cati-ges-maliyeti" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Çatı GES yatırımı kaç yılda kendini öder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Akdeniz bölgesinde doğru boyutlandırılmış bir çatı GES, elektrik tarifelerine ve tüketim profiline bağlı olarak genellikle 4-7 yıl arasında kendini amorti eder. Panellerin ömrü 25 yılı aştığı için sistem, ödeme süresinin ardından uzun yıllar net kazanç sağlar.",
      },
    },
    {
      "@type": "Question",
      name: "GES maliyetini en çok ne etkiler?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En büyük kalem sistem boyutudur (kW). Ardından panel ve inverter markası, çatı tipi ve montaj zorluğu, depolama (akü) eklenip eklenmeyeceği ve şebeke bağlantı işlemleri gelir.",
      },
    },
  ],
};

export default function CatiGesMaliyetiPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">Çatı GES Maliyeti Ne Kadar?</h1>

            <p className="lead text-white opacity-75 mb-4">
              &quot;Çatı GES kaç paraya mal olur?&quot; sorusunun dürüst cevabı: sisteme göre
              değişir. Ancak fiyatı neyin belirlediğini bilirseniz, aldığınız teklifleri
              doğru karşılaştırabilirsiniz. İşte maliyeti oluşturan 5 ana faktör.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">1. Sistem Boyutu (kW)</h2>
            <p className="text-white opacity-75">
              En belirleyici kalem. Aylık tüketiminiz sistemin kaç kW olacağını, o da
              panel sayısını ve inverter kapasitesini belirler. Tipik bir ev sistemi
              3-10 kW aralığındadır. Boyutu doğru hesaplamak için{" "}
              <Link href="/rehber/ev-icin-kac-panel" className="text-gold">kaç panel gerekir rehberimize</Link> bakın.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">2. Panel ve İnverter Kalitesi</h2>
            <p className="text-white opacity-75">
              A sınıfı, yüksek verimli paneller ve tanınmış marka inverterler daha pahalıdır
              ama 25 yıllık sistem ömründe daha fazla üretim ve daha az arıza demektir.
              Ucuz ekipmanla kurulan sistemin &quot;tasarrufu&quot;, düşük üretim ve erken
              arızalarla geri ödenir — en pahalı sistem, iki kez kurulan sistemdir.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">3. Çatı Tipi ve Montaj Koşulları</h2>
            <p className="text-white opacity-75">
              Kiremit çatı, sandviç panel, trapez sac veya düz beton — her birinin
              konstrüksiyon malzemesi ve işçiliği farklıdır. Çatının yüksekliği, eğimi
              ve erişim zorluğu da montaj maliyetini etkiler.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">4. Depolama (Akü) Tercihi</h2>
            <p className="text-white opacity-75">
              Şebeke bağlantılı sistemlerde akü zorunlu değildir; mahsuplaşma sayesinde
              şebeke sizin &quot;bataryanız&quot; olur. Kesintisiz enerji isteyenler için
              eklenen lityum akü paketleri toplam maliyeti belirgin şekilde artırır.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">5. İzinler ve Bağlantı Süreci</h2>
            <p className="text-white opacity-75">
              Şebeke bağlantılı sistemlerde dağıtım şirketi başvurusu, proje onayı ve sayaç
              değişimi gibi resmi adımlar gerekir; bunların da bir maliyeti ve süresi vardır.
              Bu işlemlerin kapsamı firmadan firmaya değişir — teklif alırken hangi kalemlerin
              fiyata dahil olduğunu net olarak sorun.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Peki Yatırım Ne Zaman Geri Döner?</h2>
            <p className="text-white opacity-75">
              Mersin-Adana bölgesinin yüksek güneşlenmesiyle, doğru boyutlandırılmış bir
              çatı GES genellikle <strong>4-7 yılda</strong> kendini öder. Sonrasındaki 18+ yıl boyunca
              ürettiğiniz her kWh net kazançtır. Elektrik zamlandıkça geri dönüş süresi kısalır.
            </p>

            <LandingCta title="Çatınıza Özel Net Fiyat Alın" />

            <p className="text-white-50 small">
              İlgili sayfalar:{" "}
              <Link href="/cati-ges" className="text-gold">Çatı GES kurulum hizmetimiz</Link> ·{" "}
              <Link href="/gunes-paneli-mersin" className="text-gold">Mersin güneş paneli kurulumu</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
