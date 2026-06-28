import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCtaEn from "../components/LandingCtaEn";

export const metadata: Metadata = {
  title: "Solar Panel Installation in Mersin, Turkey | English-Speaking Solar Company",
  description:
    "Turnkey rooftop solar, off-grid systems and EV chargers in Mersin, Turkey. English-speaking team, free site survey, fixed-price quotes. 15 years of experience.",
  alternates: {
    canonical: "/en",
    languages: { tr: "/", en: "/en" },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can foreigners install solar panels on their property in Turkey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you own property in Turkey, you can install a rooftop solar system regardless of nationality. For grid-tied systems we handle the utility application and paperwork on your behalf; off-grid systems need no permission at all.",
      },
    },
    {
      "@type": "Question",
      name: "How much sun does Mersin get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mersin is one of the sunniest regions in Turkey, with around 2,700 hours of sunshine per year and roughly 1,500 kWh/m² of annual solar radiation - comparable to southern Spain. A typical 5 kW rooftop system produces about 7,500-8,000 kWh per year here.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a residential solar installation take to pay for itself in Turkey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With current electricity prices, most residential rooftop systems in the Mersin region pay for themselves in roughly 4 to 8 years depending on system size and consumption. Panels are warrantied for 25+ years, so the majority of the system's life is pure savings.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide service in English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We assist English-speaking homeowners throughout the process: site survey, system design, quotation, installation and after-sales support. You can call or message us on WhatsApp in English.",
      },
    },
  ],
};

export default function EnHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section
        className="section-padding"
        style={{
          minHeight: "100vh",
          paddingTop: "110px",
        }}
      >
        <div className="container">
          {/* Hero */}
          <div className="text-center mb-5">
            <h1 className="text-white fw-bold display-5 mb-3">
              Solar Energy for Your Home in <span className="text-gold">Mersin</span>
            </h1>
            <p className="mx-auto" style={{ maxWidth: 760, color: "#cbd5e1", fontSize: "1.1rem" }}>
              Turnkey rooftop solar, off-grid systems and EV charging stations —
              designed, installed and maintained by a local team with 15 years of
              experience. English-speaking service for foreign residents on the
              Mediterranean coast.
            </p>
          </div>

          {/* Services */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="h-100 p-4 bg-dark border-gold-thin rounded-3 shadow">
                <i className="bi bi-house-gear text-gold fs-1"></i>
                <h4 className="text-white fw-bold mt-3">Rooftop Solar</h4>
                <p style={{ color: "#b9c3d1" }}>
                  Grid-tied systems that cut your electricity bill to near zero.
                  We handle the utility application, net-metering paperwork and
                  installation — you just watch the meter run backwards.
                </p>
                <Link href="/en/solar-installation-mersin" className="text-gold text-decoration-none fw-bold">
                  Learn more <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-4 bg-dark border-gold-thin rounded-3 shadow">
                <i className="bi bi-battery-charging text-gold fs-1"></i>
                <h4 className="text-white fw-bold mt-3">Off-Grid Systems</h4>
                <p style={{ color: "#b9c3d1" }}>
                  Independent power for country houses, vineyards and plots
                  without a grid connection. Panels, lithium batteries and
                  inverters sized to your actual consumption — no permits needed.
                </p>
                <Link href="/en#contact" className="text-gold text-decoration-none fw-bold">
                  Ask for a design <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-4 bg-dark border-gold-thin rounded-3 shadow">
                <i className="bi bi-ev-station text-gold fs-1"></i>
                <h4 className="text-white fw-bold mt-3">EV Charging</h4>
                <p style={{ color: "#b9c3d1" }}>
                  Home AC charging stations (7.4 kW / 22 kW) installed at your
                  villa or apartment parking. Pair with solar and charge your
                  car from sunshine.
                </p>
                <Link href="/en/ev-charging-stations" className="text-gold text-decoration-none fw-bold">
                  Learn more <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Why here / numbers */}
          <div className="row g-4 mb-5 text-center">
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="text-gold fw-bold display-6">2,700+</div>
                <div style={{ color: "#cbd5e1" }}>hours of sun per year</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="text-gold fw-bold display-6">~1,500</div>
                <div style={{ color: "#cbd5e1" }}>kWh/m² annual radiation</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="text-gold fw-bold display-6">4–8</div>
                <div style={{ color: "#cbd5e1" }}>years typical payback</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <div className="text-gold fw-bold display-6">25+</div>
                <div style={{ color: "#cbd5e1" }}>years panel warranty</div>
              </div>
            </div>
          </div>

          {/* Why us */}
          <div className="row g-4 mb-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="text-white fw-bold mb-3">Why Toros Solar?</h2>
              <ul className="list-unstyled" style={{ color: "#b9c3d1" }}>
                <li className="d-flex mb-3">
                  <i className="bi bi-check2-circle text-gold me-3 fs-5"></i>
                  <span>
                    <strong className="text-white">Local, established company</strong> — based in
                    Yenişehir, Mersin. We are here for the warranty, the maintenance and
                    the next 25 years, not just the installation day.
                  </span>
                </li>
                <li className="d-flex mb-3">
                  <i className="bi bi-check2-circle text-gold me-3 fs-5"></i>
                  <span>
                    <strong className="text-white">English-speaking support</strong> — survey,
                    quote, contract and after-sales communication in English, on WhatsApp
                    or by phone.
                  </span>
                </li>
                <li className="d-flex mb-3">
                  <i className="bi bi-check2-circle text-gold me-3 fs-5"></i>
                  <span>
                    <strong className="text-white">Fixed-price, itemized quotes</strong> — you
                    see exactly what hardware you are getting (panels, inverter, battery,
                    mounting) and what it costs. No surprises.
                  </span>
                </li>
                <li className="d-flex mb-3">
                  <i className="bi bi-check2-circle text-gold me-3 fs-5"></i>
                  <span>
                    <strong className="text-white">All paperwork handled</strong> — for grid-tied
                    systems we manage the utility application and approval process for you.
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="p-4 bg-dark border-gold-thin rounded-3 shadow">
                <h5 className="text-gold fw-bold mb-3">Field-tested performance</h5>
                <p style={{ color: "#b9c3d1" }} className="mb-0">
                  Across our installations in the Mersin region, real-world output under
                  full sun stays within about 5% of rated panel specifications — the
                  Mediterranean climate here is genuinely ideal for photovoltaics. A
                  typical 5 kW system on an unshaded south-facing roof produces around
                  7,500–8,000 kWh per year.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <LandingCtaEn title="Talk to us — free survey, no obligation" />
            <p className="text-center" style={{ color: "#9aa7b8" }}>
              Toros Solar · Cumhuriyet Mah. 1653 Sk. No:3, Yenişehir / Mersin ·{" "}
              <a href="mailto:info@torossolar.com" className="text-gold text-decoration-none">
                info@torossolar.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
