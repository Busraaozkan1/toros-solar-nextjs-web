"use client";

import React, { useMemo, useState } from "react";
import { APPLIANCES } from "@/lib/bundles";
import { PHONE_E164, whatsappLink } from "@/lib/contact";
import {
  buildSystemByDailyKwh,
  buildSystemByMonthlyKwh,
  buildPumpSystem,
  type WizProduct,
  type SystemItem,
} from "@/lib/systemBuilder";

const PHONE = PHONE_E164;
const wa = whatsappLink;

type Mode = "cihaz" | "fatura" | "pompa";
const MODES: { key: Mode; label: string; icon: string }[] = [
  { key: "cihaz", label: "Cihazlarıma göre", icon: "bi-plug" },
  { key: "fatura", label: "Faturama göre", icon: "bi-receipt" },
  { key: "pompa", label: "Tarımsal pompa", icon: "bi-moisture" },
];

const cardStyle: React.CSSProperties = {
  borderRadius: "20px",
  background: "linear-gradient(165deg, rgba(30,41,59,0.92) 0%, rgba(15,23,42,0.97) 70%)",
};

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const btn: React.CSSProperties = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1px solid rgba(232,102,26,0.5)",
    background: "transparent",
    color: "var(--accent, #E8661A)",
    fontWeight: 700,
    lineHeight: 1,
  };
  return (
    <div className="d-flex align-items-center gap-2">
      <button type="button" style={btn} onClick={() => onChange(Math.max(0, value - 1))} aria-label="azalt">
        −
      </button>
      <span className="text-white fw-bold" style={{ minWidth: 18, textAlign: "center" }}>
        {value}
      </span>
      <button type="button" style={btn} onClick={() => onChange(value + 1)} aria-label="arttır">
        +
      </button>
    </div>
  );
}

function ItemList({ items }: { items: SystemItem[] }) {
  return (
    <div className="mb-3">
      {items.map((it) => (
        <a
          key={it.id}
          href={it.href}
          className="d-flex align-items-center justify-content-between text-decoration-none mb-2 p-2 px-3 rounded-3"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-white text-start" style={{ fontSize: "0.86rem", lineHeight: 1.35 }}>
            <span className="text-gold fw-bold me-2">{it.qty}×</span>
            {it.name}
          </span>
          <i className="bi bi-arrow-right text-gold ms-2"></i>
        </a>
      ))}
    </div>
  );
}

