"use client";

import React, { useState } from 'react';

type BootstrapModalInstance = {
    hide: () => void;
};

type BootstrapModalApi = {
    getInstance: (element: HTMLElement | null) => BootstrapModalInstance | null;
};

type BootstrapWindow = Window & {
    bootstrap?: {
        Modal: BootstrapModalApi;
    };
};

export default function ResetPasswordModal() {
    const [email, setEmail] = useState("");

    const sendResetRequest = () => {
        // Razor'daki String.fromCharCode(64) yerine doğrudan '@' kullanıyoruz
        if (email && email.includes('@')) {
            alert("Sıfırlama bağlantısı gönderildi: " + email);
            
            // Bootstrap Modal'ı kapatma işlemi
            const modalElement = document.getElementById('resetPasswordModal');
            const win = window as BootstrapWindow;
            if (typeof window !== 'undefined' && win.bootstrap) {
                const modalInstance = win.bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) modalInstance.hide();
            }
        } else {
            alert("Lütfen geçerli bir e-posta adresi giriniz.");
        }
    };

    return (
        <div className="modal fade" id="resetPasswordModal" tabIndex={-1} aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                    
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title text-white fw-bold" id="resetPasswordModalLabel">Şifremi Unuttum</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Kapat"></button>
                    </div>

                    <div className="modal-body p-4 text-center">
                        <div className="mb-3">
                            <i className="bi bi-shield-lock-fill text-warning" style={{ fontSize: '3.5rem' }}></i>
                        </div>
                        
                        <p className="text-white-50 small mb-4">
                            Kayıtlı e-posta adresinizi girin, size şifre sıfırlama talimatlarını gönderelim.
                        </p>
                        
                        <div className="mb-3 text-start">
                            <label className="text-white-50 small ms-2 mb-1">E-posta Adresi</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    borderRadius: '0.75rem',
                                    padding: '0.8rem'
                                }} 
                                placeholder="ornek@torossolar.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            type="button" 
                            className="btn w-100 text-white fw-bold mt-2" 
                            style={{
                                background: 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)',
                                border: 'none',
                                borderRadius: '0.75rem',
                                padding: '0.8rem'
                            }}
                            onClick={sendResetRequest}
                        >
                            TALEP GÖNDER
                        </button>
                    </div>
                    
                    <div className="modal-footer border-0 justify-content-center pb-4 pt-0">
                        <button type="button" className="btn btn-link text-white-50 text-decoration-none small" data-bs-dismiss="modal">
                            Vazgeç ve Giriş Ekranına Dön
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}