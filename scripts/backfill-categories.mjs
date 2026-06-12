// Tek seferlik: mevcut urunlere isimden kategori atar.
// Calistirma: repo klasorunde `node scripts/backfill-categories.mjs`
// (.env dosyasinda DATABASE_URL olmali)

import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

// .env'i elle yukle (ek paket gerektirmemek icin)
try {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  // .env yoksa ortam degiskenlerinden devam et
}

const prisma = new PrismaClient();

function norm(s) {
  return s
    .toLowerCase()
    .replaceAll("ı", "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function categorize(name) {
  const n = norm(name);
  if (n.includes("panel") && n.includes("gunes")) return "Güneş Panelleri";
  if (n.includes("pompa")) return "Solar Pompa ve Sürücüler";
  if (n.includes("sarj kontrol") || n.includes("pwm")) return "Şarj Kontrol Cihazları";
  if (n.includes("aku") || n.includes("batarya") || n.includes("battery") || n.includes("lityum")) return "Aküler";
  if (n.includes("invert") || n.includes("sinus")) return "İnverterler";
  if (n.includes("aydinlatma") || n.includes("kamera")) return "Solar Aydınlatma ve Kamera";
  if (
    n.includes("salter") || n.includes("konstruksiyon") || n.includes("sehpa") ||
    n.includes("diyot") || n.includes("kablo") || n.includes("sayac") ||
    n.includes("pano") || n.includes("router") || n.includes("power manager") ||
    n.includes("epm") || n.includes("konnektor") || n.includes("mc4") || n.includes("sigorta")
  ) return "Aksesuar ve Montaj";
  if (n.includes("sarj istasyonu") || n.includes("ev sarj")) return "EV Şarj İstasyonları";
  if (n.includes("paket")) return "Hazır Solar Paketler";
  return null;
}

const products = await prisma.product.findMany({
  select: { id: true, name: true, category: true },
});

let updated = 0;
const skipped = [];

for (const p of products) {
  if (p.category) continue; // elle atanmislari ezme
  const cat = categorize(p.name);
  if (!cat) {
    skipped.push(`#${p.id} ${p.name}`);
    continue;
  }
  await prisma.product.update({ where: { id: p.id }, data: { category: cat } });
  updated++;
}

console.log(`Guncellenen: ${updated} / ${products.length}`);
if (skipped.length) {
  console.log("Kategori atanamayanlar (admin panelden elle secin):");
  for (const s of skipped) console.log("  - " + s);
}

await prisma.$disconnect();
