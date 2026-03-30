"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import "./globals.css";

// Font tanımlamaları (ASP.NET'teki Google Fonts karşılığı)
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600", "800"],
  variable: "--font-poppins" 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'User' | 'Admin' | null>(null);

  const handleNavbarLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
      setRole(null);

      // Aynı sayfada kalınca navbar state gecikmesin diye tam yönlendirme yapıyoruz.
      window.location.href = role === 'Admin' ? '/admin/login' : '/user-login';
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadAuthState = async () => {
      try {
        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        const data = await response.json().catch(() => ({}));

        if (!mounted) return;

        setIsAuthenticated(Boolean(data?.authenticated));
        setRole(data?.role === 'Admin' ? 'Admin' : data?.authenticated ? 'User' : null);
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
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TorosSolar - Geleceğin Enerjisi</title>
        {/* Bootstrap Icons ve CSS importları globals.css veya burada CDN olarak tutulabilir */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      <body className={`${poppins.className}`}>
        <header>
          <nav className="navbar navbar-expand-lg custom-nav fixed-top">
            <div className="container">
              <Link className="navbar-brand fw-bold" href="/">
                TOROS<span style={{ color: "rgb(59, 59, 59)" }}>SOLAR</span>
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
                <ul className="navbar-nav align-items-center">
                  <li className="nav-item"><Link className="nav-link" href="/#anasayfa">Anasayfa</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="/#hakkimizda">Hakkımızda</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="/#hizmetlerimiz">Hizmetlerimiz</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="/#urunlerimiz">Ürünlerimiz</Link></li>
                  <li className="nav-item"><Link className="nav-link" href="/#iletisim">İletişim</Link></li>

                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <Link 
                          className="nav-link btn btn-sm btn-outline-warning ms-lg-3 px-3 me-2" 
                          style={{ borderRadius: "20px" }} 
                          href={role === 'Admin' ? '/admin/product' : '/account/profile'}
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
                          Çıkış Yap
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link 
                        className="nav-link btn btn-sm btn-outline-light ms-lg-3 px-3" 
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

        <main role="main">
          {children}
        </main>

        <footer className="footer py-5">
          <div className="container">
            <div className="footer-band-shell">
              <div className="row align-items-stretch g-4">
                <div className="col-lg-6 text-center">
                  <div className="footer-company-panel">
                    <h4 className="footer-brand-title mb-2">TOROSSOLAR</h4>
                    <p className="text-white-50 mb-2">Mersin&apos;den Dünyaya Sürdürülebilir Enerji</p>
                    <span className="text-white-50 small">© 2026 - Geleceğin Enerjisi - Tüm Hakları Saklıdır.</span>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="footer-freelancer-panel freelancer-signature-wrap">
                    <div className="freelancer-signature-text text-center">
                      <span className="d-inline-block freelancer-signature-badge mb-1">BAĞIMSIZ PROFESYONEL ÇÖZÜMLER</span>
                      <span className="d-block freelancer-signature-kicker">BÜŞRA ÖZKAN | Web Teknolojileri Geliştiricisi</span>
                      <span className="d-block freelancer-signature-main">Markanıza özel, modern ve yüksek performanslı web çözümleri geliştiriyorum.</span>
                      <span className="d-block freelancer-signature-sub">Projeniz için benimle iletişime geçebilirsiniz.</span>
                    </div>

                    <div className="freelancer-action-icons" aria-label="Iletisim baglantilari">
                      <a
                        href="https://wa.me/905309088271"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="freelancer-icon-btn freelancer-icon-whatsapp"
                        aria-label="WhatsApp ile iletisime gec"
                        title="WhatsApp"
                      >
                        <i className="bi bi-whatsapp"></i>
                      </a>

                      <a
                        href="mailto:ozkanbusranur89@gmail.com"
                        className="freelancer-icon-btn freelancer-icon-mail"
                        aria-label="E-posta gonder"
                        title="E-posta"
                      >
                        <i className="bi bi-envelope-fill"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Bootstrap JS Bundle (Modal, Navbar Collapse vb. için) */}
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </body>
    </html>
  );
}