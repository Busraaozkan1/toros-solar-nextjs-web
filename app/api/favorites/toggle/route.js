import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth'; // Token'dan kullanıcıyı çeken fonksiyonunuz

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        // 1. Yetki Kontrolü ([Authorize] karşılığı)
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "Lütfen önce giriş yapın." 
            }, { status: 401 });
        }

        const body = await request.json();
        const { productId } = body;
        const parsedProductId = parseInt(String(productId), 10);

        if (!productId || Number.isNaN(parsedProductId)) {
            return NextResponse.json({ 
                success: false, 
                message: "Ürün bilgisi eksik." 
            }, { status: 400 });
        }

        // 2. Ürün Gerçekten Var mı? (AnyAsync karşılığı)
        const productExists = await prisma.product.findUnique({
            where: { id: parsedProductId }
        });

        if (!productExists) {
            return NextResponse.json({ 
                success: false, 
                message: "Ürün bulunamadı." 
            }, { status: 404 });
        }

        // 3. Mevcut Favori Kontrolü (FirstOrDefaultAsync karşılığı)
        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                productId: parsedProductId,
                userId: user.id
            }
        });

        if (existingFavorite) {
            // 4. Varsa Kaldır (Remove & SaveChanges)
            await prisma.favorite.delete({
                where: { id: existingFavorite.id }
            });
            return NextResponse.json({ 
                success: true, 
                action: "removed", 
                message: "Favorilerden kaldırıldı." 
            });
        } else {
            // 5. Yoksa Ekle (Add & SaveChanges)
            await prisma.favorite.create({
                data: {
                    productId: parsedProductId,
                    userId: user.id
                }
            });
            return NextResponse.json({ 
                success: true, 
                action: "added", 
                message: "Favorilere eklendi!" 
            });
        }

    } catch (error) {
        console.error("Favori hatası:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Sistem hatası: " + error.message 
        }, { status: 500 });
    }
}