import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Hakkımızda | Toros Solar — Mersin Güneş Enerjisi Firması",
  description:
    "Toros Solar; Mersin ve Adana'da çatı GES, tarımsal sulama, off-grid ve EV şarj çözümleri sunan güneş enerjisi firması. 15 yıllık tecrübe, anahtar teslim kurulum, ücretsiz keşif.",
  alternates: { canonical: "/hakkimizda" },
  openGraph: {
    title: "Hakkımızda | Toros Solar",
    description:
      "Mersin merkezli güneş enerjisi firması. 15 yıllık tecrübe, anahtar teslim kurulum, ücretsiz keşif.",
  },
};

export default function HakkimizdaPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="text-white">
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h6 className="text-gold text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>Biz Kimiz?</h6>
            <h1 className="display-5 fw-bold mb-4 text-gold">Güneşin Gücüyle Buluşturuyoruz</h1>

            <p className="lead text-white opacity-75 mb-4">
              Toros Solar, sürdürülebilir enerji dönüşümünde öncü rol oynamak için kuruldu.
              Mersin merkezli bir güneş enerjisi firması olarak konutlara, işletmelere ve
              tarım arazilerine anahtar teslim çözümler sunuyoruz.
            </p>

            <p className="text-white opacity-75 mb-4">
              Sadece panel kurmuyoruz: ihtiyacınıza göre depolama (akü) çözümleri ve proje
              bazlı rüzgar türbini seçenekleriyle, evinizin ya da işletmenizin enerji
              bağımsızlığını baştan sona tasarlıyoruz. Keşiften projelendirmeye ve montaja
              kadar kurulum sürecini tek elden yürütürüz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Ne Yapıyoruz?</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2"><Link href="/cati-ges" className="text-gold">Çatı GES sistemleri</Link> — ev ve işletmeler için şebeke bağlantılı kurulum</li>
              <li className="mb-2"><Link href="/tarimsal-sulama" className="text-gold">Tarımsal sulama sistemleri</Link> — güneş enerjili pompa çözümleri</li>
              <li className="mb-2"><Link href="/paketler" className="text-gold">Off-grid ve hazır paketler</Link> — konteyner ev, yayla ve bağ evi için şebekeden bağımsız sistemler</li>
              <li className="mb-2"><Link href="/ev-sarj-istasyonu" className="text-gold">EV şarj istasyonu</Link> — ev ve işletmeler için elektrikli araç şarjı</li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Neden Toros Solar?</h2>
            <div className="row g-3 mt-1">
              <div className="col-md-4">
                <div className="h-100 p-3 bg-dark border-gold-thin rounded-3 text-center">
                  <i className="bi bi-patch-check text-gold fs-2"></i>
                  <p className="mb-0 mt-2 text-white">Sektörde 15 yıllık tecrübe</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="h-100 p-3 bg-dark border-gold-thin rounded-3 text-center">
                  <i className="bi bi-shield-check text-gold fs-2"></i>
                  <p className="mb-0 mt-2 text-white">Yüksek verimli panel garantisi</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="h-100 p-3 bg-dark border-gold-thin rounded-3 text-center">
                  <i className="bi bi-headset text-gold fs-2"></i>
                  <p className="mb-0 mt-2 text-white">7/24 teknik destek ve izleme</p>
                </div>
              </div>
            </div>

            <h2 className="h3 text-gold mt-5 mb-3">Hizmet Bölgemiz</h2>
            <p className="text-white opacity-75">
              Mersin ve tüm ilçeleri ile <Link href="/gunes-paneli-adana" className="text-gold">Adana</Link> ve
              çevresinde yerinde keşif, kurulum ve servis veriyoruz. Tamamladığımız işleri{" "}
              <Link href="/projelerimiz" className="text-gold">Projelerimiz</Link> sayfasından inceleyebilirsiniz.
            </p>

            <LandingCta title="Ücretsiz Keşif ve Fiyat Teklifi" />

            <hr className="border-secondary border-opacity-25 mt-5" />
            <p className="text-white-50 small text-center mb-0" style={{ opacity: 0.7 }}>
              Tasarım ve geliştirme: Büşra Özkan —{" "}
              <a
                href="https://www.thecodely.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff7a00", textDecoration: "none" }}
              >
                codely
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
