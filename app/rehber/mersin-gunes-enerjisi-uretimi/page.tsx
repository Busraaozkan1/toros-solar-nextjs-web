import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../../components/LandingCta";

export const metadata: Metadata = {
  title: "Mersin'de Güneş Paneli Ne Kadar Elektrik Üretir? (Aylık Tablo)",
  description:
    "Mersin'de 5 kW güneş enerjisi sistemi ayda ve yılda ne kadar elektrik üretir? GEPA verileri ve saha tecrübemizle aylık üretim tablosu, mevsimsel farklar ve verimi etkileyen yerel faktörler.",
  alternates: { canonical: "/rehber/mersin-gunes-enerjisi-uretimi" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Mersin'de 5 kW güneş enerjisi sistemi yılda ne kadar elektrik üretir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mersin'in güneşlenme koşullarında doğru kurulmuş 5 kW bir çatı sistemi yılda yaklaşık 7.500-8.000 kWh elektrik üretir. Bu, ortalama bir hanenin yıllık tüketiminin yaklaşık iki katıdır.",
      },
    },
    {
      "@type": "Question",
      name: "Güneş panelleri katalogda yazan gücü gerçekte veriyor mu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mersin'deki kurulumlarımızda tam güneş altında ölçtüğümüz anlık üretim, panel katalog değerlerinin genellikle %95'i ve üzerindedir. Doğru yönelim ve temiz panellerle katalog değerine çok yakın üretim almak Akdeniz koşullarında mümkündür.",
      },
    },
    {
      "@type": "Question",
      name: "Mersin'de güneş enerjisi sistemi kendini kaç yılda öder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2026 fiyatlarıyla 5 kW bir sistem 120.000-180.000 TL'ye kurulur ve yılda yaklaşık 19.000-27.000 TL değerinde elektrik üretir. Statik hesapla amortisman 5-8 yıldır; elektrik zamlarıyla birlikte gerçekte 4-6 yıla iner. Sonrasında sistem 18-20 yıl boyunca neredeyse bedava elektrik üretir.",
      },
    },
    {
      "@type": "Question",
      name: "Mersin'de kışın güneş enerjisi üretimi ne kadar düşer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aralık-Ocak aylarında üretim, yaz aylarının yaklaşık yarısına iner; ancak Mersin'de kış güneşi de güçlü olduğu için üretim hiçbir ay durmaz. Yıllık üretimin yaklaşık %30'u kış yarıyılında gerçekleşir.",
      },
    },
  ],
};

const monthlyData: Array<[string, number]> = [
  ["Ocak", 430],
  ["Şubat", 470],
  ["Mart", 620],
  ["Nisan", 700],
  ["Mayıs", 815],
  ["Haziran", 855],
  ["Temmuz", 890],
  ["Ağustos", 855],
  ["Eylül", 735],
  ["Ekim", 620],
  ["Kasım", 430],
  ["Aralık", 350],
];

