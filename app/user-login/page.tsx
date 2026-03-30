"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ResetPasswordModal from '../components/ResetPasswordModal';
import { login } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function UserLoginPage() {
    const router = useRouter();
    const [nextPath, setNextPath] = useState('/');
    // Form State Yönetimi
    const [formData, setFormData] = useState(() => ({
        username: '',
        password: '',
        securityAnswer: '',
        number1: 0,
        number2: 0
    }));

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshSecurityNumbers = () => {
        setFormData((prev) => ({
            ...prev,
            number1: Math.floor(Math.random() * 10) + 1,
            number2: Math.floor(Math.random() * 10) + 1,
            securityAnswer: ''
        }));
    };

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            refreshSecurityNumbers();

            const params = new URLSearchParams(window.location.search);
            const nextValue = params.get('next');
            setNextPath(nextValue && nextValue.startsWith('/') ? nextValue : '/');
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Güvenlik sorusu kontrolü
        if (parseInt(formData.securityAnswer) !== (formData.number1 + formData.number2)) {
            setError("Güvenlik sorusunun cevabı yanlış!");
            refreshSecurityNumbers();
            setLoading(false);
            return;
        }

        const result = await login({ ...formData, portal: 'user' });

        if (result?.error) {
            setError(result.error);
            refreshSecurityNumbers();
            setLoading(false);
            return;
        }

        router.push(nextPath);
    };

    return (
        <div className="auth-page" style={pageStyle}>
            <div className="auth-card" style={cardStyle}>
                <div className="auth-header text-center mb-4">
                    <img src="/img/logo.png" alt="TorosSolar" style={{ maxHeight: '50px' }} className="mb-3" />
                    <h2 className="text-white fw-bold">Hoş Geldiniz</h2>
                    <p className="text-white-50">Sürdürülebilir enerjiye giriş yapın</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-danger small py-2 text-center" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-3 text-start">
                        <label className="text-white-50 small mb-1">Kullanıcı Adı veya E-posta</label>
                        <div className="input-group" style={inputGroupStyle}>
                            <span className="input-group-text bg-transparent border-0 text-white-50">
                                <i className="bi bi-person"></i>
                            </span>
                            <input 
                                name="username"
                                className="form-control premium-input" 
                                style={premiumInputStyle}
                                placeholder="admin" 
                                value={formData.username}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>

                    <div className="mb-3 text-start">
                        <label className="text-white-50 small mb-1">Şifre</label>
                        <div className="input-group" style={inputGroupStyle}>
                            <span className="input-group-text bg-transparent border-0 text-white-50">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input 
                                name="password"
                                type="password" 
                                className="form-control premium-input" 
                                style={premiumInputStyle}
                                placeholder="••••••••" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="text-end mt-1">
                            <button 
                                type="button"
                                className="btn btn-link text-warning text-decoration-none small p-0 border-0"
                                data-bs-toggle="modal" 
                                data-bs-target="#resetPasswordModal"
                            >
                                Şifremi Unuttum?
                            </button>
                        </div>
                    </div>

                    <div className="security-box text-center p-3 mb-4" style={securityBoxStyle}>
                        <span className="small d-block text-white-50 mb-1">GÜVENLİK DOĞRULAMASI</span>
                        <span className="text-white fs-5 fw-bold">
                            {formData.number1} + {formData.number2} = ?
                        </span>
                        <input 
                            name="securityAnswer"
                            className="form-control premium-input mt-2 text-center" 
                            style={premiumInputStyle}
                            placeholder="Sonucu buraya yazın" 
                            value={formData.securityAnswer}
                            onChange={handleChange}
                            required 
                        />
                        <input type="hidden" name="number1" value={formData.number1} />
                        <input type="hidden" name="number2" value={formData.number2} />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-premium w-100 mb-3 py-3 fw-bold" style={btnPremiumStyle}>
                        {loading ? 'GIRIS YAPILIYOR...' : 'GIRIS YAP'}
                    </button>

                    <div className="text-center">
                        <p className="text-white-50 small">
                            Henüz hesabınız yok mu? <Link href="/register" className="text-warning fw-bold text-decoration-none ms-1">Kayıt Talebi Gönder</Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Şifre Sıfırlama Modalı (Daha önce oluşturduğumuz bileşen) */}
            <ResetPasswordModal />
        </div>
    );
}

// --- Tasarım Nesneleri (Styles) ---

const pageStyle = {
    background: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
};

const cardStyle = {
    maxWidth: '450px',
    width: '100%',
    background: 'rgba(30, 41, 59, 0.7)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)'
};

const inputGroupStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
};

const premiumInputStyle = {
    background: 'transparent',
    border: 'none',
    color: 'white',
    padding: '12px'
};

const securityBoxStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: '1px dashed rgba(255, 255, 255, 0.2)'
};

const btnPremiumStyle = {
    background: 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)',
    border: 'none',
    color: 'white',
    borderRadius: '12px'
};