export default function SolarWizard({ products }: { products: WizProduct[] }) {
  const [mode, setMode] = useState<Mode>("cihaz");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [monthly, setMonthly] = useState(350);
  const [hp, setHp] = useState(3);
  const [phase, setPhase] = useState<"idle" | "calc" | "done">("idle");
  const reset = () => setPhase("idle");
  const calc = () => {
    setPhase("calc");
    window.setTimeout(() => setPhase("done"), 700);
  };

  const daily = useMemo(
    () => APPLIANCES.reduce((s, a) => s + (counts[a.key] || 0) * a.kwh, 0),
    [counts]
  );

  const home = useMemo(() => {
    if (mode === "cihaz") return daily > 0 ? buildSystemByDailyKwh(products, daily) : null;
    if (mode === "fatura") return monthly > 0 ? buildSystemByMonthlyKwh(products, monthly) : null;
    return null;
  }, [mode, daily, monthly, products]);

  const pump = useMemo(() => (mode === "pompa" ? buildPumpSystem(products, hp) : null), [mode, hp, products]);

  const setCount = (key: string, v: number) => {
    setCounts((c) => ({ ...c, [key]: v }));
    reset();
  };

  const homeText = home
    ? `Merhaba, ihtiyaç sihirbazına göre ~${home.dailyKwh} kWh/gün için şu sistemi istiyorum: ${home.items
        .map((i) => `${i.qty}× ${i.name}`)
        .join(", ")}. Teklif alabilir miyim?`
    : "";
  const pumpText = pump
    ? `Merhaba, ${pump.hp} HP tarımsal sulama pompası için solar sistem (~${pump.panelCount} panel) teklifi almak istiyorum.`
    : "";

  const box: React.CSSProperties = {
    borderRadius: "16px",
    background: "rgba(232,102,26,0.10)",
    border: "1px solid rgba(232,102,26,0.4)",
  };

  return (
    <section id="sihirbaz" className="section-padding">
      <style>{`
        .tsw-range{-webkit-appearance:none;appearance:none;width:100%;max-width:360px;height:6px;border-radius:5px;background:rgba(232,102,26,.28);outline:none;display:block;margin:0 auto}
        .tsw-range::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--accent,#E8661A);cursor:pointer;border:3px solid #fff}
        .tsw-range::-moz-range-thumb{width:24px;height:24px;border-radius:50%;background:var(--accent,#E8661A);cursor:pointer;border:3px solid #fff}
      `}</style>

      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-white text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>
            Size Özel
          </h6>
          <h2 className="section-title text-white headline-hover-fx">Solar İhtiyaç Sihirbazı</h2>
          <p className="mx-auto mt-3" style={{ maxWidth: "680px", color: "rgba(255,255,255,0.7)" }}>
            Birkaç saniyede size uygun ürünleri görün. Öneri tahminîdir; net sistem ücretsiz keşifte belirlenir.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="p-4 p-md-5 border-gold-thin shadow" style={cardStyle}>
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {MODES.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 ${mode === m.key ? "btn-gold" : "btn-outline-light"}`}
                    onClick={() => { setMode(m.key); reset(); }}
                  >
                    <i className={`bi ${m.icon} me-2`}></i>
                    {m.label}
                  </button>
                ))}
              </div>

              {mode === "cihaz" && (
                <div className="row g-3">
                  {APPLIANCES.map((a) => (
                    <div key={a.key} className="col-6">
                      <div
                        className="d-flex flex-column align-items-center text-center justify-content-between p-3 rounded-3 h-100"
                        style={{ background: "rgba(255,255,255,0.04)", gap: "10px", minHeight: "112px" }}
                      >
                        <span className="text-white" style={{ fontSize: "0.82rem", lineHeight: 1.25 }}>
                          <i className={`bi ${a.icon} text-gold me-1`}></i>
                          {a.label}
                        </span>
                        <Stepper value={counts[a.key] || 0} onChange={(v) => setCount(a.key, v)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mode === "fatura" && (
                <div className="text-center py-3">
                  <div className="mb-2">
                    <span className="text-gold fw-bold" style={{ fontSize: "2rem" }}>
                      {monthly}
                    </span>
                    <span className="text-white ms-2">kWh / ay</span>
                  </div>
                  <input
                    className="tsw-range"
                    type="range"
                    min={50}
                    max={2000}
                    step={10}
                    value={monthly}
                    onChange={(e) => { setMonthly(Number(e.target.value)); reset(); }}
                  />
                  <p className="mt-3 mb-0" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    Faturanızdaki <strong>“Tüketim (kWh)”</strong> değerini kaydırarak seçin.
                  </p>
                </div>
              )}

              {mode === "pompa" && (
                <div className="text-center py-3">
                  <div className="mb-2">
                    <span className="text-gold fw-bold" style={{ fontSize: "2rem" }}>
                      {hp}
                    </span>
                    <span className="text-white ms-2">HP</span>
                  </div>
                  <input
                    className="tsw-range"
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={hp}
                    onChange={(e) => { setHp(Number(e.target.value)); reset(); }}
                  />
                  <p className="mt-3 mb-0" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    Pompa gücünü kaydırarak seçin.
                  </p>
                </div>
              )}

              {phase !== "done" && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-gold px-4 py-2"
                    disabled={phase === "calc" || (mode === "cihaz" && daily <= 0)}
                    onClick={calc}
                  >
                    {phase === "calc" ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>Sistem hesaplanıyor...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-stars me-2"></i>Sistemimi Oluştur
                      </>
                    )}
                  </button>
                  <p className="mt-3 mb-0" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
                    Seçimlerinizi yapın, size en uygun ürünleri önerelim.
                  </p>
                </div>
              )}

              {/* SONUC */}
              {phase === "done" && mode === "pompa" && pump && (
                <div className="mt-4 p-4" style={box}>
                  <p className="text-white text-center mb-1" style={{ fontSize: "0.9rem" }}>
                    {pump.hp} HP pompa ≈ <strong>{pump.kw} kW</strong> · önerilen ~{pump.panelCount} panel
                  </p>
                  <h6 className="text-gold fw-bold text-center mb-3">Önerilen ürünler</h6>
                  {pump.items.length > 0 ? (
                    <ItemList items={pump.items} />
                  ) : (
                    <p className="text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Size özel pompa sistemini birlikte planlayalım.
                    </p>
                  )}
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <a href={wa(pumpText)} target="_blank" rel="noopener noreferrer" className="btn btn-gold px-4">
                      <i className="bi bi-whatsapp me-2"></i>Teklif Al
                    </a>
                    <a href={`tel:${PHONE}`} className="btn btn-outline-light px-4">
                      <i className="bi bi-telephone me-2"></i>Ara
                    </a>
                  </div>
                </div>
              )}

              {phase === "done" && (mode === "cihaz" || mode === "fatura") && home && (
                <div className="mt-4 p-4" style={box}>
                  <p className="text-white text-center mb-1" style={{ fontSize: "0.9rem" }}>
                    Tahminî günlük tüketim: <strong>{home.dailyKwh} kWh</strong> · önerilen sistem ~{home.suggestedKwp} kWp
                  </p>
                  <h6 className="text-gold fw-bold text-center mb-3">Size önerilen ürünler</h6>
                  {home.items.length > 0 ? (
                    <ItemList items={home.items} />
                  ) : (
                    <p className="text-center" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Size özel sistemi birlikte planlayalım.
                    </p>
                  )}
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <a href={wa(homeText)} target="_blank" rel="noopener noreferrer" className="btn btn-gold px-4">
                      <i className="bi bi-whatsapp me-2"></i>Bu Sistem İçin Teklif Al
                    </a>
                    <a href={`tel:${PHONE}`} className="btn btn-outline-light px-4">
                      <i className="bi bi-telephone me-2"></i>Ara
                    </a>
                  </div>
                </div>
              )}

              {phase === "done" &&
                ((mode === "pompa" && !pump) ||
                  ((mode === "cihaz" || mode === "fatura") && !home)) && (
                  <p className="mt-4 text-center" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                    Size özel sistemi birlikte planlayalım — bizi arayın.
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
