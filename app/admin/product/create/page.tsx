"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Notice = {
    type: 'success' | 'error';
    text: string;
};

export default function ProductCreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        priceText: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [notice, setNotice] = useState<Notice | null>(null);

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
            setImagePreviewUrl(null);
        }

        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const previewUrl = URL.createObjectURL(selectedFile);

            setImageFile(selectedFile);
            setImagePreviewUrl(previewUrl);
        } else {
            setImageFile(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setNotice(null);
        
        // Form verilerini hazırlama (Dosya yükleme olduğu için FormData kullanıyoruz)
        const data = new FormData();
        data.append('name', formData.name);
        data.append('priceText', formData.priceText);
        data.append('description', formData.description);
        if (imageFile) {
            data.append('imageFile', imageFile);
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: data
            });

            const payload = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(payload?.message || 'Urun kaydedilemedi.');
            }

            setNotice({ type: 'success', text: 'Urun basariyla kaydedildi. Urun yonetimine yonlendiriliyorsunuz...' });
            setFormData({ name: '', priceText: '', description: '' });
            setImageFile(null);
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
            setImagePreviewUrl(null);
            setTimeout(() => router.push('/admin/product'), 900);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata olustu.';
            setNotice({ type: 'error', text: message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg overflow-hidden">
                        {/* Header Bölümü */}
                        <div className="card-header bg-primary text-white p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-plus-circle me-2"></i>Yeni Ürün Ekle
                                </h5>
                                <Link href="/admin/product" className="btn btn-outline-light btn-sm">
                                    <i className="bi bi-list-ul me-1"></i>Listeye Dön
                                </Link>
                            </div>
                        </div>

                        {/* Form Gövdesi */}
                        <div className="card-body p-4 bg-white text-dark">
                            {notice && (
                                <div
                                    className={`mb-4 p-3 rounded border d-flex align-items-start gap-3 ${
                                        notice.type === 'success'
                                            ? 'bg-success-subtle border-success'
                                            : 'bg-danger-subtle border-danger'
                                    }`}
                                >
                                    <i className={`bi ${notice.type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'} fs-5 mt-1`}></i>
                                    <div>
                                        <div className="fw-bold mb-1">
                                            {notice.type === 'success' ? 'Islem Basarili' : 'Islem Basarisiz'}
                                        </div>
                                        <div className="small">{notice.text}</div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="row">
                                    {/* Ürün Adı */}
                                    <div className="col-md-7 mb-3 text-start">
                                        <label className="form-label fw-bold">Ürün Adı</label>
                                        <input 
                                            name="name"
                                            className="form-control form-control-lg shadow-sm" 
                                            placeholder="Örn: 450W Mono Perc Panel" 
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
                                            className="form-control form-control-lg shadow-sm" 
                                            placeholder="Orn: 588 TL, 500 $, 500 dolar"
                                            value={formData.priceText}
                                            onChange={handleChange}
                                            required
                                        />
                                        <small className="text-muted">Istediginiz formatta yazabilirsiniz.</small>
                                    </div>

                                    {/* Görsel Yükleme */}
                                    <div className="col-md-12 mb-3 text-start">
                                        <label className="form-label fw-bold">Ürün Görseli</label>
                                        <div className="input-group shadow-sm">
                                            <input 
                                                type="file" 
                                                className="form-control" 
                                                accept="image/*" 
                                                id="imageInput" 
                                                onChange={handleFileChange}
                                            />
                                            <label className="input-group-text" htmlFor="imageInput">
                                                <i className="bi bi-upload"></i>
                                            </label>
                                        </div>
                                        <small className="text-muted">Lütfen yüksek çözünürlüklü bir fotoğraf seçin.</small>

                                        {imagePreviewUrl && (
                                            <div className="mt-3 p-3 border rounded bg-light">
                                                <div className="small text-muted mb-2">Gorsel Onizleme</div>
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Secilen urun gorseli"
                                                    className="img-fluid rounded border"
                                                    style={{ maxHeight: '220px', objectFit: 'contain' }}
                                                />
                                                <div className="small mt-2 text-dark">
                                                    {imageFile?.name}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Açıklama */}
                                    <div className="col-md-12 mb-4 text-start">
                                        <label className="form-label fw-bold">Detaylı Bilgi / Açıklama</label>
                                        <textarea 
                                            name="description"
                                            className="form-control shadow-sm" 
                                            rows={5} 
                                            placeholder="Ürün teknik özelliklerini buraya yazın..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Kaydet Butonu */}
                                <div className="d-grid gap-2">
                                    <button type="submit" disabled={submitting} className="btn btn-success btn-lg shadow fw-bold">
                                        <i className={`bi ${submitting ? 'bi-hourglass-split' : 'bi-save'} me-2`}></i>
                                        {submitting ? 'Kaydediliyor...' : 'Urunu Sisteme Kaydet'}
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