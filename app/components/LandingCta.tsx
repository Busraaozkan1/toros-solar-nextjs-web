import React from "react";

export default function LandingCta({ title }: { title?: string }) {
  return (
    <div
      className="p-4 border-gold-thin rounded-3 shadow-lg text-center my-5"
      style={{
        background: "linear-gradient(165deg, rgba(15, 23, 42, 0.97), rgba(17, 24, 39, 0.95))",
      }}
    >
      <h3 className="text-gold fw-bold mb-3">{title || "Ücretsiz Keşif ve Fiyat Teklifi"}</h3>
      <p className="text-white opacity-75 mb-4">
        Çatınıza veya arazinize özel sistem tasarımı ve net fiyat için bugün bize ulaşın.
        Keşif ücretsizdir, teklifimiz size özeldir.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <a href="tel:+905367333678" className="btn btn-gold px-4 py-2">
          <i className="bi bi-telephone me-2"></i>0536 733 36 78
        </a>
        <a
          href="https://wa.me/905532772244"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-light px-4 py-2"
        >
          <i className="bi bi-whatsapp me-2"></i>WhatsApp&apos;tan Yazın
        </a>
      </div>
    </div>
  );
}
