// Urun kategorileri - tek kaynak. Admin formu, toplu ice aktarma,
// /urunler filtreleri ve kategori sayfalari hep bu listeyi kullanir.

export type ProductCategory = {
  slug: string;
  label: string;
  // SEO icin kategori sayfasi basligi ve aciklamasi
  title: string;
  description: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "gunes-panelleri",
    label: "Güneş Panelleri",
    title: "Güneş Paneli Fiyatları ve Modelleri",
    description:
      "Monokristal ve half-cut güneş panelleri. Ev, çatı ve tarımsal kurulumlar için panel fiyatları ve teknik özellikler. Mersin'den Türkiye geneline gönderim.",
  },
  {
    slug: "inverterler",
    label: "İnverterler",
    title: "İnverter Fiyatları | On-Grid, Off-Grid ve Tam Sinüs",
    description:
      "On-grid ve off-grid inverterler, tam sinüs inverterler. Şebeke bağlantılı ve bağımsız sistemler için inverter fiyatları ve modelleri.",
  },
  {
    slug: "solar-pompa-ve-suruculer",
    label: "Solar Pompa ve Sürücüler",
    title: "Solar Pompa ve Pompa Sürücü Fiyatları",
    description:
      "Tarımsal sulama için DC solar pompalar ve trifaze pompa sürücüleri. Mazotsuz sulama sistemleri için pompa fiyatları ve debi tabloları.",
  },
  {
    slug: "sarj-kontrol-cihazlari",
    label: "Şarj Kontrol Cihazları",
    title: "MPPT Şarj Kontrol Cihazı Fiyatları",
    description:
      "MPPT şarj kontrol cihazları ve regülatörler. Off-grid ve hibrit sistemler için şarj kontrolörü fiyatları.",
  },
  {
    slug: "akuler",
    label: "Aküler",
    title: "Solar Akü ve Jel Akü Fiyatları",
    description:
      "Güneş enerjisi sistemleri için jel ve lityum aküler. Derin deşarj akü fiyatları ve kapasite seçenekleri.",
  },
  {
    slug: "hazir-solar-paketler",
    label: "Hazır Solar Paketler",
    title: "Hazır Solar Paket Fiyatları | Tak-Çalıştır Sistemler",
    description:
      "Bağ evi, yayla evi ve karavan için hazır güneş enerjisi paketleri. Panel + inverter + akü dahil komple sistem fiyatları.",
  },
  {
    slug: "ev-sarj-istasyonlari",
    label: "EV Şarj İstasyonları",
    title: "Elektrikli Araç Şarj İstasyonu Fiyatları",
    description:
      "Ev ve işyeri için AC elektrikli araç şarj istasyonları. 7.4 kW ve 22 kW şarj cihazı fiyatları, kurulum dahil seçenekler.",
  },
  {
    slug: "solar-aydinlatma-ve-kamera",
    label: "Solar Aydınlatma ve Kamera",
    title: "Güneş Enerjili Sokak Aydınlatması ve Kamera Fiyatları",
    description:
      "Solar sokak aydınlatmaları ve güneş enerjili PTZ güvenlik kameraları. Elektrik altyapısı gerektirmeyen aydınlatma ve izleme çözümleri.",
  },
  {
    slug: "aksesuar-ve-montaj",
    label: "Aksesuar ve Montaj",
    title: "Solar Kablo, Konnektör ve Montaj Malzemeleri",
    description:
      "Solar kablolar, MC4 konnektörler, sigortalar ve çatı montaj konstrüksiyon malzemeleri.",
  },
];

export const CATEGORY_LABELS: string[] = PRODUCT_CATEGORIES.map((c) => c.label);

export function categoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByLabel(label: string): ProductCategory | undefined {
  const norm = (s: string) => s.trim().toLocaleLowerCase("tr-TR");
  return PRODUCT_CATEGORIES.find((c) => norm(c.label) === norm(label));
}
