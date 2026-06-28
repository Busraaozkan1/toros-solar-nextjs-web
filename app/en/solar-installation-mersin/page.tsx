import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCtaEn from "../../components/LandingCtaEn";

export const metadata: Metadata = {
  title: "Solar Panel Installation in Mersin | Cost, Payback & Process",
  description:
    "Rooftop solar installation for homes and villas in Mersin, Turkey. What it costs, how long payback takes, and how the process works — explained in English. Free site survey.",
  alternates: {
    canonical: "/en/solar-installation-mersin",
    languages: { tr: "/gunes-paneli-mersin", en: "/en/solar-installation-mersin" },
  },
};

export default function SolarInstallationEnPage() {
  return (
    <section
      className="section-padding"
      style={{
        minHeight: "100vh",
        paddingTop: "110px",
      }}
    >
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 className="text-white fw-bold mb-4">
          Solar Panel Installation in <span className="text-gold">Mersin</span>
        </h1>

        <p style={{ color: "#cbd5e1", fontSize: "1.05rem" }}>
          If you own a home or villa on the Mersin coast, you live in one of the best
          places in Europe and the Mediterranean to produce your own electricity. This
          page explains, in plain English, what a rooftop system involves, what it
          costs, and what you can realistically expect back.
        </p>

        <h2 className="text-gold fw-bold mt-5 mb-3">The bottom line first</h2>
        <p style={{ color: "#b9c3d1" }}>
          A typical detached house here runs comfortably on a <strong className="text-white">5 kW
          system</strong> (10–12 panels). On an unshaded, south-facing roof it produces
          around <strong className="text-white">7,500–8,000 kWh per year</strong> — usually more
          than the house consumes. Depending on your consumption profile and system size,
          the investment pays for itself in roughly <strong className="text-white">4 to 8
          years</strong>. Panels carry 25+ year performance warranties, so everything after
          payback is savings.
        </p>

        <h2 className="text-gold fw-bold mt-5 mb-3">Grid-tied or off-grid?</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="h-100 p-4 bg-dark border-gold-thin rounded-3">
              <h5 className="text-white fw-bold">Grid-tied (most homes)</h5>
              <p style={{ color: "#b9c3d1" }} className="mb-0">
                Your roof feeds the grid; the utility nets production against your
                consumption on your bill. Requires a utility application and approval —
                which we prepare and follow up for you. No batteries needed, lowest
                cost per kW.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-4 bg-dark border-gold-thin rounded-3">
              <h5 className="text-white fw-bold">Off-grid / hybrid</h5>
              <p style={{ color: "#b9c3d1" }} className="mb-0">
                Panels plus lithium batteries for properties without a grid connection,
                or homeowners who want backup through power cuts. No permits or
                paperwork at all — we can usually install within days.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-gold fw-bold mt-5 mb-3">How the process works</h2>
        <ol style={{ color: "#b9c3d1" }} className="lh-lg">
          <li>
            <strong className="text-white">Free site survey</strong> — we visit, measure your roof,
            check shading and look at your electricity bills.
          </li>
          <li>
            <strong className="text-white">Design & fixed quote</strong> — an itemized offer listing
            every component by brand and model, with a single fixed price.
          </li>
          <li>
            <strong className="text-white">Paperwork</strong> — for grid-tied systems we submit and
            track the utility application on your behalf.
          </li>
          <li>
            <strong className="text-white">Installation</strong> — typically 1–3 days on site for a
            residential system.
          </li>
          <li>
            <strong className="text-white">Handover & support</strong> — monitoring app set up on
            your phone, warranty documents in hand, and we stay reachable in English.
          </li>
        </ol>

        <h2 className="text-gold fw-bold mt-5 mb-3">Where we work</h2>
        <p style={{ color: "#b9c3d1" }}>
          We install throughout the Mersin province — Yenişehir, Mezitli, Erdemli,
          Silifke, Tarsus and the surrounding coast — and serve the wider region from
          our base in Mersin. If you&apos;re slightly outside this area, ask anyway; for
          hardware-only purchases we ship Turkey-wide.
        </p>

        <LandingCtaEn title="Get your free survey and fixed-price quote" />

        <p className="text-center">
          <Link href="/en" className="text-gold text-decoration-none">
            ← Back to English home
          </Link>
        </p>
      </div>
    </section>
  );
}
