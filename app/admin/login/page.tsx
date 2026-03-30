"use client";

import React, { useEffect, useState } from 'react';
import { login } from '@/app/actions/auth';

function createSecurityNumbers() {
    return {
        number1: Math.floor(Math.random() * 10) + 1,
        number2: Math.floor(Math.random() * 10) + 1
    };
}

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        securityAnswer: '',
        number1: 0,
        number2: 0
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const initialNumbers = createSecurityNumbers();
            setFormData((prev) => ({
                ...prev,
                number1: initialNumbers.number1,
                number2: initialNumbers.number2
            }));
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const refreshSecurityNumbers = () => {
        const nextNumbers = createSecurityNumbers();
        setFormData((prev) => ({
            ...prev,
            number1: nextNumbers.number1,
            number2: nextNumbers.number2,
            securityAnswer: ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const total = formData.number1 + formData.number2;
        if (parseInt(formData.securityAnswer, 10) !== total) {
            setError('Guvenlik sorusunun cevabi yanlis.');
            refreshSecurityNumbers();
            setLoading(false);
            return;
        }

        const result = await login({ ...formData, portal: 'admin' });

        if (result?.error) {
            setError(result.error);
            refreshSecurityNumbers();
            setLoading(false);
            return;
        }

        if (result?.role !== 'Admin') {
            setError('Bu sayfaya sadece admin giris yapabilir.');
            setLoading(false);
            return;
        }

        // Cookie'nin middleware tarafından okunabilmesi için tam sayfa yüklemesi yapiyoruz
        window.location.href = '/admin/product';
    };

    return (
        <div
            style={{
                background: '#1f2937',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <div
                style={{
                    background: 'white',
                    padding: '36px',
                    borderRadius: '14px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.28)',
                    width: '100%',
                    maxWidth: '420px'
                }}
            >
                <h3 className="text-center mb-4 text-dark">Admin Girisi</h3>

                {error && (
                    <div className="alert alert-danger small py-2 text-center mb-3" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label className="form-label text-dark">Kullanici Adi</label>
                        <input
                            name="username"
                            className="form-control"
                            placeholder="admin"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label text-dark">Sifre</label>
                        <input
                            name="password"
                            className="form-control"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 p-3 bg-light border rounded text-center">
                        <label className="form-label d-block fw-bold text-primary">Guvenlik Sorusu</label>
                        <span className="fs-5 text-dark">
                            {formData.number1} + {formData.number2} = ?
                        </span>
                        <input
                            name="securityAnswer"
                            className="form-control mt-2 text-center"
                            placeholder="Sonucu yazin"
                            value={formData.securityAnswer}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-100 py-2 fw-bold text-white"
                        style={{
                            background: loading ? '#9ca3af' : '#2563eb',
                            border: 'none',
                            borderRadius: '8px'
                        }}
                    >
                        {loading ? 'Kontrol Ediliyor...' : 'Admin Girisi'}
                    </button>
                </form>
            </div>
        </div>
    );
}
