"use client";

import { useEffect } from "react";

// Google Ads tiklama donusumleri: tel: ve wa.me linkleri
// Tek global listener — mevcut ve gelecekteki tum linkleri kapsar.
const PHONE_LABEL = "AW-18228056020/rEiCCP6u0b0cENSf6PND";
const WHATSAPP_LABEL = "AW-18228056020/IAOhCIGv0b0cENSf6PND";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || typeof window.gtag !== "function") return;

      const href = link.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        window.gtag("event", "conversion", { send_to: PHONE_LABEL });
      } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        window.gtag("event", "conversion", { send_to: WHATSAPP_LABEL });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
