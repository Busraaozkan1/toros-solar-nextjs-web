"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TR_TO_EN: Record<string, string> = {
  "/": "/en",
  "/gunes-paneli-mersin": "/en/solar-installation-mersin",
  "/ev-sarj-istasyonu": "/en/ev-charging-stations",
};

const EN_TO_TR: Record<string, string> = {
  "/en": "/",
  "/en/solar-installation-mersin": "/gunes-paneli-mersin",
  "/en/ev-charging-stations": "/ev-sarj-istasyonu",
};

// Mobil menü (burger) açıkken menüyü kapatır. Bootstrap collapse varsayılan
// olarak menü/buton dışına tıklamada kapanmadığı için elle yönetiyoruz.
async function hideMobileNav() {
  const el = document.getElementById("navbarNav");
  if (!el || !el.classList.contains("show")) return;
  // @ts-expect-error bootstrap bundle has no types
  const bs = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
  (
    bs as unknown as {
      Collapse: {
        getOrCreateInstance: (
          e: Element,
          o?: { toggle?: boolean }
        ) => { hide: () => void };
      };
    }
  ).Collapse.getOrCreateInstance(el, { toggle: false }).hide();
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin sayfalarinda ana site navbar/footer'ini gizle
  const isAdminPath = pathname.startsWith("/admin");

  // Ingilizce sayfalar
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const langTarget = isEn
    ? EN_TO_TR[pathname] || "/"
    : TR_TO_EN[pathname] || "/en";

  // Bootstrap JS (modal, collapse vb.) - CDN yerine paketten yukle
  useEffect(() => {
    // @ts-expect-error bootstrap bundle has no types
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Mobil menü açıkken: boş alana dokununca VEYA menü içindeki gerçek bir
  // linke dokununca kapat. Burger butonu ve dropdown açıcıları hariç.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = document.getElementById("navbarNav");
      if (!el || !el.classList.contains("show")) return;
      const target = e.target as Element | null;
      // Burger butonunu Bootstrap'in kendisi yönetiyor — karışma
      const toggler = document.querySelector(".navbar-toggler");
      if (toggler && target && toggler.contains(target)) return;
      // Menünün içi: yalnızca gerçek bir linke (dropdown açıcı değil) dokununca kapat
      if (target && el.contains(target)) {
        const link = target.closest("a");
        if (link && !link.classList.contains("dropdown-toggle")) hideMobileNav();
        return;
      }
      // Menü ve burger dışına dokunuldu → kapat
      hideMobileNav();
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Başka bir sayfaya geçince (bir link'e dokununca) açık menüyü kapat
  useEffect(() => {
    hideMobileNav();
  }, [pathname]);

  return (
    <>
      {/* Global parallax arka plan (admin haric) */}
      {!isAdminPath && <div className="site-bg" aria-hidden="true" />}
      {/* Admin sayfalarinda ana site navbari gizle */}
      {!isAdminPath && (
        <header>
          <nav className="navbar navbar-expand-lg custom-nav fixed-top">
            <div className="container">
              <Link className="navbar-brand fw-bold d-flex align-items-center" href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Toros Solar"
                  height={46}
                  style={{ display: "block", width: "auto" }}
                />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
              </button>

              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav align-items-lg-center">
                  {!isEn ? (
                    <>
                      <li className="nav-item"><Link className="nav-link" href="/">Anasayfa</Link></li>
                      <li className="nav-item"><Link className="nav-link" href="/paketler">Paketler</Link></li>
                      <li className="nav-item"><Link className="nav-link" href="/ihtiyac-sihirbazi">İhtiyaç Sihirbazı</Link></li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Hizmetlerimiz
                        </a>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" href="/gunes-paneli-mersin">Mersin Güneş Paneli Kurulumu</Link></li>
                          <li><Link className="dropdown-item" href="/cati-ges">Çatı GES Sistemleri</Link></li>
                          <li><Link className="dropdown-item" href="/tarimsal-sulama">Tarımsal Sulama Sistemleri</Link></li>
                          <li><Link className="dropdown-item" href="/ev-sarj-istasyonu">Elektrikli Araç Şarj İstasyonu</Link></li>
                          <li><Link className="dropdown-item" href="/gunes-paneli-adana">Adana Güneş Paneli</Link></li>
                        </ul>
                      </li>

                      <li className="nav-item"><Link className="nav-link" href="/urunler">Ürünlerimiz</Link></li>
                      <li className="nav-item"><Link className="nav-link" href="/projelerimiz">Projelerimiz</Link></li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Rehber
                        </a>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" href="/rehber/ev-icin-kac-panel">Eve Kaç Panel Gerekir?</Link></li>
                          <li><Link className="dropdown-item" href="/rehber/cati-ges-maliyeti">Çatı GES Maliyeti</Link></li>
                          <li><Link className="dropdown-item" href="/rehber/mersin-gunes-enerjisi-uretimi">Mersin&apos;de Üretim Verileri</Link></li>
                          <li><Link className="dropdown-item" href="/rehber/ciftciler-icin-solar-sulama">Çiftçiler İçin Solar Sulama</Link></li>
                        </ul>
                      </li>

                      <li className="nav-item"><Link className="nav-link" href="/#hakkimizda">Hakkımızda</Link></li>
                      <li className="nav-item"><Link className="nav-link" href="/#iletisim">İletişim</Link></li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item"><Link className="nav-link" href="/en">Home</Link></li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Services
                        </a>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" href="/en/solar-installation-mersin">Solar Installation in Mersin</Link></li>
                          <li><Link className="dropdown-item" href="/en/ev-charging-stations">EV Charging Stations</Link></li>
                        </ul>
                      </li>

                      <li className="nav-item"><Link className="nav-link" href="/urunler">Products</Link></li>
                      <li className="nav-item"><Link className="nav-link" href="/en#contact">Contact</Link></li>
                    </>
                  )}

                  {/* Dil degistirici */}
                  <li className="nav-item ms-lg-2">
                    <Link
                      className="nav-link btn btn-sm btn-outline-secondary px-3 fw-bold"
                      style={{ borderRadius: "20px" }}
                      href={langTarget}
                      title={isEn ? "Türkçe'ye geç" : "Switch to English"}
                    >
                      <i className="bi bi-globe2 me-1"></i>{isEn ? "TR" : "EN"}
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </nav>
        </header>
      )}

      <main role="main">{children}</main>

      {/* Admin sayfalarinda site footer'ini gizle */}
      {!isAdminPath && (
        <footer className="footer py-3">
          <div className="container">
            <div className="footer-band-shell">
              <div className="row align-items-stretch g-3">
                <div className="col-lg-4 text-center">
                  <div className="footer-company-panel">
                    <h4 className="footer-brand-title mb-2">TOROSSOLAR</h4>
                    <p className="text-white-50 mb-2">
                      {isEn ? "Sustainable Energy from Mersin to the World" : "Mersin'den Dünyaya Sürdürülebilir Enerji"}
                    </p>
                    <span className="text-white-50 small">
                      {isEn ? "© 2026 - The Energy of the Future - All Rights Reserved." : "© 2026 - Geleceğin Enerjisi - Tüm Hakları Saklıdır."}
                    </span>
                  </div>
                </div>

                <div className="col-lg-4 text-center">
                  <div className="footer-company-panel">
                    <h6 className="text-white-50 mb-2">{isEn ? "Services" : "Hizmetlerimiz"}</h6>
                    {!isEn ? (
                      <ul className="list-unstyled mb-0 small">
                        <li><Link href="/paketler" className="text-white-50 text-decoration-none">Hazır Güneş Paketleri</Link></li>
                        <li><Link href="/gunes-paneli-mersin" className="text-white-50 text-decoration-none">Mersin Güneş Paneli Kurulumu</Link></li>
                        <li><Link href="/cati-ges" className="text-white-50 text-decoration-none">Çatı GES Sistemleri</Link></li>
                        <li><Link href="/tarimsal-sulama" className="text-white-50 text-decoration-none">Tarımsal Sulama Sistemleri</Link></li>
                        <li><Link href="/gunes-paneli-adana" className="text-white-50 text-decoration-none">Adana Güneş Paneli</Link></li>
                        <li><Link href="/ev-sarj-istasyonu" className="text-white-50 text-decoration-none">Elektrikli Araç Şarj İstasyonu</Link></li>
                        <li><Link href="/rehber/ev-icin-kac-panel" className="text-white-50 text-decoration-none">Rehber: Eve Kaç Panel Gerekir?</Link></li>
                        <li><Link href="/rehber/cati-ges-maliyeti" className="text-white-50 text-decoration-none">Rehber: Çatı GES Maliyeti</Link></li>
                        <li><Link href="/rehber/mersin-gunes-enerjisi-uretimi" className="text-white-50 text-decoration-none">Rehber: Mersin&apos;de Üretim Verileri</Link></li>
                        <li><Link href="/rehber/ciftciler-icin-solar-sulama" className="text-white-50 text-decoration-none">Rehber: Çiftçiler İçin Solar Sulama</Link></li>
                      </ul>
                    ) : (
                      <ul className="list-unstyled mb-0 small">
                        <li><Link href="/en/solar-installation-mersin" className="text-white-50 text-decoration-none">Solar Installation in Mersin</Link></li>
                        <li><Link href="/en/ev-charging-stations" className="text-white-50 text-decoration-none">Home EV Charging Stations</Link></li>
                        <li><Link href="/urunler" className="text-white-50 text-decoration-none">Product Catalogue</Link></li>
                        <li><Link href="/en#contact" className="text-white-50 text-decoration-none">Contact / Free Survey</Link></li>
                      </ul>
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="footer-freelancer-panel d-flex justify-content-center align-items-center text-center py-2 h-100">
                    <a
                      href="https://www.thecodely.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        display: "inline-block",
                        transition: "transform 0.2s ease, opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <span className="text-white-50 small mb-0">powered by </span>
                      <span style={{ color: "#ff7a00", fontSize: "1rem", fontWeight: 600 }}>codely</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
