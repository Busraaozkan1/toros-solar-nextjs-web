import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth'; // Token'dan kullanıcı çeken yardımcı fonksiyon

export const runtime = 'nodejs';

export async function GET() {
    const user = await getAuthUser();
    if (!user) {
        return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
        where: { userId: user.id },
        include: {
            product: true
        },
        orderBy: { id: 'desc' }
    });

    const favoriteProducts = favorites.map((item) => item.product);
    return NextResponse.json(favoriteProducts);
}

export async function POST(request) {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });

    const { productId } = await request.json();
    const parsedProductId = parseInt(String(productId), 10);

    if (Number.isNaN(parsedProductId)) {
        return NextResponse.json({ message: 'Gecersiz urun.' }, { status: 400 });
    }

    const existing = await prisma.favorite.findFirst({
        where: { productId: parsedProductId, userId: user.id }
    });

    if (existing) {
        await prisma.favorite.delete({ where: { id: existing.id } });
        return NextResponse.json({ success: true, action: "removed" });
    } else {
        await prisma.favorite.create({
            data: { productId: parsedProductId, userId: user.id }
        });
        return NextResponse.json({ success: true, action: "added" });
    }
}