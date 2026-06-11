import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Adana Güneş Paneli Kurulumu | Çatı GES ve Tarımsal Sulama",
  description:
    "Adana'da güneş paneli kurulumu: çatı GES, ev tipi güneş enerjisi ve tarımsal sulama sistemleri. Mersin merkezli, Adana ve tüm ilçelerine anahtar teslim hizmet. Ücretsiz keşif.",
  alternates: { canonical: "/gunes-paneli-adana" },
  openGraph: {
    title: "Adana Güneş Paneli Kurulumu | Toros Solar",
    description: "Adana'da anahtar teslim güneş enerjisi sistemleri. Ücretsiz keşif.",
  },
};

export default function GunesPaneliAdanaPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="bg-dark text-white">
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">Adana Güneş Paneli Kurulumu</h1>

            <p className="lead text-white opacity-75 mb-4">
              Toros Solar, Mersin&apos;deki merkezinden <strong>Adana ve tüm ilçelerine</strong> anahtar
              teslim güneş enerjisi hizmeti verir. Seyhan, Çukurova, Yüreğir, Sarıçam,
              Ceyhan, Kozan ve çevresinde çatı GES, ev tipi sistemler ve tarımsal sulama
              kurulumları yapıyoruz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Adana&apos;da Güneş Enerjisi Potansiyeli</h2>
            <p className="text-white opacity-75">
              Adana, yüksek güneşlenme süresi ve geniş tarım arazileriyle güneş enerjisi
              yatırımı için Türkiye&apos;nin en verimli bölgelerinden biridir. Çukurova&apos;nın
              tarımsal üretim yoğunluğu, özellikle <Link href="/tarimsal-sulama" className="text-gold">güneş
              enerjili sulama sistemlerini</Link> bölgede öne çıkarır: mazot ve şebeke
              maliyeti olmadan, güneşle çalışan pompalarla sulama mümkündür.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Adana&apos;da Verdiğimiz Hizmetler</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2"><Link href="/cati-ges" className="text-gold">Çatı GES kurulumu</Link> — konut ve işletmeler için öz tüketim sistemleri</li>
              <li className="mb-2">Tarımsal sulama solar sistemleri — dalgıç pompa ve sürücü kurulumu</li>
              <li className="mb-2">Off-grid ve hibrit sistemler — bağ evi ve şebekesiz araziler</li>
              <li className="mb-2"><Link href="/urunler" className="text-gold">Panel, inverter ve ekipman satışı</Link></li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Mersin Merkezli Olmak Neden Avantaj?</h2>
            <p className="text-white opacity-75">
              Merkezimiz Mersin Yenişehir&apos;de; Adana&apos;ya bir saatten kısa mesafedeyiz.
              Keşif ve servis taleplerinize aynı bölgeden, hızla yanıt veririz —
              büyük şehir firmalarının gönderdiği taşeron ekipler yerine, işin
              arkasında duran kendi montaj ekibimizle çalışırsınız.
            </p>

            <LandingCta title="Adana'da Ücretsiz Keşif Randevusu" />

            <p className="text-white-50 small">
              İlgili sayfalar:{" "}
              <Link href="/gunes-paneli-mersin" className="text-gold">Mersin güneş paneli kurulumu</Link> ·{" "}
              <Link href="/rehber/ev-icin-kac-panel" className="text-gold">Ev için kaç panel gerekir?</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
