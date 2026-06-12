import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { uploadImage } from '@/lib/imageStorage';

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
        if (!user || user.role !== 'Admin') {
            return NextResponse.json({ message: 'Bu islem icin yetkiniz yok!' }, { status: 403 });
        }

        const id = await getIdFromParams(params);
        const formData = await request.formData();

        const name = String(formData.get('name') || '').trim();
        const description = String(formData.get('description') || '').trim();
        const priceText = String(formData.get('priceText') || '').trim();
        const category = String(formData.get('category') || '').trim() || null;
        const currentImageUrl = String(formData.get('imageUrl') || '').trim() || null;
        const uploadedImageUrl = await uploadImage(formData.get('imageFile'), 'toros-solar/products');

        if (!name || !description || !priceText) {
            return NextResponse.json({ message: 'Lutfen zorunlu alanlari doldurun.' }, { status: 400 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: {
                name,
                description,
                price: parsePriceTextToNumber(priceText),
                priceText: priceText || null,
                category,
                imageUrl: uploadedImageUrl || currentImageUrl,
            }
        });

        return NextResponse.json({ success: true, updatedProduct });
    } catch (error) {
        return NextResponse.json({ message: error?.message || 'Guncelleme hatasi' }, { status: 500 });
    }
}

// 5. SİLME (DELETE)
export async function DELETE(request, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });

        const id = await getIdFromParams(params);

        await prisma.product.delete({ where: { id } });

        return NextResponse.json({ success: true, message: "Ürün silindi" });
    } catch (error) {
        return NextResponse.json({ message: error?.message || "Silme hatası" }, { status: 500 });
    }
}