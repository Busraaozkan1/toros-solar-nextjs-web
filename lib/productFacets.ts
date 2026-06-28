// Kategori bazli hizli filtre "cip"leri.
// Urun adi + aciklamasindan guc/voltaj/tip cikarir ve /urunler sayfasinda
// SADECE 20'den fazla urunu olan kategorilerde tap-ile-filtrele cipleri uretir.
// Hicbir manuel etiketleme gerektirmez; mevcut katalog verisinden okur.

export interface FacetProduct {
  name: string;
  description?: string | null;
  category?: string | null;
}

export interface FacetBucket {
  key: string; // dahili kimlik (state'te tutulur)
  label: string; // cip uzerindeki yazi
  test: (p: FacetProduct) => boolean;
}

export interface CategoryFacet {
  label: string; // cip grubu basligi (orn. "Güç (kW)")
  buckets: FacetBucket[];
}

// Turkce "İ" kucultmede combining dot (U+0307) birakabilir -> temizle ki
// "inverter" gibi anahtarlar "İnverter"de de eslessin.
const low = (s: string) =>
  (s || "").toLocaleLowerCase("tr-TR").replace(/̇/g, "");

const hay = (p: FacetProduct) => low(`${p.name || ""} ${p.description || ""}`);

// --- Sayisal cikaricilar --------------------------------------------------

// "5 kw", "5kw", "5,5 kw"; "kwh" (batarya) ile karismaz. kVA ye geri duser.
export function parseKw(p: FacetProduct): number | null {
  const s = hay(p);
  const m =
    s.match(/(\d+(?:[.,]\d+)?)\s*kw(?!h)/) ||
    s.match(/(\d+(?:[.,]\d+)?)\s*kva/);
  return m ? parseFloat(m[1].replace(",", ".")) : null;
}

// Pompa HP'si. Surucu (VFD) urunleri cogu zaman kW ile etiketli; HP yoksa
// kW'yi HP esdegerine cevirir (~1.341) ki pompa + surucu tek HP ekseninde
// filtrelenebilsin (ciftci HP ile dusunur).
export function parseHp(p: FacetProduct): number | null {
  const s = hay(p);
  const m = s.match(/(\d+(?:[.,]\d+)?)\s*hp/);
  if (m) return parseFloat(m[1].replace(",", "."));
  const kw = parseKw(p);
  if (kw != null) return kw * 1.341; // surucu (VFD) kW -> HP
  // DC pompa gucu adda "1500 Watt" olarak gecer; aciklamadaki panel/baska
  // watt degerlerini yakalamamak icin SADECE urun adina bak.
  const w = low(p.name || "").match(/(\d+(?:[.,]\d+)?)\s*watt/);
  if (w) return parseFloat(w[1].replace(",", ".")) / 745.7;
  return null;
}

// 12 / 24 / 48 V sinifi (LFP nominalleri 12.8 / 25.6 / 51.2 dahil)
export function parseVoltClass(p: FacetProduct): 12 | 24 | 48 | null {
  const s = hay(p);
  if (/51[.,]2|\b48\s*v/.test(s)) return 48;
  if (/25[.,]6|\b24\s*v/.test(s)) return 24;
  if (/12[.,]8|\b12\s*v/.test(s)) return 12;
  return null;
}

// Siralama icin TL fiyatini sayiya cevir. price (sayi) varsa onu, yoksa
// priceText icindeki ilk sayiyi (TR formati: nokta=binlik, virgul=ondalik)
// kullanir. Fiyatsiz urunler Infinity -> her zaman en sona.
export function parsePriceTRY(p: {
  price?: number | null;
  priceText?: string | null;
}): number {
  if (typeof p.price === "number" && p.price > 0) return p.price;
  const t = p.priceText || "";
  const m = t.match(/\d[\d.,]*/);
  if (!m) return Number.POSITIVE_INFINITY;
  let s = m[0];
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", "."); // 13.138,12 -> 13138.12
  } else {
    s = s.replace(/\.(?=\d{3}(\D|$))/g, ""); // 16.500 -> 16500
  }
  const n = parseFloat(s);
  return Number.isNaN(n) ? Number.POSITIVE_INFINITY : n;
}

