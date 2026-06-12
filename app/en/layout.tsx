"use client";

import React, { useEffect } from "react";

// Root layout <html lang="tr"> oldugu icin /en altinda dili client tarafinda duzeltiyoruz
export default function EnLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    return () => {
      document.documentElement.lang = "tr";
    };
  }, []);

  return <>{children}</>;
}
