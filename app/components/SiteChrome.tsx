"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"User" | "Admin" | null>(null);

  // Admin sayfalarinda ana site navbar/footer'ini gizle
  const isAdminPath = pathname.startsWith("/admin");

  const handleNavbarLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setRole(null);
      // Cikis sonrasi her zaman ana sayfaya yonlendir (admin login'e degil)
      window.location.href = "/";
    }
  };

  // Bootstrap JS (modal, collapse vb.) - CDN yerine paketten yukle
  useEffect(() => {
    // @ts-expect-error bootstrap bundle has no types
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadAuthState = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await response.json().catch(() => ({}));

        if (!mounted) return;

        setIsAuthenticated(Boolean(data?.authenticated));
        setRole(data?.role === "Admin" ? "Admin" : data?.authenticated ? "User" : null);
      } catch {
        if (!mounted) return;
        setIsAuthenticated(false);
        setRole(null);
      }
    };

    loadAuthState();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  return (
    <>
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
                  <li className="nav-item"><Link className="nav-link" href="/">Anasayfa</Link></li>

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

                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link btn btn-sm btn-outline-warning ms-lg-3 px-3 me-2"
                          style={{ borderRadius: "20px" }}
                          href={role === "Admin" ? "/admin/product" : "/account/profile"}
                        >
                          <i className="bi bi-person-circle"></i> Profilim
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link btn btn-sm btn-outline-danger px-3"
                          style={{ borderRadius: "20px", border: "1px solid", background: "transparent" }}
                          type="button"
                          onClick={handleNavbarLogout}
                        >
                          Cikis Yap
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item ms-lg-auto">
                      <Link
                        className="nav-link btn btn-sm btn-outline-light nav-login-btn"
                        style={{ borderRadius: "20px" }}
                        href="/user-login"
                      >
                        Giriş Yap / Kayıt Ol
                      </Link>
                    </li>
                  )}
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
                    <p className="text-white-50 mb-2">Mersin&apos;den Dünyaya Sürdürülebilir Enerji</p>
                    <span className="text-white-50 small">© 2026 - Geleceğin Enerjisi - Tüm Hakları Saklıdır.</span>
                  </div>
                </div>

                <div className="col-lg-4 text-center">
                  <div className="footer-company-panel">
                    <h6 className="text-white-50 mb-2">Hizmetlerimiz</h6>
                    <ul className="list-unstyled mb-0 small">
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
