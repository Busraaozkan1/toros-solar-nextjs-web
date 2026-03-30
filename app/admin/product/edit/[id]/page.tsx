"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

type ProductFormData = {
    id: string;
    name: string;
    priceText: string;
    description: string;
    imageUrl: string;
};

export default function ProductEditPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const productId = String(params?.id || '').trim();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState<ProductFormData>({
        id: '',
        name: '',
        priceText: '',
        description: '',
        imageUrl: ''
    });
        useEffect(() => {
            const loadProduct = async () => {
                if (!productId) {
                    setError('Gecersiz urun id.');
                    setLoading(false);
                    return;
                }

                try {
                    const res = await fetch(`/api/admin/products/${productId}`, { cache: 'no-store' });
                    const data = await res.json().catch(() => ({}));

                    if (!res.ok) {
                        throw new Error(data?.message || 'Urun bilgisi yuklenemedi.');
                    }

                    setFormData({
                        id: String(data.id),
                        name: String(data.name || ''),
                        priceText: String(data.priceText || data.price || ''),
                        description: String(data.description || ''),
                        imageUrl: String(data.imageUrl || '')
                    });
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Urun yuklenirken hata olustu.';
                    setError(message);
                } finally {
                    setLoading(false);
                }
            };

            loadProduct();
        }, [productId]);

    
    const [newImage, setNewImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('priceText', formData.priceText);
        data.append('description', formData.description);
        data.append('imageUrl', formData.imageUrl);
        
        if (newImage) {
            data.append('imageFile', newImage);
        }

        try {
            const res = await fetch(`/api/admin/products/${formData.id}`, {
                method: 'PUT',
                body: data
            });

            const payload = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(payload?.message || 'Urun guncellenemedi.');
            }

            alert('Urun basariyla guncellendi!');
            router.push('/admin/product');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Guncelleme sirasinda hata olustu.';
            setError(message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="container py-4">Urun bilgileri yukleniyor...</div>;
    }

    if (error && !formData.id) {
        return <div className="container py-4 text-danger">{error}</div>;
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg">
                        {/* Header - ASP.NET'teki bg-warning ve text-dark teması korundu */}
                        <div className="card-header bg-warning text-dark p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-pencil-square me-2"></i>Ürünü Düzenle
                                </h5>
                                <Link href="/admin/product" className="btn btn-outline-dark btn-sm fw-bold">
                                    Listeye Dön
                                </Link>
                            </div>
                        </div>

                        <div className="card-body p-4 bg-white text-dark">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="imageUrl" value={formData.imageUrl} />

                                <div className="row">
                                    {/* Ürün Adı */}
                                    <div className="col-md-7 mb-3 text-start">
                                        <label className="form-label fw-bold">Ürün Adı</label>
                                        <input 
                                            name="name"
                                            className="form-control" 
                                            value={formData.name}
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>

                                    {/* Fiyat */}
                                    <div className="col-md-5 mb-3 text-start">
                                        <label className="form-label fw-bold">Fiyat</label>
                                        <input 
                                            name="priceText"
                                            className="form-control" 
                                            value={formData.priceText}
                                            onChange={handleChange}
                                            placeholder="Orn: 588 TL, 500 $, 500 dolar"
                                            required 
                                        />
                                    </div>

                                    {/* Mevcut Görsel */}
                                    <div className="col-md-12 mb-3 text-start">
                                        <label className="form-label fw-bold">Mevcut Görsel</label>
                                        <div className="mb-2">
                                            {formData.imageUrl && (
                                                <img 
                                                    src={formData.imageUrl} 
                                                    width="100" 
                                                    alt="Mevcut ürün"
                                                    className="rounded shadow-sm border" 
                                                />
                                            )}
                                        </div>
                                        <label className="form-label fw-bold">
                                            Yeni Görsel <small className="text-muted fw-normal">(Değiştirmek istemiyorsanız boş bırakın)</small>
                                        </label>
                                        <input 
                                            type="file" 
                                            name="imageFile" 
                                            className="form-control" 
                                            accept="image/*" 
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {/* Açıklama */}
                                    <div className="col-md-12 mb-4 text-start">
                                        <label className="form-label fw-bold">Açıklama</label>
                                        <textarea 
                                            name="description"
                                            className="form-control" 
                                            rows={5}
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Güncelleme Butonu */}
                                <div className="d-grid gap-2">
                                    <button type="submit" disabled={saving} className="btn btn-primary btn-lg shadow fw-bold">
                                        <i className="bi bi-arrow-repeat me-2"></i>Değişiklikleri Güncelle
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}