"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Notice = {
    type: 'success' | 'error';
    text: string;
};

// Vercel serverless istek gövdesi ~4.5MB ile sınırlı; büyük telefon
// fotoğrafları 413 (PAYLOAD_TOO_LARGE) hatası veriyordu. Yüklemeden önce
// görseli tarayıcıda küçültüp JPEG'e çeviriyoruz.
async function compressImageForUpload(file: File, maxDim = 1920, quality = 0.82): Promise<File> {
    if (!file.type.startsWith('image/')) {
        return file;
    }

    let bitmap: ImageBitmap;
    try {
        bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
        bitmap = await createImageBitmap(file);
    }

    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    if (!blob) {
        return file;
    }

    const baseName = file.name.replace(/\.[^/.]+$/, '') || 'gorsel';
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
}

export default function ProjectCreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
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

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (imageFile) {
            try {
                const optimized = await compressImageForUpload(imageFile);
                data.append('imageFile', optimized);
            } catch {
                data.append('imageFile', imageFile);
            }
        }

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                body: data
            });

            const payload = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(payload?.message || 'Proje kaydedilemedi.');
            }

            setNotice({ type: 'success', text: 'Proje basariyla kaydedildi. Proje yonetimine yonlendiriliyorsunuz...' });
            setFormData({ name: '', description: '' });
            setImageFile(null);
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
            setImagePreviewUrl(null);
            setTimeout(() => router.push('/admin/project'), 900);
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
                        <div className="card-header text-white p-3" style={{ background: 'linear-gradient(135deg, #0f172a, #1d4ed8)' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-stars me-2"></i>Yeni Proje Ekle
                                </h5>
                                <Link href="/admin/project" className="btn btn-outline-light btn-sm">
                                    <i className="bi bi-list-ul me-1"></i>Listeye Don
                                </Link>
                            </div>
                        </div>

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
                                <div className="row g-3">
                                    <div className="col-12 text-start">
                                        <label className="form-label fw-bold">Proje Adi</label>
                                        <input
                                            name="name"
                                            className="form-control form-control-lg shadow-sm"
                                            placeholder="Orn: Mersin Organize Sanayi Cati Uygulamasi"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12 text-start">
                                        <label className="form-label fw-bold">Proje Gorseli</label>
                                        <div className="input-group shadow-sm">
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                id="projectImageInput"
                                                onChange={handleFileChange}
                                            />
                                            <label className="input-group-text" htmlFor="projectImageInput">
                                                <i className="bi bi-upload"></i>
                                            </label>
                                        </div>
                                        <small className="text-muted">Kapak niteliginde genis bir gorsel tercih edin.</small>

                                        {imagePreviewUrl && (
                                            <div className="mt-3 p-3 border rounded bg-light">
                                                <div className="small text-muted mb-2">Gorsel Onizleme</div>
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Secilen proje gorseli"
                                                    className="img-fluid rounded border"
                                                    style={{ maxHeight: '240px', objectFit: 'cover', width: '100%' }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-12 text-start">
                                        <label className="form-label fw-bold">Proje Aciklamasi</label>
                                        <textarea
                                            name="description"
                                            className="form-control shadow-sm"
                                            rows={6}
                                            placeholder="Uygulama kapsamı, kapasite bilgisi, lokasyon ve elde edilen faydayı yazin..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button type="submit" disabled={submitting} className="btn btn-primary btn-lg shadow fw-bold">
                                        <i className={`bi ${submitting ? 'bi-hourglass-split' : 'bi-save'} me-2`}></i>
                                        {submitting ? 'Kaydediliyor...' : 'Projeyi Sisteme Kaydet'}
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