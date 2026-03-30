"use client";

import React, { useState } from 'react';

export default function ChangePasswordPage() {
    // Form verilerini yönetmek için State kullanıyoruz
    const [formData, setFormData] = useState({
        newUsername: "MevcutKullaniciAdi", // @User.Identity.Name simülasyonu
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basit şifre eşleşme kontrolü
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Yeni şifreler birbiriyle eşleşmiyor.");
            return;
        }

        // Burada backend API'nize istek gönderebilirsiniz (fetch/axios)
        console.log("Form gönderildi:", formData);
        alert("Bilgileriniz başarıyla güncellendi. Güvenliğiniz için çıkış yapılıyor...");
    };

    return (
        <div className="container py-5" style={{ marginTop: '50px' }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0 overflow-hidden">
                        <div className="card-header bg-dark text-white py-3">
                            <h5 className="mb-0">
                                <i className="bi bi-person-gear me-2"></i>Hesap Ayarları
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <h4 className="mb-4 text-center">Giriş Bilgilerini Güncelle</h4>
                            
                            {/* Hata Mesajı Bölümü (ViewBag.Error Karşılığı) */}
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    {error}
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setError(null)} 
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* 1. KULLANICI ADI ALANI */}
                                <div className="mb-3 text-start">
                                    <label className="form-label fw-bold">Yeni Kullanıcı Adı</label>
                                    <input 
                                        type="text" 
                                        name="newUsername" 
                                        className="form-control" 
                                        value={formData.newUsername}
                                        onChange={handleChange}
                                        required 
                                    />
                                    <small className="text-muted">Giriş yaparken kullandığınız isminizi buradan değiştirebilirsiniz.</small>
                                </div>

                                <hr className="my-4 opacity-25" />

                                {/* 2. MEVCUT ŞİFRE */}
                                <div className="mb-3 text-start">
                                    <label className="form-label fw-bold">Mevcut Şifre</label>
                                    <input 
                                        type="password" 
                                        name="currentPassword" 
                                        className="form-control" 
                                        placeholder="Eski şifreniz" 
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                {/* 3. YENİ ŞİFRE */}
                                <div className="mb-3 text-start">
                                    <label className="form-label fw-bold">Yeni Şifre</label>
                                    <input 
                                        type="password" 
                                        name="newPassword" 
                                        className="form-control" 
                                        placeholder="Yeni şifreniz" 
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                {/* 4. YENİ ŞİFRE TEKRAR */}
                                <div className="mb-3 text-start">
                                    <label className="form-label fw-bold">Yeni Şifre (Tekrar)</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        className="form-control" 
                                        placeholder="Yeni şifreyi onaylayın" 
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold text-uppercase">
                                        <i className="bi bi-save2 me-2"></i>Bilgileri Kaydet
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer bg-light text-center py-3">
                            <small className="text-danger d-flex align-items-center justify-content-center">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                Not: Bilgilerinizi değiştirdikten sonra sistem güvenliğiniz için sizi otomatik olarak çıkışa yönlendirecektir.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}