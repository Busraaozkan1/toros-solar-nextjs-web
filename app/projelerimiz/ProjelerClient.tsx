"use client";

import React from 'react';

interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
}

export default function ProjelerClient({ initialProjects }: { initialProjects: Project[] }) {
    const projects = initialProjects;
    const loading = false;
    const error: string | null = null;

    return (
        <section
            className="section-padding"
            style={{
                minHeight: '100vh',
                paddingTop: '110px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div className="container position-relative">
                <div className="text-center mb-5">
                    <h6 className="text-uppercase fw-bold" style={{ letterSpacing: '3px', color: '#ffffff' }}>Referanslarımız</h6>
                    <h1 className="section-title text-white">Projelerimiz</h1>
                </div>

                {loading ? (
                    <div className="alert alert-secondary bg-dark text-light border-secondary text-center">
                        Projeler yukleniyor...
                    </div>
                ) : error ? (
                    <div className="alert alert-danger bg-dark text-light border-danger text-center">
                        {error}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="alert alert-info bg-dark text-light border-secondary text-center">
                        Henuz proje eklenmemis.
                    </div>
                ) : (
                    <div className="row g-4">
                        {projects.map((item) => (
                            <div key={item.id} className="col-xl-3 col-md-6">
                                <div className="project-list-card h-100 position-relative overflow-hidden shadow-lg" role="button" data-bs-toggle="modal" data-bs-target={`#proje-modal-${item.id}`} style={{ borderRadius: '24px', background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(17,24,39,0.95))', border: '1px solid rgba(212,175,55,0.35)', cursor: 'pointer' }}>
                                    <div className="project-list-image" style={{ height: '240px', background: 'linear-gradient(135deg, rgba(255,153,51,0.12), rgba(255,255,255,0.02))' }}>
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-100 h-100 project-list-image-inner"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center h-100 text-secondary">
                                                Gorsel yok
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 text-start">
                                        <h4 className="text-white fw-bold mb-3" style={{ minHeight: '64px', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{item.name}</h4>
                                        <p className="mb-0" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Proje detay modali */}
                                <div className="modal fade" id={`proje-modal-${item.id}`} tabIndex={-1} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                        <div className="modal-content text-white" style={{ background: 'linear-gradient(165deg, rgba(15,23,42,0.98), rgba(17,24,39,0.96))', border: '1px solid rgba(212,175,55,0.35)' }}>
                                            <div className="modal-header border-secondary border-opacity-50">
                                                <h5 className="modal-title">{item.name}</h5>
                                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className="modal-body p-4 text-start">
                                                {item.imageUrl && item.imageUrl.trim() ? (
                                                    <div className="text-center mb-4">
                                                        <img src={item.imageUrl} className="img-fluid rounded-3" style={{ maxHeight: '360px', width: '100%', objectFit: 'cover' }} alt={item.name} />
                                                    </div>
                                                ) : null}
                                                <p className="mb-0" style={{ color: '#b9c3d1', lineHeight: 1.8 }}>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .project-list-card {
                    transition: transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease;
                }

                .project-list-image {
                    overflow: hidden;
                }

                .project-list-image-inner {
                    transition: transform 320ms ease, filter 320ms ease;
                }

                .project-list-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(251, 191, 36, 0.62) !important;
                    box-shadow: 0 22px 36px rgba(2, 6, 23, 0.42), 0 0 0 1px rgba(251, 191, 36, 0.2);
                }

                .project-list-card:hover .project-list-image-inner {
                    transform: scale(1.05);
                    filter: saturate(1.08);
                }

                .project-list-card:active {
                    transform: translateY(-3px) scale(0.995);
                }
            `}</style>
        </section>
    );
}