import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LandingCtaEn from "../../components/LandingCtaEn";

export const metadata: Metadata = {
  title: "Home EV Charging Station Installation in Mersin",
  description:
    "AC home charging stations (7.4 kW / 22 kW) for electric cars in Mersin, Turkey. Turnkey installation or hardware-only. Combine with rooftop solar and charge from sunshine.",
  alternates: {
    canonical: "/en/ev-charging-stations",
    languages: { tr: "/ev-sarj-istasyonu", en: "/en/ev-charging-stations" },
  },
};

export default function EvChargingEnPage() {
  return (
    <section
      className="section-padding"
      style={{
        minHeight: "100vh",
        paddingTop: "110px",
        background: "linear-gradient(180deg, #2f3a4c 0%, #41536b 58%, #556d8a 100%)",
      }}
    >
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 className="text-white fw-bold mb-4">
          Home EV Charging in <span className="text-gold">Mersin</span>
        </h1>

        <p style={{ color: "#cbd5e1", fontSize: "1.05rem" }}>
          Charging at home is by far the cheapest and most convenient way to run an
          electric car in Turkey. We install AC wallbox chargers at villas, houses and
          apartment parking spaces across Mersin — as a turnkey service or hardware-only
          if you have your own electrician.
        </p>

        <h2 className="text-gold fw-bold mt-5 mb-3">What 100 km costs</h2>
        <div className="table-responsive">
          <table className="table table-dark table-bordered align-middle">
            <thead>
              <tr className="text-gold">
                <th>How you charge</th>
                <th>Approx. cost per 100 km</th>
              </tr>
            </thead>
            <tbody style={{ color: "#cbd5e1" }}>
              <tr><td>Petrol car (for comparison)</td><td>₺400+</td></tr>
              <tr><td>Public DC fast charger</td><td>~₺220</td></tr>
              <tr><td>Public AC charger</td><td>~₺150</td></tr>
              <tr><td><strong className="text-white">Home wallbox (night tariff)</strong></td><td><strong className="text-white">₺45–65</strong></td></tr>
              <tr><td><strong className="text-white">Home wallbox + rooftop solar</strong></td><td><strong className="text-white">~₺0</strong></td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-gold fw-bold mt-5 mb-3">What we install</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="h-100 p-4 bg-dark border-gold-thin rounded-3">
              <h5 className="text-white fw-bold">7.4 kW — single phase</h5>
              <p style={{ color: "#b9c3d1" }} className="mb-0">
                The right choice for most homes. Adds roughly 40–50 km of range per
                hour; a typical EV fully charges overnight. Works with standard
                single-phase home connections.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-4 bg-dark border-gold-thin rounded-3">
              <h5 className="text-white fw-bold">22 kW — three phase</h5>
              <p style={{ color: "#b9c3d1" }} className="mb-0">
                For homes with a three-phase connection and EVs that support 11–22 kW
                AC charging. Full charge in a few hours — ideal if you drive a lot or
                share the charger.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-gold fw-bold mt-5 mb-3">Good to know</h2>
        <ul style={{ color: "#b9c3d1" }} className="lh-lg">
          <li>OCPP-compatible smart chargers — schedule charging for cheap night tariff hours from your phone.</li>
          <li>We check your home&apos;s connection capacity during the free survey and tell you honestly which option fits.</li>
          <li>Combined with a rooftop solar system, your driving becomes effectively free — we design both together.</li>
          <li>Apartment dwellers: installation in shared parking requires building management consent; we can help you present the case.</li>
        </ul>

        <LandingCtaEn title="Free survey for your home charger" />

        <p className="text-center">
          <Link href="/en" className="text-gold text-decoration-none">
            ← Back to English home
          </Link>
        </p>
      </div>
    </section>
  );
}