export default function MersinUretimPage() {
  const annual = monthlyData.reduce((sum, [, v]) => sum + v, 0);

  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="bg-dark text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">
              Mersin&apos;de Güneş Paneli Ne Kadar Elektrik Üretir?
            </h1>

            <p className="lead text-white opacity-75 mb-4">
              Bu soruya genel cevaplar çok; Mersin&apos;e özel cevaplar az. Bu yazıda
              Enerji Bakanlığı&apos;nın GEPA verilerini ve kendi kurulumlarımızdan edindiğimiz
              saha tecrübesini birleştirerek, Mersin&apos;de tipik bir ev sisteminin
              gerçekçi üretim beklentisini ay ay paylaşıyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Mersin&apos;in Güneş Potansiyeli</h2>
            <p className="text-white opacity-75">
              Enerji Bakanlığı&apos;nın Güneş Enerjisi Potansiyel Atlası&apos;na (GEPA) göre
              Türkiye ortalaması yılda 2.741 saat güneşlenme ve 1.527 kWh/m² ışınımdır.
              Mersin, Akdeniz kuşağında bu ortalamanın belirgin şekilde üzerinde,
              yaklaşık 3.000 saat güneşlenme süresine sahip illerden biridir. Pratikte bu,
              Türkiye&apos;nin büyük bölümüne kıyasla aynı sistemden her yıl %10-15 daha
              fazla elektrik almak demektir.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">5 kW Sistem İçin Aylık Üretim Tablosu</h2>
            <p className="text-white opacity-75">
              Aşağıdaki değerler, güneye bakan ve gölgesiz bir çatıda doğru eğimle kurulmuş
              <strong> 5 kW</strong> bir sistem için GEPA ışınım verileri ve saha
              gözlemlerimizle hazırlanmış <em>tahmini</em> üretim değerleridir:
            </p>

            <div className="table-responsive my-4">
              <table className="table table-dark table-bordered text-center align-middle">
                <thead>
                  <tr className="text-gold">
                    <th>Ay</th>
                    <th>Tahmini Üretim (kWh)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map(([month, value]) => (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>{value.toLocaleString("tr-TR")}</td>
                    </tr>
                  ))}
                  <tr className="fw-bold text-gold">
                    <td>Yıllık Toplam</td>
                    <td>≈ {annual.toLocaleString("tr-TR")} kWh</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-white opacity-75">
              Ortalama bir hane yılda 3.000-4.000 kWh tükettiğine göre, 5 kW bir sistem
              Mersin&apos;de çoğu evin ihtiyacının yaklaşık iki katını üretir — fazlası
              mahsuplaşma ile şebekeye satılır.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Sahadan Gözlemimiz: Katalog Değerine Ne Kadar Yaklaşılır?</h2>
            <p className="text-white opacity-75">
              Kurulumlarını yaptığımız sistemlerde, tam güneş altında ölçtüğümüz anlık üretim
              panel katalog değerlerinin genellikle <strong>%95&apos;i ve üzerindedir</strong>.
              Yani 550W bir panel, Mersin&apos;in öğle güneşinde 520W ve üzeri üretimi
              düzenli olarak görür. Bu, doğru projelendirme ve temiz panellerle katalog
              vaatlerinin bu coğrafyada gerçekçi olduğunu gösteriyor.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Amortisman: Sistem Kendini Ne Zaman Öder?</h2>
            <p className="text-white opacity-75">
              2026 itibarıyla 5 kW on-grid bir çatı sistemi, KDV ve montaj dahil yaklaşık{" "}
              <strong>120.000-180.000 TL</strong> aralığında kurulmaktadır. Ürettiğiniz her kWh,
              öz tüketimde mesken tarifesini (kademeye göre 2,59-3,89 TL), fazlasında mahsuplaşma
              bedelini karşılar — karma değerle yıllık kazanç <strong>19.000-27.000 TL</strong>{" "}
              civarındadır:
            </p>

            <div className="table-responsive my-4">
              <table className="table table-dark table-bordered text-center align-middle">
                <thead>
                  <tr className="text-gold">
                    <th>Senaryo</th>
                    <th>Sistem bedeli</th>
                    <th>Yıllık kazanç</th>
                    <th>Amortisman</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Temkinli</td><td>₺160.000</td><td>₺20.000</td><td>~8 yıl</td></tr>
                  <tr className="text-gold fw-bold"><td>Gerçekçi</td><td>₺140.000</td><td>₺23.000</td><td>~6 yıl</td></tr>
                  <tr><td>İyimser</td><td>₺120.000</td><td>₺27.000</td><td>~4,5 yıl</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-white opacity-75">
              Üstelik bu statik hesap gerçeği eksik anlatır: sistem bugünün parasıyla ödenir ama
              elektrik tarifeleri her yıl zamlanır — her zam, üretiminizin değerini artırıp geri
              dönüş süresini kısaltır. Pratikte Akdeniz bölgesinde amortisman{" "}
              <strong>4-6 yıla</strong> iner. 2026&apos;dan itibaren yıllık 4.000 kWh üzeri tüketen
              konutların destekli tarifeden çıkarılması, yüksek tüketimli evlerde bu süreyi daha da
              kısaltıyor. Amortisman sonrası, 25 yıl garantili sistemden{" "}
              <strong>18-20 yıl boyunca neredeyse bedava elektrik</strong> alırsınız.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Mersin&apos;e Özgü Verim Faktörleri</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2"><strong>Yaz sıcağı:</strong> Panel verimi sıcaklıkla düşer; Temmuz-Ağustos&apos;ta anlık verim kaybı görülür ama uzun ve açık günler toplam üretimi yine de zirvede tutar.</li>
              <li className="mb-2"><strong>Sahil nemi ve toz:</strong> Sahil hattında tuzlu nem ve bahar aylarında polen/toz birikimi üretimi %5-10 düşürebilir. Yılda 1-2 kez panel temizliği bu kaybı geri kazandırır.</li>
              <li className="mb-2"><strong>Yayla farkı:</strong> Toroslar&apos;daki yüksek rakımlı bölgelerde hava daha serin ve berrak olduğundan, kışın bile şaşırtıcı derecede güçlü üretim alınır.</li>
              <li className="mb-2"><strong>Yönelim:</strong> Tam güney ideal; doğu-batı çatılarında çift yönlü dizilim ile fark büyük ölçüde kapatılabilir.</li>
            </ul>

            <LandingCta title="Çatınızın Üretim Potansiyelini Hesaplayalım" />

            <p className="text-white-50 small">
              İlgili rehberler:{" "}
              <Link href="/rehber/ev-icin-kac-panel" className="text-gold">Ev için kaç panel gerekir?</Link> ·{" "}
              <Link href="/rehber/cati-ges-maliyeti" className="text-gold">Çatı GES maliyeti</Link> ·{" "}
              <Link href="/gunes-paneli-mersin" className="text-gold">Mersin güneş paneli kurulumu</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
