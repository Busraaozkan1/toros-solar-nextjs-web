import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-5 bg-transparent text-white">
      {/* Logo Alanı */}
      <div className="text-2xl font-bold italic text-yellow-500 underline">
        TOROS SOLAR
      </div>

      {/* Menü Linkleri */}
      <div className="space-x-8 font-medium text-lg">
        <Link href="/" className="hover:text-yellow-400 transition">Anasayfa</Link>
        <Link href="/hakkimizda" className="hover:text-yellow-400 transition">Hakkımızda</Link>
        <Link href="/urunler" className="hover:text-yellow-400 transition">Ürünler</Link>
        <Link href="/iletisim" className="hover:text-yellow-400 transition">İletişim</Link>
      </div>

      {/* Giriş Yap / Kayıt Ol Butonları (Eski sitendeki gibi) */}
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          Giriş Yap
        </Link>
        <Link href="/register" className="px-4 py-2 bg-yellow-500 text-black rounded font-bold hover:bg-yellow-400 transition">
          Kayıt Ol
        </Link>
      </div>
    </nav>
  );
}