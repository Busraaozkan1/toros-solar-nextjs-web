"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BUNDLES, type Bundle } from "@/lib/bundles";
import { PHONE_E164, whatsappLink } from "@/lib/contact";

function waLink(b: Bundle) {
  const text = `Merhaba, ${b.name} hakkında bilgi almak istiyorum.`;
  return whatsappLink(text);
}

const cardBg = "linear-gradient(165deg, rgba(30,41,59,0.92) 0%, rgba(15,23,42,0.97) 70%)";

function BundleCard({
  b,
  expanded,
  onToggle,
}: {
  b: Bundle;
  expanded: boolean;
  onToggle: () => void;
}) {
  // Mobilde detaylar gizli (tıklayınca açılır); md ve üstünde her zaman açık.
  const detailCls = `flex-column flex-grow-1 ${expanded ? "d-flex" : "d-none d-md-flex"}`;
  return (
    <div className="col-12 col-md-6 col-xl-3">
      <div
        id={b.id}
        className="h-100 d-flex flex-column position-relative p-3 p-md-4 shadow"
        style={{
          borderRadius: "18px",
          scrollMarginTop: "90px",
          background: cardBg,
          border: "2px solid var(--accent, #E8661A)",
        }}
      >
        <div
          role="button"
          onClick={onToggle}
          className="d-flex align-items-center"
          style={{ gap: "12px", cursor: "pointer" }}
        >
          <i className={`bi ${b.icon} text-gold`} style={{ fontSize: "1.9rem" }}></i>
          <div className="flex-grow-1">
            <h4 className="text-white fw-bold mb-0" style={{ fontSize: "1.02rem", lineHeight: 1.25 }}>
              {b.name}
            </h4>
            <span style={{ color: "var(--accent, #E8661A)", fontSize: "0.78rem", fontWeight: 600 }}>
              {b.persona}
            </span>
          </div>
          <span
            className="badge rounded-pill px-2 py-1"
            style={{ background: "rgba(232,102,26,0.16)", color: "var(--accent, #E8661A)", fontWeight: 700, fontSize: "0.8rem" }}
          >
            {b.power}
          </span>
          <i className={`bi bi-chevron-${expanded ? "up" : "down"} text-gold d-md-none`}></i>
        </div>

        <div className="mt-2 mb-1">
          <span style={{ color: "var(--accent, #E8661A)", fontWeight: 800, fontSize: "1rem", lineHeight: 1.3 }}>
            {b.fromPrice}
          </span>
        </div>

        <div className={detailCls}>
          <p className="mt-3 mb-3" style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.88rem", lineHeight: 1.6 }}>
            {b.blurb}
          </p>
          <ul className="list-unstyled mb-3">
            {b.components.map((c, i) => (
              <li key={i} className="d-flex align-items-start mb-2" style={{ color: "#cbd5e1", fontSize: "0.84rem" }}>
                <i className="bi bi-check2-circle text-gold me-2 mt-1"></i>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="d-grid gap-2 mt-auto">
            <a href={waLink(b)} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <i className="bi bi-whatsapp me-2"></i>Teklif Al
            </a>
            <a href={`tel:${PHONE_E164}`} className="btn btn-outline-light btn-sm">
              <i className="bi bi-telephone me-2"></i>Hemen Ara
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BundleDeals() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="paketler" className="section-padding landing-bg">
      <div className="container">
        <div className="text-center mb-5" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}>
          <h6 className="text-white text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>
            Hazır Çözümler
          </h6>
          <h1 className="section-title text-white headline-hover-fx">Güneş Enerjisi Paket Fırsatları</h1>
          <p className="mx-auto mt-3" style={{ maxWidth: "680px", color: "rgba(255,255,255,0.7)" }}>
            Mersin &amp; Adana&apos;da ihtiyacınıza göre kurgulanmış, anahtar teslim güneş enerjisi paketleri. Net fiyat ve ücretsiz keşif için bize ulaşın.
          </p>
        </div>

        <div className="row g-3 g-md-4 justify-content-center">
          {BUNDLES.map((b) => (
            <BundleCard
              key={b.id}
              b={b}
              expanded={expanded === b.id}
              onToggle={() => setExpanded((cur) => (cur === b.id ? null : b.id))}
            />
          ))}
        </div>

        <p className="text-center mt-3 mb-0 d-md-none" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem" }}>
          Detaylar için bir pakete dokunun
        </p>

        <div className="text-center mt-5">
          <div
            className="d-inline-block px-4 py-4 rounded-4"
            style={{ background: "rgba(232,102,26,0.10)", border: "1px solid rgba(232,102,26,0.35)", maxWidth: "640px" }}
          >
            <h5 className="text-white fw-bold mb-2">Hangi paket size uygun?</h5>
            <p className="mb-3" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
              Cihazlarınıza, faturanıza veya pompanıza göre 1 dakikada öğrenin.
            </p>
            <Link href="/ihtiyac-sihirbazi" className="btn btn-gold px-4">
              <i className="bi bi-stars me-2"></i>İhtiyaç Sihirbazını Aç
            </Link>
          </div>
        </div>

        <p className="text-center mt-4 mb-0" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
          Tüm paketler anahtar teslimdir (nakliye + montaj dahil); kurulum koşulları ücretsiz keşifte doğrulanır.
        </p>
      </div>
    </section>
  );
}
