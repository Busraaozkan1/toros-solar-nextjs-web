# Toros Solar Next

Bu proje Next.js App Router, Prisma ve JWT tabanli yonetim/giris akislarini kullanir.

## Gelistirme

1. Bagimliliklari kurun:

```bash
npm install
```

2. Ortam degiskenlerini hazirlayin:

```bash
copy .env.example .env.local
```

3. Uygulamayi calistirin:

```bash
npm run dev
```

## Deploy Sonrasi Veri Kaybi Olmamasi Icin

Kalicilik iki farkli yerde gerekiyor:

1. Veritabani kayitlari
2. Yonetim panelinden yuklenen gorseller

Lokal SQLite ve `public/img` klasoru yeniden deploy edilen ortamlarda kalici degildir. Uretimde onerilen yapi:

1. Prisma + PostgreSQL
2. Cloudinary gorsel depolama

### Gorsel Depolama

Uygulama artik su sekilde davranir:

1. `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` tanimliysa gorseller Cloudinary'ye yuklenir.
2. Bu degiskenler yoksa sadece gelistirme ortaminda `public/img` altina kaydeder.
3. Production ortaminda Cloudinary ayarsizsa yukleme bilincli olarak hata verir; boylece sessiz veri kaybi yasanmaz.

### Veritabani Gecisi

Kalici veri icin Supabase, Neon, Railway PostgreSQL veya benzeri yonetilen bir PostgreSQL servisi kullanin.

Gecis adimlari:

1. Bir PostgreSQL veritabani olusturun.
2. Baglanti bilgisini `.env.local` ve deploy panelinde `DATABASE_URL` olarak tanimlayin.
3. Prisma datasource'u bu repoda PostgreSQL'e gecirildi. Sadece `DATABASE_URL` degerini girmeniz yeterli.
4. Migration calistirin.
5. Varsa lokal verileri yeni veritabanina tasiyin.

Lokalde ilk kurulum icin:

```bash
npx prisma migrate dev --name init-postgres
npx prisma generate
```

Vercel build icin onerilen komut:

```bash
npm run vercel-build
```

Bu komut deploy sirasinda migrationlari uygular (`prisma migrate deploy`) ve sonra Next.js build alir.

## Production Ortam Degiskenleri

`.env.example` icindeki degiskenleri doldurun:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="$2b$10$replace_with_bcrypt_hash"
```

## Vercel Yayin Checklist

1. Vercel'de proje ayarlarinda su degiskenleri tanimlayin:
`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`.
2. Build Command'i `npm run vercel-build` yapin.
3. Ilk deploy sonrasi `migrate deploy` migrationlari otomatik uygular.
4. Admin sifre degistirme ozelligi production'da ENV tabanli oldugu icin panelden kalici sifre degisimi yapmaz; sifre degisikligi Vercel Environment Variables uzerinden yapilmalidir.
