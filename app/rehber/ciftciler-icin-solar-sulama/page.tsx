import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../../components/LandingCta";

export const metadata: Metadata = {
  title: "Çiftçiler İçin Güneş Enerjili Sulama Pompası: Mazot Masrafına Son",
  description:
    "Solar sulama pompası mazotlu pompaya göre ne kazandırır? Sezonluk mazot hesabı, sistem çalışma mantığı, mevcut pompaya solar dönüşüm ve boyutlandırma rehberi. Mersin-Adana sahası için.",
  alternates: { canonical: "/rehber/ciftciler-icin-solar-sulama" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Solar sulama sistemi mazotlu pompaya göre ne kadar tasarruf sağlar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saatte ~2 litre yakan bir dizel pompa, günde 8 saat ve sezonda 150 gün çalıştığında yaklaşık 2.400 litre mazot tüketir; 2026 fiyatlarıyla bu sezon başına 150.000 TL'yi aşan bir giderdir. Güneş enerjili sistem kurulumdan sonra yakıtsız çalışır ve birçok arazide kendini 1-2 sulama sezonunda amorti eder.",
      },
    },
    {
      "@type": "Question",
      name: "Mevcut dalgıç pompam solar sisteme bağlanabilir mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Çoğu durumda evet. Elektrikli dalgıç pompanız varsa, pompa değiştirilmeden yalnızca güneş panelleri ve uygun bir solar pompa sürücüsü eklenerek sistem solara dönüştürülebilir. Monofaze ve trifaze pompalar için ayrı sürücü modelleri mevcuttur.",
      },
    },
    {
      "@type": "Question",
      name: "Güneş enerjili sulama pompası için akü gerekir mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Güneş varken pompa çalışır; su deponuz veya havuzunuz enerji deposu görevi görür. Flatör ile depo dolunca pompa otomatik durur. Akü olmaması hem maliyeti hem bakım ihtiyacını azaltır.",
      },
    },
    {
      "@type": "Question",
      name: "Kaç metre derinlikteki kuyudan su basılabilir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bölgemizde 30 metreden 300 metreye kadar dinamik seviyeli kuyulara solar dalgıç pompa çözümleri kuruyoruz. Belirleyici olan kuyunun dinamik su seviyesi ve günlük su ihtiyacınızdır.",
      },
    },
  ],
};

