import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Çatı GES Kurulumu | Evler ve İşletmeler İçin Güneş Santrali",
  description:
    "Anahtar teslim çatı GES: projelendirme, izinler, montaj ve şebeke bağlantısı tek elden. Elektrik faturanızı düşürün, fazla üretimi satın. Mersin ve Adana'da ücretsiz keşif.",
  alternates: { canonical: "/cati-ges" },
  openGraph: {
    title: "Çatı GES Kurulumu | Toros Solar",
    description: "Evler ve işletmeler için anahtar teslim çatı güneş enerjisi santrali.",
  },
};

export default function CatiGesPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="text-white">
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">Çatı GES: Kendi Elektriğinizi Üretin</h1>

            <p className="lead text-white opacity-75 mb-4">
              Çatı tipi Güneş Enerjisi Santrali (GES), evinizin veya işletmenizin çatısını
              gelir üreten bir varlığa dönüştürür. Ürettiğiniz elektriği kendiniz kullanır,
              fazlasını aylık mahsuplaşma ile şebekeye satarsınız.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Çatı GES&apos;in Avantajları</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2"><strong>Fatura tasarrufu:</strong> Doğru boyutlandırılmış sistem elektrik faturanızı sıfıra yaklaştırır.</li>
              <li className="mb-2"><strong>Mahsuplaşma geliri:</strong> Kullanmadığınız üretim şebekeye satılır, faturanızdan düşülür.</li>
              <li className="mb-2"><strong>Lisans gerektirmez:</strong> Öz tüketim amaçlı çatı sistemleri üretim lisansından muaftır.</li>
              <li className="mb-2"><strong>Hızlı geri dönüş:</strong> Akdeniz bölgesinde yatırım genellikle 4-7 yılda kendini öder; sistem ömrü 25+ yıldır.</li>
              <li className="mb-2"><strong>Değer artışı:</strong> GES kurulu bir bina, satışta ve kiralamada öne çıkar.</li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Hangi Çatılar Uygun?</h2>
            <p className="text-white opacity-75">
              Kiremit, sandviç panel, trapez sac ve düz beton çatıların tamamına kurulum
              yapılabilir. Güneye bakan eğimli çatılar idealdir; doğu-batı yönelimli
              çatılarda da çift yönlü dizilimle yüksek verim alınır. Keşifte çatınızın
              taşıma kapasitesini, gölgelenme durumunu ve yönelimini ücretsiz analiz ediyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Anahtar Teslim Sürecimiz</h2>
            <p className="text-white opacity-75">
              Keşif ve tüketim analizi → sistem tasarımı ve net fiyat teklifi → dağıtım
              şirketi başvurusu ve izinler → montaj (1-3 gün) → devreye alma ve mahsuplaşma
              sözleşmesi. Tüm adımları Toros Solar yürütür; siz yalnızca üretimi izlersiniz.
            </p>

            <LandingCta title="Çatınız İçin Ücretsiz Keşif" />

            <p className="text-white-50 small">
              İlgili sayfalar:{" "}
              <Link href="/gunes-paneli-mersin" className="text-gold">Mersin güneş paneli kurulumu</Link> ·{" "}
              <Link href="/rehber/cati-ges-maliyeti" className="text-gold">Çatı GES maliyeti rehberi</Link> ·{" "}
              <Link href="/urunler" className="text-gold">Panel ve inverter ürünlerimiz</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
