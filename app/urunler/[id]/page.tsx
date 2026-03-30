"use client";

import React, { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);

    const [product, setProduct] = useState<null | {
        id: number;
        name: string;
        imageUrl: string | null;
        price: number;
        priceText?: string | null;
        description: string;
    }>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await fetch(`/api/admin/products/${resolvedParams.id}`, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Urun detaylari getirilemedi.');
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Bir hata olustu.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [resolvedParams.id]);

    // ASP.NET'teki açıklama satırlarını bölme mantığı (Split)
    const features = useMemo(() => {
        return product?.description
            ? product.description.split(/\r?\n/).filter((line) => line.trim() !== '')
            : [];
    }, [product?.description]);

    // WhatsApp mesajı için ürün ismini escape etme
    const encodedProductName = encodeURIComponent(product?.name || 'Urun');
    const whatsappUrl = `https://wa.me/905367333678?text=Merhaba,%20TorosSolar%20sitenizden%20'${encodedProductName}'%20ürünü%20hakkında%20bilgi%20almak%20istiyorum.`;

    if (loading) {
        return (
            <div className="container mt-5 pt-5">
                <div className="alert alert-secondary">Urun detaylari yukleniyor...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mt-5 pt-5">
                <div className="alert alert-danger">{error || 'Urun bulunamadi.'}</div>
                <button onClick={() => router.back()} className="btn btn-outline-secondary">Geri Don</button>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="card bg-dark text-white p-4 shadow-lg" style={{ border: '1px solid #d4af37', borderRadius: '15px' }}>
                <div className="row">
                    {/* Ürün Görseli */}
                    <div className="col-md-5 text-center d-flex align-items-center justify-content-center" 
                         style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                        {product.imageUrl ? (
                            <img 
                                src={product.imageUrl} 
                                className="img-fluid" 
                                alt={product.name} 
                                style={{ maxHeight: '450px', objectFit: 'contain' }} 
                            />
                        ) : (
                            <div className="text-secondary">Gorsel bulunamadi</div>
                        )}
                    </div>

                    {/* Ürün Bilgileri */}
                    <div className="col-md-7 ps-md-5 mt-4 mt-md-0 text-start">
                        <h1 className="display-5 fw-bold" style={{ color: '#d4af37' }}>{product.name}</h1>
                        <hr className="border-secondary" />
                        
                        <div className="my-4">
                            <h2 className="fw-bold">{product.priceText || product.price.toLocaleString('tr-TR')}</h2>
                            <span className="badge bg-success">Stokta Var</span>
                        </div>

                        <div className="product-description mt-4">
                            <h5 className="mb-3" style={{ color: '#d4af37' }}>Teknik Özellikler</h5>
                            
                            <ul className="list-unstyled">
                                {features.length > 0 ? (
                                    features.map((feature, index) => (
                                        <li key={index} className="text-secondary mb-2 d-flex align-items-start">
                                            <i className="bi bi-check2-circle me-2 mt-1" style={{ color: '#d4af37' }}></i>
                                            <span>{feature}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-secondary">Teknik özellik belirtilmedi.</li>
                                )}
                            </ul>
                        </div>

                        {/* Buton Grubu */}
                        <div className="mt-5 d-grid gap-2 d-md-flex">
                            <button 
                                onClick={() => router.back()} 
                                className="btn btn-outline-light px-4 d-flex align-items-center justify-content-center"
                            >
                                <i className="bi bi-arrow-left me-2"></i> Geri Dön
                            </button>

                            {/* WhatsApp İletişim Butonu */}
                            <a 
                                href={whatsappUrl}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn px-5 fw-bold d-flex align-items-center justify-content-center" 
                                style={{ backgroundColor: '#25D366', border: 'none', color: 'white', minHeight: '45px' }}
                            >
                                <i className="bi bi-whatsapp me-2" style={{ fontSize: '1.2rem' }}></i> İletişime Geç
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}