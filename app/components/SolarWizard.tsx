"use client";

import React, { useMemo, useState } from "react";
import {
  APPLIANCES,
  buildApplianceQuoteMessage,
  buildBillQuoteMessage,
  buildPumpQuoteMessage,
  estimateApplianceNeeds,
  estimateMonthlyNeeds,
  estimatePumpNeeds,
  selectedApplianceLabels,
  type PumpPhase,
} from "@/lib/solarEstimator";
import { PHONE_E164, whatsappLink } from "@/lib/contact";

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

const numberInputStyle: React.CSSProperties = {
  width: "130px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(232,102,26,0.45)",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: 700,
};

const boundedNumber = (value: string, min: number, max: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min;
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
      <button type="button" style={btn} onClick={() => onChange(Math.min(20, value + 1))} aria-label="arttır">
        +
      </button>
    </div>
  );
}

export default function SolarWizard() {
  const [mode, setMode] = useState<Mode>("cihaz");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [monthly, setMonthly] = useState(350);
  const [hp, setHp] = useState(3);
  const [pumpHours, setPumpHours] = useState(6);
  const [pumpPhase, setPumpPhase] = useState<PumpPhase>("trifaze");
  const [phase, setPhase] = useState<"idle" | "done">("idle");
  const reset = () => setPhase("idle");

  const applianceEstimate = useMemo(() => estimateApplianceNeeds(counts), [counts]);
  const billEstimate = useMemo(() => estimateMonthlyNeeds(monthly), [monthly]);
  const pumpEstimate = useMemo(() => estimatePumpNeeds(hp, pumpHours), [hp, pumpHours]);

  const setCount = (key: string, v: number) => {
    setCounts((c) => ({ ...c, [key]: v }));
    reset();
  };

  const selectedAppliances = selectedApplianceLabels(counts);
  const selectedAppliancesText = selectedAppliances.join(", ");
  const applianceText = selectedAppliances.length > 0 ? buildApplianceQuoteMessage(counts) : "";
  const billText = buildBillQuoteMessage(monthly);
  const pumpText = buildPumpQuoteMessage(hp, pumpHours, pumpPhase);

  const box: React.CSSProperties = {
    borderRadius: "16px",
    background: "rgba(232,102,26,0.10)",
    border: "1px solid rgba(232,102,26,0.4)",
  };

  return (
    <section id="sihirbaz" className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="text-white text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>
            Size Özel
          </h6>
          <h2 className="section-title text-white headline-hover-fx">Solar İhtiyaç Sihirbazı</h2>
          <p className="mx-auto mt-3" style={{ maxWidth: "680px", color: "rgba(255,255,255,0.7)" }}>
            Yaklaşık güç ihtiyacınızı ve yaz koşullarındaki tahmini panel sayısını görün. Net sistem ücretsiz keşifte belirlenir.
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
                <>
                  <p className="text-center mb-3" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>
                    Kullanacağınız cihazların adetlerini seçin. Hesapta tipik kullanım süreleri esas alınır.
                  </p>
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
                </>
              )}

              {mode === "fatura" && (
                <div className="text-center py-3">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <input
                      type="number"
                      className="form-control text-center"
                      style={numberInputStyle}
                      min={1}
                      max={10000}
                      step={1}
                      value={monthly}
                      aria-label="Aylık ortalama tüketim"
                      onChange={(e) => { setMonthly(boundedNumber(e.target.value, 1, 10000)); reset(); }}
                    />
                    <span className="text-white ms-2">kWh / ay</span>
                  </div>
                  <p className="mt-3 mb-0" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    Son 12 faturanızdaki tüketimin aylık ortalamasını seçin. Tek bir ay mevsimsel olarak yanıltıcı olabilir.
                  </p>
                </div>
              )}

              {mode === "pompa" && (
                <div className="text-center py-3">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <input
                      type="number"
                      className="form-control text-center"
                      style={numberInputStyle}
                      min={0.5}
                      max={100}
                      step={0.5}
                      value={hp}
                      aria-label="Pompa gücü"
                      onChange={(e) => { setHp(boundedNumber(e.target.value, 0.5, 100)); reset(); }}
                    />
                    <span className="text-white ms-2">HP</span>
                  </div>
                  <p className="mt-3 mb-0" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    Pompanızın etiketindeki HP değerini girin.
                  </p>
                  <div className="d-flex align-items-center justify-content-center gap-2 mt-4 mb-2">
                    <input
                      type="number"
                      className="form-control text-center"
                      style={numberInputStyle}
                      min={0.5}
                      max={12}
                      step={0.5}
                      value={pumpHours}
                      aria-label="Günlük pompa çalışma süresi"
                      onChange={(e) => { setPumpHours(boundedNumber(e.target.value, 0.5, 12)); reset(); }}
                    />
                    <span className="text-white ms-2">saat / gün</span>
                  </div>
                  <p className="mt-3" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    Pompanın bir günde çalışmasını istediğiniz süreyi girin.
                  </p>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {(["monofaze", "trifaze"] as PumpPhase[]).map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`btn btn-sm rounded-pill px-3 ${pumpPhase === value ? "btn-gold" : "btn-outline-light"}`}
                        aria-pressed={pumpPhase === value}
                        onClick={() => { setPumpPhase(value); reset(); }}
                      >
                        {value === "monofaze" ? "Monofaze" : "Trifaze"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {phase !== "done" && (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-gold px-4 py-2"
                    disabled={mode === "cihaz" && applianceEstimate.panelCount <= 0}
                    onClick={() => setPhase("done")}
                  >
                    <i className="bi bi-calculator me-2"></i>İhtiyacımı Hesapla
                  </button>
                  <p className="mt-3 mb-0" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
                    Sonucu gördükten sonra WhatsApp&apos;tan teklif isteyebilir veya bizi arayabilirsiniz.
                  </p>
                </div>
              )}

              {/* SONUC */}
              {phase === "done" && mode === "pompa" && (
                <div className="mt-4 p-4" style={box}>
                  <p className="text-white text-center mb-1" style={{ fontSize: "0.9rem" }}>
                    Yaklaşık elektrik gücü: <strong>{pumpEstimate.electricalKw} kW</strong>
                  </p>
                  <p className="text-white text-center mb-2" style={{ fontSize: "0.9rem" }}>
                    Yaz koşullarında tahmini panel ihtiyacı: yaklaşık <strong>{pumpEstimate.panelCount} adet</strong>
                  </p>
                  <p className="text-center mb-3" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.8rem" }}>
                    Yaz koşullarına göre ilk tahmindir. Pompa etiketi, kuyu derinliği, debi ve yıl boyu kullanım net teklifte doğrulanır.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <a href={wa(pumpText)} target="_blank" rel="noopener noreferrer" className="btn btn-gold px-4">
                      <i className="bi bi-whatsapp me-2"></i>WhatsApp&apos;tan Teklif İste
                    </a>
                    <a href={`tel:${PHONE}`} className="btn btn-outline-light px-4">
                      <i className="bi bi-telephone me-2"></i>Bizi Ara
                    </a>
                  </div>
                </div>
              )}

              {phase === "done" && mode === "cihaz" && applianceEstimate.panelCount > 0 && (
                <div className="mt-4 p-4" style={box}>
                  <p className="text-white text-center mb-1" style={{ fontSize: "0.9rem" }}>
                    Yaklaşık eşzamanlı cihaz gücü: <strong>{applianceEstimate.loadKw} kW</strong>
                  </p>
                  <p className="text-white text-center mb-2" style={{ fontSize: "0.9rem" }}>
                    Yaz koşullarında tahmini panel ihtiyacı: yaklaşık <strong>{applianceEstimate.panelCount} adet</strong>
                  </p>
                  <p className="text-center mb-2" style={{ color: "rgba(255,255,255,0.68)", fontSize: "0.8rem" }}>
                    Seçilen cihazlar: {selectedAppliancesText}
                  </p>
                  <p className="text-center mb-3" style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.78rem" }}>
                    İlk tahmin, tipik kullanım süreleri ve Mersin-Adana yaz koşulları esas alınarak hazırlanmıştır.
                    Kış ve yıl boyu kullanım, gölgelenme ve kurulum koşulları net teklifte doğrulanır.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <a href={wa(applianceText)} target="_blank" rel="noopener noreferrer" className="btn btn-gold px-4">
                      <i className="bi bi-whatsapp me-2"></i>WhatsApp&apos;tan Teklif İste
                    </a>
                    <a href={`tel:${PHONE}`} className="btn btn-outline-light px-4">
                      <i className="bi bi-telephone me-2"></i>Bizi Ara
                    </a>
                  </div>
                </div>
              )}

              {phase === "done" && mode === "fatura" && (
                <div className="mt-4 p-4" style={box}>
                  <p className="text-white text-center mb-1" style={{ fontSize: "0.9rem" }}>
                    Aylık ortalama tüketim: <strong>{monthly} kWh</strong>
                  </p>
                  <p className="text-white text-center mb-2" style={{ fontSize: "0.9rem" }}>
                    Yaz koşullarında tahmini panel ihtiyacı: yaklaşık <strong>{billEstimate.panelCount} adet</strong>
                  </p>
                  <p className="text-center mb-3" style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.78rem" }}>
                    İlk tahmin, 12 aylık ortalama tüketim ve Mersin-Adana yaz koşulları esas alınarak hazırlanmıştır.
                    Kış ve yıl boyu kullanım, çatı yönü ve gölgelenme net teklifte doğrulanır.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <a href={wa(billText)} target="_blank" rel="noopener noreferrer" className="btn btn-gold px-4">
                      <i className="bi bi-whatsapp me-2"></i>WhatsApp&apos;tan Teklif İste
                    </a>
                    <a href={`tel:${PHONE}`} className="btn btn-outline-light px-4">
                      <i className="bi bi-telephone me-2"></i>Bizi Ara
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
