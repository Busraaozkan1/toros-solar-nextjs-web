"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
    createdDate: string;
}

export default function ProjectIndexPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const res = await fetch('/api/projects', { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Projeler getirilemedi.');
                }

                const data = await res.json();
                setProjects(Array.isArray(data) ? data : []);
            } catch {
                setError('Projeler yuklenirken bir hata olustu.');
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Bu projeyi silmek istediginize emin misiniz?')) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.message || 'Proje silinemedi.');
            }

            setProjects((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Silme isleminde hata olustu.';
            setError(message);
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1 text-dark">
                        <i className="bi bi-building text-primary me-2"></i> Proje Yönetimi
                    </h2>
                    <p className="text-muted mb-0">Tamamlanan referans projeleri burada yonetin.</p>
                </div>
                <Link href="/admin/project/create" className="btn btn-success d-flex align-items-center">
                    <i className="bi bi-plus-lg me-2"></i> Yeni Proje Ekle
                </Link>
            </div>

            <div className="row g-4">
                {loading ? (
                    <div className="col-12">
                        <div className="alert alert-secondary text-center mb-0">Yukleniyor...</div>
                    </div>
                ) : error ? (
                    <div className="col-12">
                        <div className="alert alert-danger text-center mb-0">{error}</div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-light text-center mb-0">Kayitli proje bulunamadi.</div>
                    </div>
                ) : (
                    projects.map((item) => (
                        <div key={item.id} className="col-xl-4 col-md-6">
                            <div className="card h-100 border-0 shadow-sm overflow-hidden">
                                <div style={{ height: '220px', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center text-white h-100">
                                            Gorsel yok
                                        </div>
                                    )}
                                </div>
                                <div className="card-body text-start">
                                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                                        <h5 className="fw-bold text-dark mb-0">{item.name}</h5>
                                        <span className="badge text-bg-warning">Referans</span>
                                    </div>
                                    <p className="text-muted small" style={{ minHeight: '72px' }}>
                                        {item.description.length > 120 ? `${item.description.slice(0, 120)}...` : item.description}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                        <span className="small text-secondary">
                                            {new Date(item.createdDate).toLocaleDateString('tr-TR')}
                                        </span>
                                        <div className="btn-group">
                                            <Link href={`/admin/project/edit/${item.id}`} className="btn btn-sm btn-warning">
                                                <i className="bi bi-pencil-fill"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}