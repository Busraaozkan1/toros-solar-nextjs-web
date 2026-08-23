// Anasayfa paket firsatlari icin tek veri kaynagi.
// BOM'lar Jun 2026'da kilitlendi: off-grid = off-grid inverter/charger (dahili MPPT,
// ayri sarj kontrol YOK); sebeke bagli kademeler = Deye hibrit (+ bataryasiz secenek).

export type BundleType = "off-grid" | "on-grid";

export interface Bundle {
  id: string; // anchor + wizard eslesmesi
  name: string;
  persona: string;
  power: string; // "6 kW"
  fromPrice: string; // baslangic fiyati, orn. "149.000 ₺"
  type: BundleType;
  badge?: string;
  blurb: string;
  components: string[];
  icon: string; // bootstrap icon class
  featured?: boolean;
}

export const BUNDLES: Bundle[] = [
  {
    id: "konteyner-ev",
    name: "Konteyner Ev Off-Grid Paketi",
    persona: "Şebekesiz bağ evi · konteyner ev",
    power: "5 kW",
    fromPrice: "157.500 ₺",
    type: "off-grid",
    blurb:
      "Şebeke yok mu? Sorun değil. Buzdolabı, televizyon, çamaşır makinesi ve aydınlatmayı güneşle kesintisiz çalıştırın.",
    components: [
      "5 kW off-grid inverter (dahili MPPT)",
      "6 × 610 W TOPCon panel — 3,66 kWp",
      "5 kWh LiFePO₄ batarya",
      "Anahtar teslim: nakliye + montaj dahil",
    ],
    icon: "bi-box-seam",
    featured: true,
  },
  {
    id: "ev-5kw",
    name: "6 kW Ev / Daire Paketi",
    persona: "Ev · daire · küçük çatı",
    power: "6 kW",
    fromPrice: "189.000 ₺",
    type: "on-grid",
    blurb:
      "Akıllı inverter ve bataryalı yapısıyla eviniz için üretim, depolama ve kesintilere karşı güçlü bir enerji çözümü.",
    components: [
      "10 × 610 W TOPCon panel — 6,1 kWp",
      "5 kWh batarya",
      "6,5 kW Solinved akıllı inverter",
      "Anahtar teslim: nakliye + montaj dahil",
    ],
    icon: "bi-house",
  },
  {
    id: "villa-8kw",
    name: "10 kW Müstakil Ev / Villa Paketi",
    persona: "Müstakil ev · villa",
    power: "10 kW",
    fromPrice: "395.000 ₺",
    type: "on-grid",
    blurb:
      "Daha büyük evler için. Klima, ısı pompası ve yüksek tüketime rahatça yetişir.",
    components: [
      "10 kW Deye hibrit inverter",
      "16 × 610 W TOPCon panel — 9,76 kWp",
      "10 kWh LiFePO₄ batarya",
      "Nakliye ve montaj dahil",
    ],
    icon: "bi-houses",
  },
  {
    id: "isletme-15kw",
    name: "15 kW İşletme / Tarım Paketi",
    persona: "İşletme · çiftlik · yüksek tüketim",
    power: "15 kW",
    fromPrice: "525.000 ₺",
    type: "on-grid",
    blurb:
      "İşletmeler, çiftlikler ve yüksek tüketim için trifaze güç. Tarımsal sulamaya da uygundur.",
    components: [
      "15 kW Deye trifaze hibrit inverter",
      "26 × 610 W TOPCon panel — 15,86 kWp",
      "15 kWh LiFePO₄ batarya",
      "Nakliye ve montaj dahil",
    ],
    icon: "bi-buildings",
  },
];

export function bundleById(id: string): Bundle | undefined {
  return BUNDLES.find((b) => b.id === id);
}
