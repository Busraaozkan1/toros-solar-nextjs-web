import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { uploadImage } from '@/lib/imageStorage';

function parsePriceTextToNumber(priceText) {
    const normalized = String(priceText || '').replace(',', '.');
    const match = normalized.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
}

// 1. LİSTELEME (GET) - Herkes erişebilir
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(products);
    } catch {
        return NextResponse.json({ message: "Ürünler getirilemedi" }, { status: 500 });
    }
}

// 2. EKLEME (POST) - Sadece Yetkili Admin
export async function POST(request) {
    try {
        // 1. Yetki Kontrolü (Admin mi?)
        const user = await getAuthUser();
        if (!user || user.role !== 'Admin') {
            return NextResponse.json({ message: "Bu işlem için yetkiniz yok!" }, { status: 403 });
        }

        const formData = await request.formData();
        const name = String(formData.get('name') || '').trim();
        const description = String(formData.get('description') || '').trim();
        const priceText = String(formData.get('priceText') || formData.get('price') || '').trim();

        if (!name || !description || !priceText) {
            return NextResponse.json({ message: 'Lutfen zorunlu alanlari doldurun.' }, { status: 400 });
        }

        const imageUrl = await uploadImage(formData.get('imageFile'), 'toros-solar/products');

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parsePriceTextToNumber(priceText),
                priceText,
                imageUrl
            }
        });

        return NextResponse.json({ success: true, product: newProduct });

    } catch (error) {
        return NextResponse.json({ 
            message: error instanceof Error ? error.message : 'Urun eklenirken bir hata olustu.'
        }, { status: 500 });
    }
}