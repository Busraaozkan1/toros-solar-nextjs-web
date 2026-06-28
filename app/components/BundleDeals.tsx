import React from "react";
import { BUNDLES, type Bundle } from "@/lib/bundles";

const PHONE = "+905367333678";

function waLink(b: Bundle) {
  const text = `Merhaba, ${b.name} hakkında bilgi almak istiyorum.`;
  return `https://wa.me/905367333678?text=${encodeURIComponent(text)}`;
}

function BundleCard({ b }: { b: Bundle }) {
  const accent = b.featured;
  return (
    <div className="col-xl-3 col-md-6">
      <div
        id={b.id}
        className="h-100 d-flex flex-column position-relative p-4 shadow"
        style={{
          borderRadius: "20px",
          scrollMarginTop: "90px",
          background: "linear-gradient(165deg, rgba(30,41,59,0.92) 0%, rgba(15,23,42,0.97) 70%)",
          border: accent ? "2px solid var(--accent, #FB6602)" : "1px solid rgba(148,163,184,0.26)",
          boxShadow: accent ? "0 18px 40px rgba(251,102,2,0.18)" : undefined,
        }}
      >
        {b.badge && (
          <span
            className="position-absolute top-0 start-50 translate-middle badge rounded-pill px-3 py-2"
            style={{
              background: accent ? "var(--accent, #FB6602)" : "#1f2937",
              color: "#fff",
              fontSize: "0.7rem",
              letterSpacing: "0.5px",
              border: accent ? "none" : "1px solid rgba(251,102,2,0.5)",
            }}
          >
            {b.badge}
          </span>
        )}

        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
          <i className={`bi ${b.icon} text-gold`} style={{ fontSize: "2rem" }}></i>
          <span
            className="badge rounded-pill px-3 py-2"
            style={{ background: "rgba(251,102,2,0.14)", color: "var(--accent, #FB6602)", fontWeight: 700 }}
          >
            {b.power}
          </span>
        </div>

        <h4 className="text-white fw-bold mb-1" style={{ fontSize: "1.15rem", lineHeight: 1.3 }}>
          {b.name}
        </h4>
        <p className="mb-3" style={{ color: "var(--accent, #FB6602)", fontSize: "0.85rem", fontWeight: 600 }}>
          {b.persona}
        </p>
        <p className="mb-3" style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.9rem", lineHeight: 1.6 }}>
          {b.blurb}
        </p>

        <ul className="list-unstyled mb-4">
          {b.components.map((c, i) => (
            <li key={i} className="d-flex align-items-start mb-2" style={{ color: "#cbd5e1", fontSize: "0.86rem" }}>
              <i className="bi bi-check2-circle text-gold me-2 mt-1"></i>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto d-grid gap-2">
          <a href={waLink(b)} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <i className="bi bi-whatsapp me-2"></i>Teklif Al
          </a>
          <a href={`tel:${PHONE}`} className="btn btn-outline-light btn-sm">
            <i className="bi bi-telephone me-2"></i>Hemen Ara: 0536 733 36 78
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BundleDeals() {
  return (
    <section id="paketler" className="section-padding bg-dark">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-gold text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>
            Hazır Çözümler
          </h6>
          <h2 className="section-title text-white headline-hover-fx">Paket Fırsatları</h2>
          <p className="mx-auto mt-3" style={{ maxWidth: "680px", color: "rgba(255,255,255,0.7)" }}>
            İhtiyacınıza göre kurgulanmış, anahtar teslim güneş enerjisi paketleri. Net fiyat ve ücretsiz keşif için bize ulaşın.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {BUNDLES.map((b) => (
            <BundleCard key={b.id} b={b} />
          ))}
        </div>

        <p className="text-center mt-4 mb-0" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
          Tüm paketler anahtar teslim: nakliye ve montaj dahildir. Net fiyat ücretsiz keşifte belirlenir.
        </p>
      </div>
    </section>
  );
}
