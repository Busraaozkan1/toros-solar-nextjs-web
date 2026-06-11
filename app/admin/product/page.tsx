"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Ürün Modeli Arayüzü
interface Product {
    id: number;
    name: string;
    price: number;
    priceText?: string | null;
    imageUrl: string;
    createdDate: string;
}

export default function ProductIndexPage() {
    // State yönetimi
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) {
                    throw new Error('Urunler getirilemedi.');
                }

                const data = await res.json();
                setProducts(Array.isArray(data) ? data : []);
            } catch {
                setError('Urunler yuklenirken bir hata olustu.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Silmek istediğinize emin misiniz?')) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.message || 'Urun silinemedi.');
            }

            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Silme isleminde hata olustu.';
            setError(message);
        }
    };

    return (
        <div className="container-fluid py-4">
            {/* Üst Başlık ve Ekleme Butonu */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0 text-dark">
                    <i className="bi bi-boxes text-primary me-2"></i> Ürün Yönetimi
                </h2>
                <div className="d-flex gap-2">
                    <Link href="/admin/product/bulk" className="btn btn-outline-success d-flex align-items-center">
                        <i className="bi bi-file-earmark-spreadsheet me-2"></i> Toplu İçe Aktar
                    </Link>
                    <Link href="/admin/product/create" className="btn btn-success d-flex align-items-center">
                        <i className="bi bi-plus-lg me-2"></i> Yeni Ürün Ekle
                    </Link>
                </div>
            </div>

            {/* Tablo Alanı */}
            <div className="table-responsive">
                <table className="table table-hover bg-white shadow-sm align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '80px' }}>Görsel</th>
                            <th>Ürün Adı</th>
                            <th>Fiyat</th>
                            <th>Ekleme Tarihi</th>
                            <th className="text-center" style={{ width: '150px' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="text-dark">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4">Yükleniyor...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-danger">{error}</td>
                            </tr>
                        ) : products.length > 0 ? (
                            products.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.imageUrl ? (
                                            <img 
                                                src={item.imageUrl} 
                                                width="50" 
                                                height="50"
                                                alt={item.name} 
                                                className="rounded shadow-sm border"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span className="badge bg-secondary">Resim Yok</span>
                                        )}
                                    </td>
                                    <td className="fw-bold">{item.name}</td>
                                    <td className="text-success fw-bold">
                                        {item.priceText || item.price.toLocaleString('tr-TR')}
                                    </td>
                                    <td>{new Date(item.createdDate).toLocaleDateString('tr-TR')}</td>
                                    <td className="text-center">
                                        <div className="btn-group" role="group">
                                            <Link 
                                                href={`/admin/product/edit/${item.id}`} 
                                                className="btn btn-sm btn-warning me-2"
                                                title="Düzenle"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item.id)} 
                                                className="btn btn-sm btn-danger"
                                                title="Sil"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">Kayıtlı ürün bulunamadı.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}