export default function SolarSulamaRehberPage() {
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
              Çiftçiler İçin Güneş Enerjili Sulama Pompası: Mazot Masrafına Son
            </h1>

            <p className="lead text-white opacity-75 mb-4">
              Çukurova&apos;da ve Mersin&apos;in sulu tarım yapılan her ilçesinde aynı hesap dönüyor:
              sulama sezonu açıldığında mazot bidonları para yutuyor, şebeke elektriği ise tarlaya
              hiç gelmiyor ya da trafo masrafı servet istiyor. Güneş enerjili sulama bu denklemi
              kökten değiştiriyor. Bu rehberde, sahada kurduğumuz sistemlerden edindiğimiz
              tecrübeyle gerçek rakamları paylaşıyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Önce Sonuç: Mazot Hesabı</h2>
            <p className="text-white opacity-75">
              Haziran 2026 itibarıyla motorin litresi yaklaşık <strong>66 TL</strong>. Orta ölçekli
              bir bahçeyi sulayan tipik bir dizel pompa düzeneği için sezon hesabı şöyle işliyor:
            </p>

            <div className="table-responsive my-4">
              <table className="table table-dark table-bordered text-center align-middle">
                <tbody>
                  <tr><td>Saatlik yakıt tüketimi</td><td>~2 litre</td></tr>
                  <tr><td>Günlük çalışma</td><td>8 saat</td></tr>
                  <tr><td>Sulama sezonu</td><td>~150 gün</td></tr>
                  <tr><td>Sezonluk yakıt</td><td>~2.400 litre</td></tr>
                  <tr className="fw-bold text-gold"><td>Sezonluk mazot gideri</td><td>~158.000 TL</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-white opacity-75">
              Buna pompa bakımı, yağ değişimi ve tarlaya bidon taşıma derdi dahil değil. Aynı suyu
              basan güneş enerjili bir sistem, kurulumdan sonra <strong>yakıt gideri sıfır</strong> çalışır.
              Yani birçok arazide sistem, kendini <strong>bir ila iki sulama sezonunda</strong> amorti
              eder — ve panellerin ömrü 25 yıldır.
            </p>
            <p className="text-white-50 small">
              Tüketim değerleri pompanıza ve arazinize göre değişir; kendi bahçeniz için net hesabı
              keşifte birlikte çıkarırız.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Sistem Nasıl Çalışır?</h2>
            <p className="text-white opacity-75">
              Araziye kurulan paneller, bir <strong>solar pompa sürücüsü</strong> üzerinden dalgıç
              veya yüzey pompanızı doğrudan besler. Akü gerekmez: güneş varken pompa çalışır, su
              deponuz ya da havuzunuz &quot;enerji deponuz&quot; olur. Sabah erken ve akşamüstü daha
              yavaş, öğlen tam kapasite su basar — damla sulama ve yağmurlama ile tam uyumludur.
              Flatör (şamandıra) ile depo dolunca pompa kendini durdurur; kuru çalışma koruması
              kuyuyu ve pompayı korur.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Mevcut Pompanız Varsa Daha da Ucuz</h2>
            <p className="text-white opacity-75">
              Bilinmeyen önemli bir nokta: elektrikli dalgıç pompanız zaten varsa, çoğu durumda
              pompayı değiştirmeden <strong>yalnızca panel + sürücü</strong> eklenerek sistem solara
              çevrilebilir. Monofaze ve trifaze pompalar için ayrı sürücü modelleri mevcut. Bu, ilk
              yatırımı ciddi şekilde düşürür. Keşifte pompanızın etiketine bakıp uyumu yerinde
              söylüyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Boyutlandırma: Neye Göre Belirlenir?</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2"><strong>Kuyu derinliği (dinamik seviye):</strong> Suyun pompalanacağı gerçek yükseklik — sistemin kalbi bu rakamdır. Bölgemizde 30-300 metre arası kuyulara çözüm kuruyoruz.</li>
              <li className="mb-2"><strong>Günlük su ihtiyacı:</strong> Ürüne ve dönüme bağlı. Örneğin damla sulamalı narenciyede sıcak dönemde dönüm başına günde kabaca 4-6 m³ su hesaplanır.</li>
              <li className="mb-2"><strong>Panel gücü:</strong> Pompanın motor gücünün yaklaşık 1,2-1,5 katı panel kurulur; böylece öğlen dışındaki saatlerde de pompa verimli çalışır.</li>
              <li className="mb-2"><strong>Ekipman kalitesi:</strong> Pirinç çıkışlı, paslanmaz çelik milli, kaliteli rulmanlı pompalar ile ekonomik modeller arasında ömür farkı büyüktür. İkisini de sunuyoruz; farkı keşifte açıkça anlatıyoruz.</li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Kimler İçin Mantıklı?</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2">Şebeke elektriği olmayan veya <strong>trafo/hat maliyeti yüz binlerce lira tutan</strong> araziler</li>
              <li className="mb-2">Sezonluk mazot gideri 50.000 TL&apos;yi aşan her bahçe ve tarla</li>
              <li className="mb-2">Narenciye, sera, bağ-bahçe ve tarla tarımı yapan, sulama suyu kuyudan çeken üreticiler</li>
              <li className="mb-2">Elektrik faturasındaki tarımsal sulama aboneliği zamlarından yorulanlar</li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Mersin ve Adana&apos;da Saha Tecrübemiz</h2>
            <p className="text-white opacity-75">
              Toroslar&apos;ın eteğinden Çukurova&apos;nın düzlüğüne kadar kuyu yapıları, su seviyeleri
              ve sulama düzenleri ilçeden ilçeye değişiyor. Keşifte kuyu verimini, günlük su
              ihtiyacınızı ve arazi koşullarını yerinde analiz ediyoruz — sistem ne eksik ne fazla
              kurulur, yatırımınız boşa gitmez.
            </p>

            <LandingCta title="Tarlanız İçin Mazot Hesabını Birlikte Çıkaralım" />

            <p className="text-white-50 small">
              İlgili sayfalar:{" "}
              <Link href="/tarimsal-sulama" className="text-gold">Tarımsal sulama sistemleri</Link> ·{" "}
              <Link href="/rehber/mersin-gunes-enerjisi-uretimi" className="text-gold">Mersin&apos;de üretim verileri</Link> ·{" "}
              <Link href="/urunler" className="text-gold">Ürünlerimiz</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
