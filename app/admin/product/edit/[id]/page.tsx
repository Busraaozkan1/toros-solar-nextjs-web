"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductEditPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    
    // Form State Yönetimi
    const [formData, setFormData] = useState({
        id: params.id,
        name: '450W Mono Perc Panel',
        priceText: '1250 TL',
        description: 'Yuksek verimlilik orani\nDayanikli temperli cam',
        imageUrl: '/img/panel-sample.jpg'
    });
    
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

        // FormData hazırlığı (Dosya yükleme desteği için)
        const data = new FormData();
        data.append('id', formData.id);
        data.append('name', formData.name);
        data.append('priceText', formData.priceText);
        data.append('description', formData.description);
        data.append('imageUrl', formData.imageUrl); // Eski resim yolu (eğer yenisi seçilmezse)
        
        if (newImage) {
            data.append('imageFile', newImage);
        }

        console.log("Güncelleme isteği gönderiliyor...", formData);
        alert("Ürün başarıyla güncellendi!");
        router.push('/admin/product'); // Başarılı işlem sonrası listeye dön
    };

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
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Hidden Inputs (ASP.NET asp-for="Id" karşılığı) */}
                                <input type="hidden" name="id" value={formData.id} />
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
                                    <button type="submit" className="btn btn-primary btn-lg shadow fw-bold">
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