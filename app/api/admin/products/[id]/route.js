import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export const runtime = 'nodejs';

function parsePriceTextToNumber(priceText) {
    const normalized = String(priceText || '').replace(',', '.');
    const match = normalized.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
}

async function getIdFromParams(paramsPromise) {
    const params = await paramsPromise;
    return parseInt(params.id, 10);
}

// 3. DETAY (GET)
export async function GET(request, { params }) {
    const id = await getIdFromParams(params);

    const product = await prisma.product.findUnique({
        where: { id }
    });
    if (!product) return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
    return NextResponse.json(product);
}

// 4. GÜNCELLEME (PUT - Edit)
export async function PUT(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });

        const body = await request.json();
        const id = await getIdFromParams(params);
        const priceText = String(body.priceText || '').trim();

        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: {
                name: body.name,
                description: body.description,
                price: parsePriceTextToNumber(priceText),
                priceText: priceText || null,
                imageUrl: body.imageUrl, // Resim değişmediyse eski URL'yi gönderin
            }
        });

        return NextResponse.json({ success: true, updatedProduct });
    } catch (error) {
        return NextResponse.json({ message: "Güncelleme hatası" }, { status: 500 });
    }
}

// 5. SİLME (DELETE)
export async function DELETE(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });

        const id = await getIdFromParams(params);

        await prisma.$transaction([
            prisma.favorite.deleteMany({ where: { productId: id } }),
            prisma.product.delete({ where: { id } })
        ]);

        return NextResponse.json({ success: true, message: "Ürün silindi" });
    } catch (error) {
        return NextResponse.json({ message: error?.message || "Silme hatası" }, { status: 500 });
    }
}