// --- Bucket yardimcilari --------------------------------------------------

const kwIn = (lo: number, hi: number) => (p: FacetProduct) => {
  const v = parseKw(p);
  return v != null && v > lo && v <= hi;
};
const hpIn = (lo: number, hi: number) => (p: FacetProduct) => {
  const v = parseHp(p);
  return v != null && v > lo && v <= hi;
};
// Aksesuar urununu TEK bir ture atar (oncelik sirali) -> cip sayilari net olur.
function accessoryType(p: FacetProduct): string {
  const s = hay(p);
  if (/kablo/.test(s)) return "kablo";
  if (/konnekt|mc4/.test(s)) return "konnektor";
  if (/montaj|konstr|ray|profil|tutucu|kelep|sonland/.test(s)) return "montaj";
  if (/sigorta|koruma|breaker|spd|parafudr/.test(s)) return "sigorta";
  return "diger";
}

// --- Kategori -> cip tanimlari --------------------------------------------
// Anahtarlar lib/categories.ts'teki label'larla BIREBIR eslesmeli.
// Bucket sinirlari gercek katalog dagilimina gore secildi (bos cip olmaz;
// 0 sayili cipler UI'da zaten gizlenir).

export const CATEGORY_FACETS: Record<string, CategoryFacet> = {
  İnverterler: {
    label: "Güç (kW)",
    buckets: [
      {
        key: "kw-5",
        label: "5 kW ve altı",
        test: (p) => {
          const v = parseKw(p);
          return v != null && v <= 5;
        },
      },
      { key: "kw-10", label: "6–10 kW", test: kwIn(5, 10) },
      { key: "kw-15", label: "11–15 kW", test: kwIn(10, 15) },
      { key: "kw-20", label: "16–20 kW", test: kwIn(15, 20) },
      {
        key: "kw-20p",
        label: "20 kW+",
        test: (p) => {
          const v = parseKw(p);
          return v != null && v > 20;
        },
      },
    ],
  },
  "Solar Pompa ve Sürücüler": {
    label: "Güç (HP)",
    buckets: [
      {
        key: "hp-3",
        label: "3 HP ve altı",
        test: (p) => {
          const v = parseHp(p);
          return v != null && v <= 3;
        },
      },
      { key: "hp-10", label: "5–10 HP", test: hpIn(3, 10) },
      { key: "hp-50", label: "15–50 HP", test: hpIn(10, 50) },
      {
        key: "hp-50p",
        label: "50 HP+",
        test: (p) => {
          const v = parseHp(p);
          return v != null && v > 50;
        },
      },
    ],
  },
  Aküler: {
    label: "Voltaj",
    buckets: [
      { key: "v12", label: "12V", test: (p) => parseVoltClass(p) === 12 },
      { key: "v24", label: "24V", test: (p) => parseVoltClass(p) === 24 },
      { key: "v48", label: "48V", test: (p) => parseVoltClass(p) === 48 },
    ],
  },
  "Aksesuar ve Montaj": {
    label: "Tür",
    buckets: [
      { key: "kablo", label: "Kablo", test: (p) => accessoryType(p) === "kablo" },
      { key: "konnektor", label: "Konnektör", test: (p) => accessoryType(p) === "konnektor" },
      { key: "montaj", label: "Montaj", test: (p) => accessoryType(p) === "montaj" },
      { key: "sigorta", label: "Sigorta", test: (p) => accessoryType(p) === "sigorta" },
    ],
  },
};

export function getCategoryFacet(
  category?: string | null
): CategoryFacet | null {
  if (!category) return null;
  return CATEGORY_FACETS[category] || null;
}
