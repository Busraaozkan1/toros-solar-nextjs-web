"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { register } from "@/app/actions/auth"; // Backend aksiyonunu içeri aldık
import { useRouter } from 'next/navigation'; // Yönlendirme için

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false); // Kayıt sırasında butonu pasif yapmak için

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);

        // 1. Client-side eşleşme kontrolü
        if (formData.password !== formData.confirmPassword) {
            setErrors(["Şifreler birbiriyle eşleşmiyor."]);
            setLoading(false);
            return;
        }

        // 2. Backend Action'ı çağırma (C#'taki Controller'a istek atmak gibi)
        const result = await register(formData);

        if (result?.error) {
            setErrors([result.error]);
            setLoading(false);
        } else {
            // Başarılıysa login sayfasına gönder
            router.push("/login");
        }
    };

    return (
        <div className="auth-page" style={{ 
            background: '#0f172a', 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="auth-card" style={{ 
                maxWidth: '600px', 
                width: '100%',
                background: 'rgba(30, 41, 59, 0.7)',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
            }}>
                <div className="auth-header text-center mb-4">
                    <h2 className="text-white fw-bold">Kayıt Talebi</h2>
                    <p className="text-white-50">TorosSolar ailesine katılmak için formu doldurun</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className="alert alert-danger small mb-3 py-2 text-red-400 bg-red-900/20 border border-red-900/50 rounded">
                            <ul className="mb-0 px-3">
                                {errors.map((err, index) => <li key={index}>{err}</li>)}
                            </ul>
                        </div>
                    )}

                    <div className="row text-start">
                        <div className="col-md-6 mb-3">
                            <label className="text-white-50 small mb-1">Ad Soyad</label>
                            <input 
                                name="fullName"
                                className="form-control premium-input w-full" 
                                style={premiumInputStyle}
                                placeholder="İbrahim Özkan" 
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="text-white-50 small mb-1">E-posta</label>
                            <input 
                                name="email"
                                type="email"
                                className="form-control premium-input w-full" 
                                style={premiumInputStyle}
                                placeholder="ornek@mail.com" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="text-white-50 small mb-1">Kullanıcı Adı</label>
                            <input 
                                name="username"
                                className="form-control premium-input w-full" 
                                style={premiumInputStyle}
                                placeholder="ibrahimözkan" 
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="text-white-50 small mb-1">Şifre</label>
                            <input 
                                name="password"
                                type="password" 
                                className="form-control premium-input w-full" 
                                style={premiumInputStyle}
                                placeholder="••••••••" 
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <label className="text-white-50 small mb-1">Şifre Tekrar</label>
                            <input 
                                name="confirmPassword"
                                type="password" 
                                className="form-control premium-input w-full" 
                                style={premiumInputStyle}
                                placeholder="••••••••" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-premium w-100 mb-3 py-3 fw-bold uppercase tracking-wider" 
                        style={{
                            background: loading ? '#666' : 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)',
                            border: 'none',
                            color: 'white',
                            borderRadius: '12px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'KAYDEDİLİYOR...' : 'KAYIT OL'}
                    </button>

                    <div className="text-center">
                        <Link href="/login" className="text-white-50 small text-decoration-none hover:text-white transition">
                             Giriş Sayfasına Dön
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const premiumInputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderRadius: '10px',
    padding: '12px'
};