"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Ürün Modeli
interface Product {
    id: number;
    name: string;
    price: number;
    priceText?: string | null;
    imageUrl: string | null;
}

export default function ProfilePage() {
    const router = useRouter();
    // State yönetimi
    const [userName, setUserName] = useState("Kullanıcı"); // ViewBag.UserName simülasyonu
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const [meRes, favoritesRes] = await Promise.all([
                    fetch('/api/auth/me', { cache: 'no-store' }),
                    fetch('/api/user/favorites', { cache: 'no-store' })
                ]);

                const meData = await meRes.json().catch(() => ({}));
                const favoritesData = await favoritesRes.json().catch(() => ([]));

                if (meData?.username) {
                    setUserName(meData.username);
                } else {
                    setUserName('Değerli Müşterimiz');
                }

                setFavoriteProducts(Array.isArray(favoritesData) ? favoritesData : []);
            } finally {
                setLoading(false);
            }
        };

        loadProfileData();
    }, []);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="card bg-dark text-white p-4 shadow-lg" style={{ border: '1px solid #d4af37', borderRadius: '15px' }}>
                <div className="d-flex align-items-center mb-4">
                    <h2 className="mb-0">
                        Hoş Geldin, <span style={{ color: '#d4af37' }}>{userName}</span>!
                    </h2>
                </div>
                
                <hr className="border-secondary" />
                
                <div className="row mt-4">
                    <div className="col-md-12 text-start">
                        <h5>Profil Bilgilerin</h5>
                        <p className="text-secondary mt-3">Buradan favori ürünlerini ve sipariş taleplerini takip edebilirsin.</p>
                        
                        <h5 className="mt-5 mb-4" style={{ color: '#d4af37' }}>
                            <i className="bi bi-heart-fill me-2"></i> Favori Ürünlerim
                        </h5>
                        
                        <div className="row">
                            {loading ? (
                                <div className="col-12 text-center py-5" style={{ border: '1px dashed #444', borderRadius: '10px' }}>
                                    <p className="text-secondary mb-0">Favoriler yukleniyor...</p>
                                </div>
                            ) : favoriteProducts.length > 0 ? (
                                favoriteProducts.map((item) => (
                                    <div key={item.id} className="col-md-4 mb-4">
                                        <div className="card bg-dark text-white h-100" style={{ border: '1px solid #444', borderRadius: '10px', overflow: 'hidden' }}>
                                            {item.imageUrl && (
                                                <div style={{ backgroundColor: 'white', padding: '10px' }}>
                                                    <img 
                                                        src={item.imageUrl} 
                                                        className="card-img-top" 
                                                        alt={item.name} 
                                                        style={{ height: '180px', objectFit: 'contain' }} 
                                                    />
                                                </div>
                                            )}
                                            <div className="card-body d-flex flex-column">
                                                <h6 className="card-title" style={{ fontSize: '0.9rem' }}>{item.name}</h6>
                                                <div className="mt-auto pt-3 d-flex justify-content-between align-items-center">
                                                    <span className="fw-bold" style={{ color: '#d4af37' }}>
                                                        {item.priceText || item.price.toLocaleString('tr-TR')}
                                                    </span>
                                                    <Link href={`/urunler/${item.id}`} className="btn btn-sm btn-outline-warning">
                                                        İncele
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5" style={{ border: '1px dashed #444', borderRadius: '10px' }}>
                                    <p className="text-secondary mb-2">Henüz favori ürününüz bulunmuyor.</p>
                                    <Link href="/urunler" style={{ color: '#d4af37', textDecoration: 'none' }} className="small">
                                        Ürünlere göz atmak ister misin?
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-5 border-top border-secondary pt-3 d-flex">
                    <Link href="/" className="btn btn-outline-light me-2">
                        Ana Sayfaya Dön
                    </Link>
                    <form onSubmit={handleLogout} className="d-inline">
                         <button type="submit" className="btn btn-danger">Çıkış Yap</button>
                    </form>
                </div>
            </div>
        </div>
    );
}