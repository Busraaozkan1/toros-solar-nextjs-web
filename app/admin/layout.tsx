"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Aktif link kontrolü (active class eklemek için)
    const isActive = (path: string) => pathname === path ? 'active' : '';

    return (
        <div className="admin-wrapper" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            {/* CSS Stilleri Orijinal Koddan Alındı */}
            <style jsx global>{`
                body { background-color: #f4f7f6 !important; }
                .sidebar { min-height: 100vh; background: #2c3e50; color: white; padding-top: 20px; }
                .sidebar a { color: #bdc3c7; text-decoration: none; padding: 15px; display: block; transition: 0.3s; }
                .sidebar a:hover { background: #34495e; color: white; border-left: 4px solid #3498db; }
                .sidebar a.active { background: #34495e; color: white; border-left: 4px solid #f1c40f; }
                .main-content { padding: 30px; }
                .card { border: none; box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); }
            `}</style>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar Menüsü */}
                    <nav className="col-md-2 d-none d-md-block sidebar">
                        <div className="text-center mb-4">
                            <h4 className="text-primary fw-bold">TorosSolar</h4>
                            <small className="text-white-50">Admin Paneli</small>
                        </div>
                        
                        <Link href="/admin/product" className={isActive('/admin/product')}>
                            <i className="bi bi-boxes me-2"></i> Ürün Yönetimi
                        </Link>
                        
                        <Link href="/admin/product/create" className={isActive('/admin/product/create')}>
                            <i className="bi bi-plus-circle me-2"></i> Yeni Ürün Ekle
                        </Link>

                        <Link href="/admin/project" className={isActive('/admin/project')}>
                            <i className="bi bi-building me-2"></i> Proje Yönetimi
                        </Link>

                        <Link href="/admin/project/create" className={isActive('/admin/project/create')}>
                            <i className="bi bi-stars me-2"></i> Yeni Proje Ekle
                        </Link>
                        
                        <Link href="/admin/change-password" className={isActive('/admin/change-password')}>
                            <i className="bi bi-key me-2"></i> Şifre Değiştir
                        </Link>
                        
                        {/* Logout - Alt kısma sabitlemek için mt-5 ve text-danger korundu */}
                        <Link href="/api/auth/logout?next=/admin/login" className="mt-5 text-danger border-0">
                            <i className="bi bi-sign-out-alt me-2"></i> Çıkış Yap
                        </Link>
                    </nav>

                    {/* Ana İçerik Alanı (RenderBody karşılığı) */}
                    <main className="col-md-10 main-content">
                        <div className="card p-4">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}