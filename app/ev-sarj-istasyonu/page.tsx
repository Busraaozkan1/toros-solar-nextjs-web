import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Evde Elektrikli Araç Şarj İstasyonu | Satış ve Kurulum",
  description:
    "Mersin ve Adana'da ev tipi elektrikli araç şarj istasyonu satışı ve anahtar teslim montajı. Evde şarj benzine göre 7-8 kat ucuz; çatı GES ile birleştirin, aracınızı çatınızdan şarj edin.",
  alternates: {
    canonical: "/ev-sarj-istasyonu",
    languages: { tr: "/ev-sarj-istasyonu", en: "/en/ev-charging-stations" },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Evde araç şarjı halka açık istasyondan ne kadar ucuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2026 tarifeleriyle evde şarj, kWh başına yaklaşık 2,6-3,9 TL iken halka açık AC istasyonlar ~9 TL, DC hızlı şarj ~11-16 TL seviyesindedir. Evde şarj halka açık istasyonlara göre 3-4 kat, benzinli araca göre 7-8 kat ucuzdur.",
      },
    },
    {
      "@type": "Question",
      name: "Şarj istasyonu kurulumu için evimde ne gerekir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hattınızın kapasitesi, uygun sigorta ve kaçak akım koruması, sağlam topraklama ve cihaz için uygun montaj yeri gerekir. Keşifte elektrik altyapınızı kontrol edip eksikleri kurulumla birlikte tamamlıyoruz.",
      },
    },
    {
      "@type": "Question",
      name: "Güneş paneliyle aracımı şarj edebilir miyim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Çatı GES kurulu bir evde gündüz üretilen elektrik öz tüketimle faturanızı düşürürken, aracınızı büyük ölçüde güneşten gelen enerjiyle şarj edebilirsiniz. Şarj istasyonu ve GES tek keşifte birlikte projelendirilebilir.",
      },
    },
    {
      "@type": "Question",
      name: "Apartmanda şarj istasyonu kurulabilir mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elektrik altyapısı uygun apartman otoparklarına kurulum yapılabilmektedir; sayaç bağlantısı ve yönetim izni gibi koşullar binaya göre değişir. Keşifte durumu yerinde değerlendiriyoruz.",
      },
    },
  ],
};

export default function EvSarjIstasyonuPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">
              Evde Elektrikli Araç Şarj İstasyonu: Satış ve Anahtar Teslim Kurulum
            </h1>

            <p className="lead text-white opacity-75 mb-4">
              Elektrikli aracınız var ama her şarj için istasyon kuyruğu mu bekliyorsunuz? Kendi
              otoparkınızda, gece uyurken dolan bir araç hem daha ucuz hem daha rahat. Toros Solar
              olarak Mersin ve Adana&apos;da <strong>ev tipi şarj istasyonlarının satışını ve anahtar
              teslim montajını</strong> yapıyoruz — cihazı bizden alıp kurulumunu da bize
              bırakabilir, dilerseniz yalnızca cihazı satın alabilirsiniz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Önce Sonuç: 100 km&apos;nin Maliyeti</h2>

            <div className="table-responsive my-4">
              <table className="table table-dark table-bordered text-center align-middle">
                <thead>
                  <tr className="text-gold">
                    <th>Şarj yöntemi</th>
                    <th>Yaklaşık maliyet (100 km)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Benzinli araç (~6,5 L/100 km)</td><td><strong>₺400+</strong></td></tr>
                  <tr><td>Halka açık DC hızlı şarj (~13 TL/kWh)</td><td>~₺220</td></tr>
                  <tr><td>Halka açık AC şarj (~9 TL/kWh)</td><td>~₺150</td></tr>
                  <tr><td><strong>Evde şarj (mesken tarifesi)</strong></td><td><strong>~₺45-65</strong></td></tr>
                  <tr className="text-gold"><td><strong>Evde şarj + çatı GES</strong></td><td><strong>Ürettiğiniz elektrikle: ~₺0</strong></td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-white-50 small">
              Ortalama 17 kWh/100 km tüketen bir araç için, Haziran 2026 tarifeleriyle hesaplanmıştır.
            </p>

            <p className="text-white opacity-75">
              Evde şarj, halka açık istasyonlara göre <strong>3-4 kat</strong>, benzinli araca göre{" "}
              <strong>7-8 kat</strong> daha ucuzdur. Çatınızda güneş enerjisi sistemi varsa,
              aracınızın &quot;yakıtını&quot; kendiniz üretirsiniz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Neden Anahtar Teslim Kurulum?</h2>
            <p className="text-white opacity-75">
              Şarj istasyonu bir priz değildir: hattınızın kapasitesi, sigorta ve kaçak akım
              koruması, topraklama ve cihazın montaj yeri keşifle belirlenmelidir. Elektrik
              altyapısında 15 yıllık tecrübemizle keşfi yapıyor, cihazı monte ediyor, devreye alıp
              test ederek teslim ediyoruz. Müstakil evler, iş yerleri ve altyapısı uygun apartman
              otoparkları için çözüm sunuyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Güneş Enerjisiyle Birlikte: Aracını Çatından Şarj Et</h2>
            <p className="text-white opacity-75">
              Şarj istasyonunu <Link href="/cati-ges" className="text-gold">çatı GES</Link> ile
              birlikte kurduğunuzda denklem değişir: aracınızı gündüz doğrudan güneş enerjisiyle
              şarj eder, evinizin elektrik faturasını da düşürürsünüz. Türkiye&apos;de yakıt
              fiyatları zamlandıkça bu kombinasyonun değeri her yıl artar. İki sistemi tek
              keşifte projelendiriyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Cihazlar</h2>
            <p className="text-white opacity-75">
              AC ev tipi şarj istasyonlarını (7,4 kW monofaze ve 22 kW trifaze seçenekleriyle, OCPP
              destekli akıllı modeller dahil) stoklarımızdan temin edebilirsiniz.{" "}
              <Link href="/urunler" className="text-gold">Ürün kataloğumuza</Link> bakın veya bize
              ulaşın; aracınıza ve elektrik altyapınıza uygun modeli birlikte seçelim.
            </p>

            <LandingCta title="Keşif ve Fiyat Teklifi İçin Ulaşın" />

            <p className="text-white-50 small">
              İlgili sayfalar:{" "}
              <Link href="/cati-ges" className="text-gold">Çatı GES sistemleri</Link> ·{" "}
              <Link href="/rehber/mersin-gunes-enerjisi-uretimi" className="text-gold">Mersin&apos;de üretim verileri</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
