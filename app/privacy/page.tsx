"use client";

import React from 'react';

export default function PrivacyPage() {
    return (
        <main style={{ paddingTop: '100px', minHeight: '80vh' }} className="text-white">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* ViewData["Title"] karşılığı */}
                        <h1 className="display-4 fw-bold mb-4 text-gold">Gizlilik Politikası</h1>
                        
                        <div className="contact-card p-5 border-gold-thin bg-darker rounded-3 shadow-lg">
                            <p className="lead text-gray mb-4">
                                Sitemizin gizlilik politikasını detaylandırmak için bu sayfayı kullanın.
                            </p>
                            
                            <hr className="border-secondary opacity-25 mb-4" />
                            
                            <div className="privacy-content text-white opacity-75">
                                <p>
                                    Toros Solar olarak, ziyaretçilerimizin gizliliğine önem veriyoruz. 
                                    Bu sayfa, verilerinizin nasıl toplandığı ve korunduğu hakkında bilgi içerir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}