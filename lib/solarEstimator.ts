// Conservative first-pass sizing for the public Solar Ihtiyac Sihirbazi.
// The estimates deliberately avoid choosing products. Final sizing still requires
// the real usage profile, roof/field conditions, shading, wiring and site survey.

export type PumpPhase = "monofaze" | "trifaze";

export interface Appliance {
  key: string;
  label: string;
  powerKw: number;
  dailyKwh: number;
  icon: string;
}

export interface EnergyEstimate {
  dailyKwh: number;
  panelCount: number;
}

export interface ApplianceEstimate extends EnergyEstimate {
  loadKw: number;
}

export interface PumpEstimate extends EnergyEstimate {
  hp: number;
  operatingHours: number;
  electricalKw: number;
}

// Typical operating power and typical daily energy. Power is kept separate from
// energy so the UI never presents kWh/day as though it were an instantaneous load.
export const APPLIANCES: Appliance[] = [
  {
    key: "buzdolabi",
    label: "Buzdolabı / dondurucu",
    powerKw: 0.3,
    dailyKwh: 1.5,
    icon: "bi-thermometer-snow",
  },
  { key: "klima", label: "Klima (1 ünite)", powerKw: 1.5, dailyKwh: 6.0, icon: "bi-wind" },
  { key: "tv", label: "Televizyon", powerKw: 0.15, dailyKwh: 0.6, icon: "bi-tv" },
  { key: "camasir", label: "Çamaşır makinesi", powerKw: 2.2, dailyKwh: 1.2, icon: "bi-bucket" },
  { key: "bulasik", label: "Bulaşık makinesi", powerKw: 2.0, dailyKwh: 1.5, icon: "bi-droplet" },
  { key: "isitici", label: "Elektrikli ısıtıcı", powerKw: 2.5, dailyKwh: 5.0, icon: "bi-fire" },
  { key: "sofben", label: "Elektrikli şofben", powerKw: 3.5, dailyKwh: 3.5, icon: "bi-water" },
  { key: "aydinlatma", label: "Aydınlatma (ev geneli)", powerKw: 0.5, dailyKwh: 2.0, icon: "bi-lightbulb" },
  { key: "bilgisayar", label: "Bilgisayar / ofis", powerKw: 0.4, dailyKwh: 2.4, icon: "bi-laptop" },
];

// Conservative summer production basis for Mersin/Adana. This stays below the
// verified regional summer averages. The panel rating is intentionally an
// internal sizing input and is never included in public output.
const SUMMER_KWH_PER_KWP_DAY = 5.0;
const PANEL_RATED_KW = 0.6;
const DAILY_KWH_PER_PANEL = SUMMER_KWH_PER_KWP_DAY * PANEL_RATED_KW;
const DAYS_PER_YEAR = 365.25;
const MONTHS_PER_YEAR = 12;
const PUMP_MOTOR_EFFICIENCY = 0.8;
const PUMP_ARRAY_HEADROOM = 1.25;

const round1 = (value: number) => Math.round(value * 10) / 10;

export function estimatePanelCount(dailyKwh: number): number {
  if (!Number.isFinite(dailyKwh) || dailyKwh <= 0) return 0;
  const exactCount = dailyKwh / DAILY_KWH_PER_PANEL;
  return Math.ceil(exactCount - Number.EPSILON * 10);
}

export function selectedApplianceLabels(counts: Record<string, number>): string[] {
  return APPLIANCES.flatMap((appliance) => {
    const quantity = Math.max(0, Math.floor(counts[appliance.key] || 0));
    return quantity > 0 ? [`${quantity}× ${appliance.label}`] : [];
  });
}

export function estimateApplianceNeeds(counts: Record<string, number>): ApplianceEstimate {
  const totals = APPLIANCES.reduce(
    (sum, appliance) => {
      const quantity = Math.max(0, Math.floor(counts[appliance.key] || 0));
      sum.loadKw += quantity * appliance.powerKw;
      sum.dailyKwh += quantity * appliance.dailyKwh;
      return sum;
    },
    { loadKw: 0, dailyKwh: 0 }
  );

  return {
    loadKw: round1(totals.loadKw),
    dailyKwh: round1(totals.dailyKwh),
    panelCount: estimatePanelCount(totals.dailyKwh),
  };
}

export function estimateMonthlyNeeds(monthlyKwh: number): EnergyEstimate {
  const safeMonthlyKwh = Number.isFinite(monthlyKwh) ? Math.max(0, monthlyKwh) : 0;
  const dailyKwh = (safeMonthlyKwh * MONTHS_PER_YEAR) / DAYS_PER_YEAR;
  return { dailyKwh: round1(dailyKwh), panelCount: estimatePanelCount(dailyKwh) };
}

export function estimatePumpNeeds(hp: number, operatingHours: number): PumpEstimate {
  const safeHp = Number.isFinite(hp) ? Math.max(0, hp) : 0;
  const safeHours = Number.isFinite(operatingHours) ? Math.min(24, Math.max(0, operatingHours)) : 0;
  const electricalKw = (safeHp * 0.746) / PUMP_MOTOR_EFFICIENCY;
  const dailyKwh = electricalKw * safeHours;
  const energyPanelCount = estimatePanelCount(dailyKwh);
  const powerPanelCount = Math.ceil((electricalKw * PUMP_ARRAY_HEADROOM) / PANEL_RATED_KW);

  return {
    hp: safeHp,
    operatingHours: safeHours,
    electricalKw: round1(electricalKw),
    dailyKwh: round1(dailyKwh),
    panelCount: Math.max(energyPanelCount, powerPanelCount),
  };
}

export function buildApplianceQuoteMessage(counts: Record<string, number>): string {
  const devices = selectedApplianceLabels(counts).map((label) => `- ${label}`).join("\n");
  return [
    "Merhaba, aşağıdaki cihazlar için güneş enerjisi sistemi teklifi almak istiyorum:",
    devices,
    "",
    "Uygun sistem ve fiyat bilgisi için benimle iletişime geçebilir misiniz?",
  ].join("\n");
}

export function buildBillQuoteMessage(monthlyKwh: number): string {
  return [
    `Merhaba, son 12 aylık faturalarıma göre aylık ortalama elektrik tüketimim yaklaşık ${monthlyKwh} kWh.`,
    "Bu tüketime uygun güneş enerjisi sistemi için teklif almak istiyorum.",
    "Uygun sistem ve fiyat bilgisi için benimle iletişime geçebilir misiniz?",
  ].join("\n");
}

export function buildPumpQuoteMessage(hp: number, operatingHours: number, phase: PumpPhase): string {
  const phaseLabel = phase === "trifaze" ? "trifaze" : "monofaze";
  return [
    `Merhaba, ${hp} HP ${phaseLabel} tarımsal sulama pompamı yaklaşık ${operatingHours} saat/gün çalıştırmak istiyorum.`,
    "Bu pompaya uygun güneş enerjisi sistemi için teklif almak istiyorum.",
    "Uygun sistem ve fiyat bilgisi için benimle iletişime geçebilir misiniz?",
  ].join("\n");
}
