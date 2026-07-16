// Anasayfa paket firsatlari + Solar Ihtiyac Sihirbazi icin tek veri kaynagi.
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

// --- Solar Ihtiyac Sihirbazi -------------------------------------------------

// Ortalama GUNLUK tuketim (kWh) — cihaz basina (sabit; saat sormuyoruz).
export interface Appliance {
  key: string;
  label: string;
  kwh: number;
  icon: string;
}

export const APPLIANCES: Appliance[] = [
  { key: "buzdolabi", label: "Buzdolabı / dondurucu", kwh: 1.4, icon: "bi-thermometer-snow" },
  { key: "klima", label: "Klima (1 ünite)", kwh: 3.5, icon: "bi-wind" },
  { key: "tv", label: "Televizyon", kwh: 0.4, icon: "bi-tv" },
  { key: "camasir", label: "Çamaşır makinesi", kwh: 1.0, icon: "bi-bucket" },
  { key: "bulasik", label: "Bulaşık makinesi", kwh: 1.1, icon: "bi-droplet" },
  { key: "isitici", label: "Elektrikli ısıtıcı / şofben", kwh: 3.0, icon: "bi-fire" },
  { key: "aydinlatma", label: "Aydınlatma (ev geneli)", kwh: 0.6, icon: "bi-lightbulb" },
  { key: "ofis", label: "Bilgisayar / ofis", kwh: 0.5, icon: "bi-laptop" },
];

// Mersin/Adana icin ~ uretim faktoru: 1 kWp ≈ 4,4 kWh/gun (kayiplar dahil).
const KWH_PER_KWP_DAY = 4.4;

export interface Recommendation {
  bundleId: string;
  dailyKwh: number;
  suggestedKwp: number;
}

export function recommendByDailyKwh(dailyKwh: number): Recommendation {
  const suggestedKwp = dailyKwh / KWH_PER_KWP_DAY;
  let bundleId = "ev-5kw";
  if (suggestedKwp > 10) bundleId = "isletme-15kw";
  else if (suggestedKwp > 6) bundleId = "villa-8kw";
  return { bundleId, dailyKwh: round1(dailyKwh), suggestedKwp: round1(suggestedKwp) };
}

export function recommendByMonthlyKwh(monthlyKwh: number): Recommendation {
  return recommendByDailyKwh(monthlyKwh / 30);
}

// Tarimsal pompa: HP -> onerilen panel sayisi (610W) ve dizi gucu.
export interface PumpRecommendation {
  hp: number;
  kw: number;
  suggestedKwp: number;
  panelCount: number;
}

export function recommendByPumpHp(hp: number): PumpRecommendation {
  const kw = hp * 0.746;
  const suggestedKwp = kw / 0.8; // pompa surekli calissin diye dizi biraz buyuk
  const panelCount = Math.max(2, Math.ceil(suggestedKwp / 0.61));
  return { hp, kw: round1(kw), suggestedKwp: round1(suggestedKwp), panelCount };
}

function round1(x: number): number {
  return Math.round(x * 10) / 10;
}
