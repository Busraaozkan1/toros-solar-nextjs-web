"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Ürün Modeli Tanımı
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    priceText?: string | null;
    imageUrl: string | null;
}

function extractDescriptionItems(description?: string | null) {
    if (!description) {
        return [];
    }

    return description
        .split(/\r?\n|•|\u2022|\./)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}

export default function UrunlerClient({ initialProducts }: { initialProducts: Product[] }) {
    const router = useRouter();
    const pathname = usePathname();
    // State Yönetimi
    const products = initialProducts;
    const loading = false;
    const error: string | null = null;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const response = await fetch('/api/auth/me', { cache: 'no-store' });
                const data = await response.json().catch(() => ({}));
                setIsAuthenticated(Boolean(data?.authenticated));
            } catch {
                setIsAuthenticated(false);
            }
        };

        loadAuth();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            setFavoriteIds([]);
            return;
        }

        const loadFavorites = async () => {
            try {
                const response = await fetch('/api/user/favorites', { cache: 'no-store' });
                if (!response.ok) {
                    return;
                }

                const data = await response.json().catch(() => []);
                if (Array.isArray(data)) {
                    setFavoriteIds(data.map((item) => Number(item.id)).filter((id) => !Number.isNaN(id)));
                }
            } catch {
                // ignore
            }
        };

        loadFavorites();
    }, [isAuthenticated]);

    // Favori Ekleme Fonksiyonu (ASP.NET'teki AJAX karşılığı)
    const handleFavoriteClick = async (productId: number) => {
        if (!isAuthenticated) {
            router.push(`/user-login?next=${encodeURIComponent(pathname || '/urunler')}`);
            return;
        }

        const res = await fetch('/api/user/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return;
        }

        setFavoriteIds((prev) => {
            const exists = prev.includes(productId);

            if (result?.action === 'removed' || (exists && result?.action !== 'added')) {
                return prev.filter((id) => id !== productId);
            }

            if (exists) {
                return prev;
            }

            return [...prev, productId];
        });
    };

    return (
        <section
            className="section-padding bg-darker"
            style={{
                minHeight: '100vh',
                paddingTop: '100px',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #2f3a4c 0%, #41536b 58%, #556d8a 100%)'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 14% 20%, rgba(255,255,255,0.11), transparent 30%), radial-gradient(circle at 86% 80%, rgba(255,210,140,0.1), transparent 34%)',
                    pointerEvents: 'none'
                }}
            ></div>

            <div className="container position-relative">
                <h2 className="section-title text-center mb-5 text-white">Ürün Kataloğumuz</h2>
                
                {loading ? (
                    <div className="alert alert-secondary bg-dark text-light border-secondary text-center">
                        Urunler yukleniyor...
                    </div>
                ) : error ? (
                    <div className="alert alert-danger bg-dark text-light border-danger text-center">
                        {error}
                    </div>
                ) : products.length === 0 ? (
                    <div className="alert alert-info bg-dark text-light border-secondary text-center">
                        Henüz ürün eklenmemiş. Lütfen daha sonra tekrar kontrol edin.
                    </div>
                ) : (
                    <div className="row g-4">
                        {products.map((item) => (
                            <div key={item.id} className="col-lg-3 col-md-6 col-sm-6">
                                <div
                                    className="product-card h-100 d-flex flex-column position-relative bg-dark border-gold-thin p-3 shadow"
                                    style={{ borderRadius: '18px', overflow: 'hidden' }}
                                >
                                    
                                    <button 
                                        className="btn border-0 position-absolute top-0 end-0 m-2 p-0 favorite-btn" 
                                        onClick={() => handleFavoriteClick(item.id)}
                                        style={{ zIndex: 10, background: 'none' }} 
                                        title="Favorilere Ekle"
                                    >
                                        <i className={`bi ${favoriteIds.includes(item.id) ? 'bi-heart-fill' : 'bi-heart'} text-danger fs-4 shadow-sm`}></i>
                                    </button>

                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                                        {item.imageUrl && item.imageUrl.trim() ? (
                                            <img 
                                                src={item.imageUrl} 
                                                className="img-fluid" 
                                                alt={item.name} 
                                                style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center text-secondary" style={{ height: '200px' }}>
                                                Gorsel yok
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="product-info flex-grow-1 d-flex flex-column justify-content-between mt-3 text-start">
                                        <div>
                                            <h5 style={{ color: '#f8fafc', fontWeight: 700, letterSpacing: '0.2px', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{item.name}</h5>
                                            <h4 className="text-gold">{item.priceText || item.price.toLocaleString('tr-TR')}</h4>
                                        </div>
                                        
                                        <button 
                                            className="btn btn-outline-light btn-sm mt-3 w-100" 
                                            data-bs-toggle="modal" 
                                            data-bs-target={`#modal-${item.id}`}
                                        >
                                            Detaylı İncele <i className="bi bi-search ms-2"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* MODAL KISMI */}
                                <div className="modal fade" id={`modal-${item.id}`} tabIndex={-1} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content bg-dark text-white border-gold-thin">
                                            <div className="modal-header border-secondary">
                                                <h5 className="modal-title" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{item.name}</h5>
                                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body p-4 text-start">
                                                <div className="text-center mb-3" style={{ background: '#1a1a1a', borderRadius: '8px', padding: '15px' }}>
                                                    {item.imageUrl && item.imageUrl.trim() ? (
                                                        <img 
                                                            src={item.imageUrl} 
                                                            className="img-fluid rounded" 
                                                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                                                            alt={item.name}
                                                        />
                                                    ) : (
                                                        <div className="text-secondary py-5">Gorsel bulunamadi</div>
                                                    )}
                                                </div>
                                                
                                                {(() => {
                                                    const technicalItems = extractDescriptionItems(item.description);

                                                    if (technicalItems.length === 0) {
                                                        return null;
                                                    }

                                                    return (
                                                        <div className="mb-3">
                                                            <h6 className="text-gold mb-3 fw-bold">Teknik Ozellikler</h6>
                                                            <ul className="list-unstyled mb-0">
                                                                {technicalItems.map((feature, index) => (
                                                                    <li
                                                                        key={`${item.id}-modal-feature-${index}`}
                                                                        className="d-flex align-items-start mb-2"
                                                                        style={{ color: '#b9c3d1' }}
                                                                    >
                                                                        <i className="bi bi-check2-circle text-gold me-2 mt-1"></i>
                                                                        <span>{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    );
                                                })()}
                                                
                                                <hr className="border-secondary" />
                                                <h3 className="text-gold text-end">{item.priceText || item.price.toLocaleString('tr-TR')}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}