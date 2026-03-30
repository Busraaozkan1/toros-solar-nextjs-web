"use client";

import React, { useState } from 'react';

export default function AdminChangePasswordPage() {
    const [formData, setFormData] = useState({
        newUsername: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Yeni sifreler birbiriyle eslesmiyor.');
            setLoading(false);
            return;
        }

        const response = await fetch('/api/admin/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                currentPassword: formData.currentPassword,
                newUsername: formData.newUsername,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            setError(data?.message || 'Islem basarisiz oldu.');
            setLoading(false);
            return;
        }

        setMessage('Admin bilgileri guncellendi. Yeni bilgilerle tekrar giris yapabilirsiniz.');
        setFormData({
            newUsername: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setLoading(false);
    };

    return (
        <div className="container py-4">
            <h3 className="mb-4 text-dark">Admin Sifre ve Kullanici Adi Guncelle</h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <form onSubmit={handleSubmit} className="row g-3 text-start">
                <div className="col-md-6">
                    <label className="form-label fw-bold">Yeni Admin Kullanici Adi</label>
                    <input
                        type="text"
                        name="newUsername"
                        className="form-control"
                        value={formData.newUsername}
                        onChange={handleChange}
                        placeholder="ornek: kerimuzun"
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-bold">Mevcut Admin Sifresi</label>
                    <input
                        type="password"
                        name="currentPassword"
                        className="form-control"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-bold">Yeni Sifre</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-bold">Yeni Sifre (Tekrar)</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                        {loading ? 'Kaydediliyor...' : 'Admin Bilgilerini Guncelle'}
                    </button>
                </div>
            </form>
        </div>
    );
}
