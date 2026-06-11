import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCta from "../components/LandingCta";

export const metadata: Metadata = {
  title: "Güneş Enerjili Tarımsal Sulama Sistemleri",
  description:
    "Şebekenin ulaşmadığı arazilerde güneş enerjili tarımsal sulama: solar dalgıç pompa sistemleri, projelendirme ve kurulum. Mersin, Adana ve çevresinde ücretsiz keşif.",
  alternates: { canonical: "/tarimsal-sulama" },
  openGraph: {
    title: "Güneş Enerjili Tarımsal Sulama | Toros Solar",
    description: "Mazot ve elektrik maliyetine son: güneş enerjili sulama sistemleri.",
  },
};

export default function TarimsalSulamaPage() {
  return (
    <main style={{ paddingTop: "100px", minHeight: "80vh" }} className="bg-dark text-white">
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-5 fw-bold mb-4 text-gold">Güneş Enerjili Tarımsal Sulama Sistemleri</h1>

            <p className="lead text-white opacity-75 mb-4">
              Tarlanıza elektrik hattı çekmenin maliyeti ve mazotlu pompaların yakıt gideri,
              sulama sezonunda en büyük kalemlerden biridir. Güneş enerjili sulama sistemleri
              bu giderleri ortadan kaldırır: güneş varken pompanız çalışır, yakıt ve fatura derdi olmaz.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Sistem Nasıl Çalışır?</h2>
            <p className="text-white opacity-75">
              Araziye kurulan güneş panelleri, bir solar pompa sürücüsü üzerinden dalgıç veya
              yüzey pompanızı doğrudan besler. Akü gerektirmez; güneşin olduğu her saat su
              basar. Mevcut pompanız uygunsa sürücüyle entegre edilir, değilse ihtiyacınıza
              uygun pompa ile birlikte komple sistem kurarız. Damla sulama ve yağmurlama
              sistemleriyle tam uyumludur.
            </p>

            <h2 className="h3 text-gold mt-5 mb-3">Kimler İçin Uygun?</h2>
            <ul className="text-white opacity-75">
              <li className="mb-2">Şebeke elektriğinin olmadığı veya trafo maliyetinin yüksek olduğu araziler</li>
              <li className="mb-2">Mazotlu pompayla sulama yapan ve yakıt giderinden kurtulmak isteyen üreticiler</li>
              <li className="mb-2">Narenciye, sera, bağ-bahçe ve tarla tarımı yapan tüm işletmeler</li>
              <li className="mb-2">Kuyu derinliği 30-300 metre arası olan dalgıç pompa kullanıcıları</li>
            </ul>

            <h2 className="h3 text-gold mt-5 mb-3">Neden Toros Solar?</h2>
            <p className="text-white opacity-75">
              Mersin ve Adana&apos;nın tarım bölgelerini, kuyu yapılarını ve sulama düzenlerini
              yakından tanıyoruz. Keşifte kuyu verimini, günlük su ihtiyacınızı ve arazi
              koşullarını analiz ederek pompa-panel uyumunu doğru kuruyoruz — sistemin
              gücü ihtiyacınızdan ne eksik ne fazla olur, yatırımınız boşa gitmez.
            </p>

            <LandingCta title="Arazinize Özel Sulama Çözümü" />

            <p className="text-white-50 small">
              İlgili sayfalar:{" "}
              <Link href="/gunes-paneli-mersin" className="text-gold">Mersin güneş paneli</Link> ·{" "}
              <Link href="/gunes-paneli-adana" className="text-gold">Adana güneş paneli</Link> ·{" "}
              <Link href="/urunler" className="text-gold">Ürünlerimiz</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
