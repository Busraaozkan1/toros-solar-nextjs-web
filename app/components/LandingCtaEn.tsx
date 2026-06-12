import React from "react";

export default function LandingCtaEn({ title }: { title?: string }) {
  return (
    <div
      className="p-4 border-gold-thin rounded-3 shadow-lg text-center my-5"
      style={{
        background: "linear-gradient(165deg, rgba(15, 23, 42, 0.97), rgba(17, 24, 39, 0.95))",
      }}
    >
      <h3 className="text-gold fw-bold mb-3">{title || "Free Site Survey & Quote"}</h3>
      <p className="text-white opacity-75 mb-4">
        Get a system design and a clear, fixed price for your home or land.
        The survey is free, and we&apos;re happy to assist you in English.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <a href="tel:+905367333678" className="btn btn-gold px-4 py-2">
          <i className="bi bi-telephone me-2"></i>+90 536 733 36 78
        </a>
        <a
          href="https://wa.me/905367333678"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-light px-4 py-2"
        >
          <i className="bi bi-whatsapp me-2"></i>Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}
