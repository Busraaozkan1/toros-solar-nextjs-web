"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import BundleDeals from './BundleDeals';
import SolarWizard from './SolarWizard';

// ASP.NET'teki Product Modelinin Next.js karşılığı
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  priceText?: string | null;
  imageUrl: string | null;
  category?: string | null;
}

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
}

function pickSeededItems<T>(items: T[], count: number, seed: number) {
  if (items.length <= count) {
    return [...items];
  }

  let randomSeed = seed || 1;
  const seededRandom = () => {
    randomSeed = (randomSeed * 1664525 + 1013904223) % 4294967296;
    return randomSeed / 4294967296;
  };

  return [...items].sort(() => seededRandom() - 0.5).slice(0, count);
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function extractDescriptionItems(description?: string | null) {
  if (!description) {
    return [];
  }

  return description
    .split(/\r?\n|•|\u2022/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export default function HomeClient({
  initialProducts,
  initialProjects,
}: {
  initialProducts: Product[];
  initialProjects: Project[];
}) {
  const allProducts = initialProducts;
  const allProjects = initialProjects;
  const [productSeed, setProductSeed] = useState(1);
  const [projectSeed, setProjectSeed] = useState(7);
  const isDay = useMemo(() => {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19;
  }, []);

  const featuredProducts = useMemo(() => {
    return pickSeededItems(allProducts, 4, productSeed);
  }, [allProducts, productSeed]);

  const featuredProjects = useMemo(() => {
    return pickSeededItems(allProjects, 4, projectSeed);
  }, [allProjects, projectSeed]);

  // Bir urun modali acikken carousel donmesin: modal acikken kart degisirse
  // Bootstrap backdrop sahipsiz kaliyor ve sayfa kilitleniyordu.
  const isModalOpenRef = React.useRef(false);

  useEffect(() => {
    const onShow = () => {
      isModalOpenRef.current = true;
    };
    const onHidden = () => {
      isModalOpenRef.current = document.querySelector(".modal.show") !== null;
    };

    document.addEventListener("show.bs.modal", onShow);
    document.addEventListener("hidden.bs.modal", onHidden);

    return () => {
      document.removeEventListener("show.bs.modal", onShow);
      document.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProductSeed((prev) => (isModalOpenRef.current ? prev : prev + 1));
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProjectSeed((prev) => (isModalOpenRef.current ? prev : prev + 1));
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section id="anasayfa" className="hero-section d-flex align-items-center"
        style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

        <div id="videoContainer"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: 'black' }}>

          {isDay !== null && (
            <video autoPlay muted loop playsInline
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={isDay ? "/videos/gunduz.mp4" : "/videos/gece.mp4"} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="container text-center" style={{ zIndex: 1 }}>
          <h6 className="text-uppercase text-gold mb-3" style={{ letterSpacing: '5px', fontWeight: 700 }}></h6>
          <h1 className="display-2 fw-bold mb-4 text-white">
            Sınırsız Enerji, <br /> <span className="text-gold">Sürdürülebilir Gelecek</span>
          </h1>
          <p className="lead mb-5 text-white fw-medium"
            style={{ maxWidth: '700px', margin: '0 auto', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            En verimli güneş paneli çözümleriyle tanışın. Doğayı korurken enerji maliyetlerinizi modern teknolojiyle sıfıra indirin.
          </p>
          <div className="hero-btns">
            <a href="#urunlerimiz" className="btn btn-gold px-5 py-3 me-3">Ürünleri Keşfet</a>
            <a href="#iletisim" className="btn btn-outline-light px-5 py-3">Bize Ulaşın</a>
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA SECTION */}
      <section id="hakkimizda" className="section-padding bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="image-wrapper about-image-wrapper position-relative">
                <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072"
                  className="img-fluid rounded-3 shadow-lg border-gold-thin" alt="Premium Toros Solar" />
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5 text-start">
              <h6 className="text-gold text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>Biz Kimiz?</h6>
              <h2 className="display-5 fw-bold mb-4 text-white">Toros Solar olarak sizi <br /> Güneşin Gücüyle Buluşturuyoruz</h2>
              <p className="text-gold lead mb-4">
                Toros Solar sürdürülebilir enerji dönüşümünde öncü rol oynamak için kuruldu.
                Sadece panel kurmuyoruz, uygun depolama çözümleri ve rüzgar tribünü seçenekleri de sunuyoruz.
                Yenilenebilir enerjide geleceği inşa ediyoruz.
              </p>
              <div className="about-features">
                <div className="about-feature-row d-flex align-items-center mb-4">
                  <div className="feature-icon-sm me-3">
                    <i className="bi bi-patch-check text-gold fs-3"></i>
                  </div>
                  <span className="text-white fw-light fs-5">Sektörde 15 Yıllık Tecrübesi</span>
                </div>
                <div className="about-feature-row d-flex align-items-center mb-4">
                  <div className="feature-icon-sm me-3">
                    <i className="bi bi-shield-check text-gold fs-3"></i>
                  </div>
                  <span className="text-white fw-light fs-5">Yüksek Verimli Panel Garantisi</span>
                </div>
                <div className="about-feature-row d-flex align-items-center mb-4">
                  <div className="feature-icon-sm me-3">
                    <i className="bi bi-headset text-gold fs-3"></i>
                  </div>
                  <span className="text-white fw-light fs-5">7/24 Teknik Destek ve İzleme Hizmeti</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HİZMETLERİMİZ SECTION */}
      <section id="hizmetlerimiz" className="section-padding bg-darker">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-white text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>
              Neler Yapıyoruz?
            </h6>
            <h2 className="section-title text-white headline-hover-fx">Hizmetlerimiz</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card text-center">
                <div className="service-icon"><i className="bi bi-house-gear"></i></div>
                <h4 className="text-black">Güneş Enerjisi Sistemleri</h4>
                <p className="text-gray">Geleceğin teknolojisini bugünle buluşturuyoruz. Enerji bağımsızlığınızı modern çözümlerle tasarlıyoruz.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card active text-center">
                <div className="service-icon"><i className="bi bi-factory"></i></div>
                <h4 className="text-black">Solar Elektrik Üretimi</h4>
                <p className="text-gray">Kendi enerjinizi üretmenin en prestijli yolu. Süreci kesintisiz ve kârlı bir yatırıma dönüştürüyoruz.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card text-center">
                <div className="service-icon"><i className="bi bi-battery-charging"></i></div>
                <h4 className="text-black">Güneş Paneli Kurulumu</h4>
                <p className="text-gray">Mühendislik disipliniyle kusursuz uygulama. Her projeye özel yüksek performans garantisi sunuyoruz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAKET FIRSATLARI */}
      <BundleDeals />

      {/* SOLAR İHTİYAÇ SİHİRBAZI */}
      <SolarWizard products={allProducts} />

      {/* ÜRÜNLERİMİZ SECTION */}
      <section id="urunlerimiz" className="section-padding bg-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-gold text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>Teknolojimiz</h6>
            <h2 className="section-title text-white headline-hover-fx">Öne Çıkan Ürünler</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {featuredProducts.map((item) => (
              <div key={item.id} className="col-xl-3 col-md-6">
                <div className="product-card position-relative">
                  <div className="product-img-container">
                    {item.imageUrl && item.imageUrl.trim() ? (
                      <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center text-secondary" style={{ width: '100%', height: '250px', background: 'rgba(255,255,255,0.04)' }}>
                        Gorsel yok
                      </div>
                    )}
                  </div>
                  <div className="product-info p-4">
                    <h5 className="fw-bold" style={{ color: '#1f2937', letterSpacing: '0.3px', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{item.name}</h5>
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary border-opacity-25">
                      <span className="text-gold fw-bold fs-5">{item.priceText || item.price.toLocaleString('tr-TR')}</span>
                      <button className="btn btn-link text-gold text-decoration-none p-0" data-bs-toggle="modal" data-bs-target={`#modal-${item.id}`}>
                        Detaylar <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Yapısı */}
                <div className="modal fade" id={`modal-${item.id}`} tabIndex={-1} aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div
                      className="modal-content text-white border-gold-thin"
                      style={{ background: 'linear-gradient(165deg, rgba(15,23,42,0.98), rgba(17,24,39,0.96))' }}
                    >
                      <div className="modal-header border-secondary border-opacity-50">
                        <h5 className="modal-title">{item.name}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                      </div>
                      <div className="modal-body p-4 text-start">
                        <div className="text-center mb-4 p-3 rounded shadow-sm" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          {item.imageUrl && item.imageUrl.trim() ? (
                            <img src={item.imageUrl} className="img-fluid" style={{ maxHeight: '250px', objectFit: 'contain' }} alt={item.name} />
                          ) : (
                            <div className="text-secondary py-5">Gorsel bulunamadi</div>
                          )}
                        </div>
                        {(() => {
                          const technicalItems = extractDescriptionItems(item.description);

                          if (technicalItems.length === 0) {
                            return null;
                          }

                          return (
                            <div className="mb-4">
                              <h6 className="text-gold mb-3 fw-bold">Teknik Ozellikler</h6>
                              <ul className="list-unstyled mb-0">
                                {technicalItems.map((feature, index) => (
                                  <li key={`${item.id}-feature-${index}`} className="d-flex align-items-start mb-2 text-secondary" style={{ color: '#b9c3d1' }}>
                                    <i className="bi bi-check2-circle text-gold me-2 mt-1"></i>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })()}
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-gray small">Birim Fiyat</span>
                          <h3 className="text-gold mb-0">{item.priceText || item.price.toLocaleString('tr-TR')}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href="/urunler" className="btn btn-outline-light px-5 py-3">
              Tüm Ürünlerimizi Gör <i className="bi bi-grid-3x3-gap ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* PROJELERİMİZ SECTION */}
      <section
        id="projelerimiz"
        className="section-padding bg-darker"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #2f3a4c 0%, #41536b 58%, #556d8a 100%)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 14% 20%, rgba(255,255,255,0.11), transparent 30%), radial-gradient(circle at 86% 80%, rgba(255,210,140,0.1), transparent 34%)',
            pointerEvents: 'none'
          }}
        ></div>
        <div className="container position-relative">
          <div className="text-center mb-5">
            <h6 className="text-uppercase fw-bold" style={{ letterSpacing: '2px', color: '#ffffff' }}>Seçkin Referanslar</h6>
            <h2 className="section-title text-white headline-hover-fx">Projelerimiz</h2>
            <p className="mx-auto mt-3" style={{ maxWidth: '720px', color: 'rgba(255,255,255,0.72)' }}>
              Farklı sektörlerde tamamladığımız premium uygulamalardan seçilen projelerimiz burada yer alıyor.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {featuredProjects.map((item) => (
              <div key={item.id} className="col-xl-3 col-md-6">
                <div
                  className="project-showcase-card h-100 position-relative shadow-lg"
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid rgba(148,163,184,0.26)',
                    background: 'linear-gradient(165deg, rgba(30,41,59,0.92) 0%, rgba(15,23,42,0.97) 60%, rgba(2,6,23,0.98) 100%)',
                    backdropFilter: 'blur(8px)',
                    transition: 'transform 320ms ease, box-shadow 320ms ease, border-color 320ms ease'
                  }}
                >
                  <div style={{ height: '240px', background: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,41,59,0.76))' }}>
                    {item.imageUrl && item.imageUrl.trim() ? (
                      <img src={item.imageUrl} alt={item.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-secondary">Gorsel yok</div>
                    )}
                  </div>

                  <div className="p-4 text-start">
                    <h4 className="text-white fw-bold mb-3" style={{ minHeight: '64px', lineHeight: 1.25, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{item.name}</h4>
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, minHeight: '120px', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                      {truncateText(item.description, 145)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href="/projelerimiz" className="btn btn-gold px-5 py-3 shadow-sm">
              Tüm Projelerimizi Gör <i className="bi bi-arrow-up-right-circle ms-2"></i>
            </Link>
          </div>

          <div className="d-flex justify-content-center mt-5 pt-3">
            <div
              style={{
                width: 'min(180px, 42vw)',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(212,175,55,0.95), rgba(255,255,255,0))',
                boxShadow: '0 0 24px rgba(212,175,55,0.25)'
              }}
            ></div>
          </div>
        </div>

        <style jsx>{`
          .project-showcase-card:hover {
            transform: translateY(-10px) scale(1.015);
            border-color: rgba(251, 191, 36, 0.55);
            box-shadow: 0 28px 48px rgba(2, 6, 23, 0.48), 0 0 0 1px rgba(251, 191, 36, 0.24);
          }
        `}</style>
      </section>

      {/* İLETİŞİM SECTION */}
      <section
        id="iletisim"
        className="section-padding bg-darker"
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #f08a3a 0%, #eb7b2f 28%, #e86f25 100%)'
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="text-white text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>Bize Ulaşın</h6>
            <h2 className="section-title text-white headline-hover-fx">İletişim & Konum</h2>
          </div>
          <div className="row g-5">
            <div className="col-lg-5 text-start">
              <div className="contact-card p-4 border-gold-thin bg-dark h-100">
                <p className="lead text-gold mb-5">
                  Enerji maliyetlerinizi düşürmek ve size özel projelerimizi öğrenmek için bizimle iletişime geçin.
                </p>
                <div className="contact-info-item mb-4">
                  <h5 className="text-gold mb-2"><i className="bi bi-geo-alt me-2"></i>Konum</h5>
                  <p className="text-white opacity-75">Cumhuriyet mah. 1653 Sokak No.3 <br /> Yenişehir / MERSİN</p>
                </div>
                <div className="contact-info-item mb-4">
                  <h5 className="text-gold mb-2"><i className="bi bi-whatsapp me-2"></i>WhatsApp</h5>
                  <a href="https://wa.me/905367333678" target="_blank" className="text-white text-decoration-none fs-5 fw-bold">+90 536 733 36 78</a>
                </div>
                <div className="contact-info-item">
                  <h5 className="text-gold mb-2"><i className="bi bi-envelope me-2"></i>E-Posta</h5>
                  <a href="mailto:info@torossolar.com" className="text-white text-decoration-none fs-5">info@torossolar.com</a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="map-container shadow-lg border-gold-thin" style={{ borderRadius: '15px', overflow: 'hidden', height: '450px' }}>
                <iframe
                  src="https://www.google.com/maps?q=Cumhuriyet+mah.+1653+Sokak+No.3+Yenişehir+MERSİN&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}