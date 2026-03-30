import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/imageStorage';
import { getAuthUser } from '@/lib/auth';

function parsePriceTextToNumber(priceText) {
    const normalized = String(priceText || '').replace(',', '.');
    const match = normalized.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        const normalizedProducts = products.map((item) => ({
            ...item,
            imageUrl: typeof item.imageUrl === 'string' && item.imageUrl.trim() === '' ? null : item.imageUrl
        }));

        return NextResponse.json(normalizedProducts);
    } catch {
        return NextResponse.json({ message: 'Urunler cekilemedi.' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const user = await getAuthUser();
        if (!user || user.role !== 'Admin') {
            return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
        }

        const formData = await request.formData();
        const name = String(formData.get('name') || '').trim();
        const description = String(formData.get('description') || '').trim();
        const priceText = String(formData.get('priceText') || '').trim();
        const price = parsePriceTextToNumber(priceText);

        if (!name || !description || !priceText) {
            return NextResponse.json({ message: 'Lutfen zorunlu alanlari dogru doldurun.' }, { status: 400 });
        }

        let imageUrl = null;
        const imageFile = formData.get('imageFile');
        imageUrl = await uploadImage(imageFile, 'toros-solar/products');

        const created = await prisma.product.create({
            data: {
                name,
                description,
                price,
                priceText,
                imageUrl
            }
        });

        return NextResponse.json({ success: true, product: created }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Urun kaydedilemedi.' }, { status: 500 });
    }
}
