// Solar Ihtiyac Sihirbazi: hesaplanan ihtiyaca gore CANLI katalogdan gercek
// urunler secer (panel × N + en yakin hibrit inverter + en yakin batarya;
// pompa icin en yakin pompa + panel). Sabit pakete yonlendirmek yerine urun listesi uretir.

import { parseKw, parseHp } from "./productFacets";

export interface WizProduct {
  id: number;
  name: string;
  priceText?: string | null;
  price?: number | null;
  category?: string | null;
  description?: string | null;
}

export interface SystemItem {
  id: number;
  qty: number;
  name: string;
  href: string;
}

export interface SystemResult {
  dailyKwh: number;
  suggestedKwp: number;
  items: SystemItem[];
}

export interface PumpResult {
  hp: number;
  kw: number;
  panelCount: number;
  items: SystemItem[];
}

const KWH_PER_KWP_DAY = 4.4; // Mersin/Adana, kayiplar dahil
const round1 = (x: number) => Math.round(x * 10) / 10;
const low = (s: string) => (s || "").toLocaleLowerCase("tr-TR").replace(/̇/g, "");

// --- spec cikaricilar --------------------------------------------------------

export function parsePanelW(p: WizProduct): number | null {
  const m = low(p.name).match(/(\d{2,4})\s*wp?\b/);
  return m ? parseInt(m[1], 10) : null;
}

export function parseBatteryKwh(p: WizProduct): number | null {
  const s = low(`${p.name} ${p.description || ""}`);
  const m = s.match(/(\d+(?:[.,]\d+)?)\s*kwh/);
  if (m) return parseFloat(m[1].replace(",", "."));
  const v = s.match(/(\d+(?:[.,]\d+)?)\s*v\b/);
  const a = s.match(/(\d+(?:[.,]\d+)?)\s*ah/);
  if (v && a) return (parseFloat(v[1].replace(",", ".")) * parseFloat(a[1].replace(",", "."))) / 1000;
  return null;
}

// --- kategori/isim tespiti ---------------------------------------------------

const isCat = (p: WizProduct, label: string) => (p.category || "") === label;
const looksPanel = (p: WizProduct) => isCat(p, "Güneş Panelleri") || /panel/.test(low(p.name));
const looksInverter = (p: WizProduct) =>
  isCat(p, "İnverterler") || /invert|inverter|invert[öo]r/.test(low(p.name));
const looksBattery = (p: WizProduct) =>
  isCat(p, "Aküler") || /\baku\b|akü|batarya|lifepo|lityum/.test(low(p.name));
const looksPump = (p: WizProduct) => isCat(p, "Solar Pompa ve Sürücüler") || /pompa/.test(low(p.name));

// --- secim yardimcilari ------------------------------------------------------

function pickClosest(
  list: WizProduct[],
  getVal: (p: WizProduct) => number | null,
  target: number,
  prefer?: string
): WizProduct | null {
  const scored = list
    .map((p) => ({ p, v: getVal(p) }))
    .filter((x): x is { p: WizProduct; v: number } => x.v != null);
  if (!scored.length) return null;
  scored.sort((a, b) => {
    const da = Math.abs(a.v - target);
    const db = Math.abs(b.v - target);
    if (Math.abs(da - db) > 0.05) return da - db;
    const pa = prefer && low(a.p.name).includes(prefer) ? 0 : 1;
    const pb = prefer && low(b.p.name).includes(prefer) ? 0 : 1;
    if (pa !== pb) return pa - pb;
    return inStock(b.p) - inStock(a.p);
  });
  return scored[0].p;
}

const inStock = (p: WizProduct) => (p.priceText && String(p.priceText).trim() ? 1 : 0);

function bestPanel(products: WizProduct[]): WizProduct | null {
  const cand = products
    .filter(looksPanel)
    .map((p) => ({ p, w: parsePanelW(p) }))
    .filter((x): x is { p: WizProduct; w: number } => x.w != null && x.w >= 450 && x.w <= 700);
  if (!cand.length) return null;
  // en yuksek guc; esitlikte stokta olan
  cand.sort((a, b) => b.w - a.w || inStock(b.p) - inStock(a.p));
  return cand[0].p;
}

const item = (p: WizProduct, qty: number): SystemItem => ({
  id: p.id,
  qty,
  name: p.name,
  href: `/urunler/${p.id}`,
});

// --- ev sistemleri (cihaz / fatura) ------------------------------------------

export function buildSystemByDailyKwh(products: WizProduct[], dailyKwh: number): SystemResult {
  const suggestedKwp = dailyKwh / KWH_PER_KWP_DAY;
  const targetInvKw = Math.max(3, suggestedKwp / 1.15);
  const targetKwh = dailyKwh < 18 ? 5 : dailyKwh < 32 ? 10 : 15;

  const items: SystemItem[] = [];
  const panel = bestPanel(products);
  if (panel) {
    const w = parsePanelW(panel) || 610;
    const count = Math.max(2, Math.round(suggestedKwp / (w / 1000)));
    items.push(item(panel, count));
  }
  const inverters = products.filter(looksInverter);
  const hybrids = inverters.filter((p) => /hibrit|hybrid/.test(low(p.name)));
  const inverter = pickClosest(hybrids.length ? hybrids : inverters, parseKw, targetInvKw, "deye");
  if (inverter) items.push(item(inverter, 1));

  const battery = pickClosest(products.filter(looksBattery), parseBatteryKwh, targetKwh, "lifepo");
  if (battery) items.push(item(battery, 1));

  return { dailyKwh: round1(dailyKwh), suggestedKwp: round1(suggestedKwp), items };
}

export function buildSystemByMonthlyKwh(products: WizProduct[], monthlyKwh: number): SystemResult {
  return buildSystemByDailyKwh(products, monthlyKwh / 30);
}

// --- tarimsal pompa ----------------------------------------------------------

export function buildPumpSystem(products: WizProduct[], hp: number): PumpResult {
  const kw = hp * 0.746;
  const panelCount = Math.max(2, Math.ceil(kw / 0.8 / 0.61));
  const items: SystemItem[] = [];
  const pump = pickClosest(products.filter(looksPump), parseHp, hp);
  if (pump) items.push(item(pump, 1));
  const panel = bestPanel(products);
  if (panel) items.push(item(panel, panelCount));
  return { hp, kw: round1(kw), panelCount, items };
}
