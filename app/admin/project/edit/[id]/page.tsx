"use client";

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Notice = {
    type: 'success' | 'error';
    text: string;
};

export default function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [formData, setFormData] = useState({
        id: resolvedParams.id,
        name: '',
        description: '',
        imageUrl: ''
    });
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState<Notice | null>(null);

    useEffect(() => {
        const loadProject = async () => {
            try {
                const response = await fetch(`/api/admin/projects/${resolvedParams.id}`, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Proje detaylari getirilemedi.');
                }

                const data = await response.json();
                setFormData({
                    id: String(data.id),
                    name: data.name || '',
                    description: data.description || '',
                    imageUrl: data.imageUrl || ''
                });
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Bir hata olustu.';
                setNotice({ type: 'error', text: message });
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [resolvedParams.id]);

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [imagePreviewUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
            setImagePreviewUrl(null);
        }

        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const previewUrl = URL.createObjectURL(selectedFile);
            setNewImage(selectedFile);
            setImagePreviewUrl(previewUrl);
        } else {
            setNewImage(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setNotice(null);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('imageUrl', formData.imageUrl);
            if (newImage) {
                data.append('imageFile', newImage);
            }

            const response = await fetch(`/api/admin/projects/${resolvedParams.id}`, {
                method: 'PUT',
                body: data
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(payload?.message || 'Proje guncellenemedi.');
            }

            setNotice({ type: 'success', text: 'Proje guncellendi. Liste sayfasina yonlendiriliyorsunuz...' });
            setTimeout(() => router.push('/admin/project'), 900);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata olustu.';
            setNotice({ type: 'error', text: message });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-lg overflow-hidden">
                        <div className="card-header bg-warning text-dark p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-pencil-square me-2"></i>Projeyi Duzenle
                                </h5>
                                <Link href="/admin/project" className="btn btn-outline-dark btn-sm fw-bold">
                                    Listeye Don
                                </Link>
                            </div>
                        </div>

                        <div className="card-body p-4 bg-white text-dark">
                            {notice && (
                                <div className={`alert ${notice.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                    {notice.text}
                                </div>
                            )}

                            {loading ? (
                                <div className="alert alert-secondary mb-0">Proje detaylari yukleniyor...</div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12 text-start">
                                            <label className="form-label fw-bold">Proje Adi</label>
                                            <input
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-12 text-start">
                                            <label className="form-label fw-bold">Yeni Gorsel</label>
                                            <input
                                                type="file"
                                                name="imageFile"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <small className="text-muted">Gorseli degistirmek istemiyorsaniz bos birakin.</small>
                                        </div>

                                        {formData.imageUrl ? (
                                            <div className="col-12 text-start">
                                                <div className="p-3 border rounded bg-light">
                                                    <div className="small text-muted mb-2">Mevcut Gorsel</div>
                                                    <img
                                                        src={formData.imageUrl}
                                                        alt={formData.name}
                                                        className="img-fluid rounded border"
                                                        style={{ maxHeight: '260px', objectFit: 'cover', width: '100%' }}
                                                    />
                                                </div>
                                            </div>
                                        ) : null}

                                        {imagePreviewUrl ? (
                                            <div className="col-12 text-start">
                                                <div className="p-3 border rounded bg-light">
                                                    <div className="small text-muted mb-2">Yeni Gorsel Onizleme</div>
                                                    <img
                                                        src={imagePreviewUrl}
                                                        alt="Yeni proje gorseli"
                                                        className="img-fluid rounded border"
                                                        style={{ maxHeight: '260px', objectFit: 'cover', width: '100%' }}
                                                    />
                                                </div>
                                            </div>
                                        ) : null}

                                        <div className="col-12 text-start">
                                            <label className="form-label fw-bold">Proje Aciklamasi</label>
                                            <textarea
                                                name="description"
                                                className="form-control"
                                                rows={6}
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2 mt-4">
                                        <button type="submit" disabled={saving} className="btn btn-primary btn-lg shadow fw-bold">
                                            <i className={`bi ${saving ? 'bi-hourglass-split' : 'bi-arrow-repeat'} me-2`}></i>
                                            {saving ? 'Guncelleniyor...' : 'Degisiklikleri Guncelle'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}