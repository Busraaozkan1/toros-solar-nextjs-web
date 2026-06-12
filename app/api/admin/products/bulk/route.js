import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/imageStorage';
import { getAuthUser } from '@/lib/auth';

export const runtime = 'nodejs';

function parsePriceTextToNumber(priceText) {
    const normalized = String(priceText || '').replace(',', '.');
    const match = normalized.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
}

export async function POST(request) {
    try {
        const user = await getAuthUser();
        if (!user || user.role !== 'Admin') {
            return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
        }

        const formData = await request.formData();

        let rows;
        try {
            rows = JSON.parse(String(formData.get('rows') || '[]'));
        } catch {
            return NextResponse.json({ message: 'Satir verisi okunamadi.' }, { status: 400 });
        }

        if (!Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json({ message: 'Ice aktarilacak satir yok.' }, { status: 400 });
        }

        if (rows.length > 200) {
            return NextResponse.json({ message: 'Tek seferde en fazla 200 satir ice aktarilabilir.' }, { status: 400 });
        }

        // Gorselleri dosya adina gore eslestir
        const imageFiles = formData.getAll('images').filter((f) => f && typeof f !== 'string');
        const imagesByName = new Map(imageFiles.map((f) => [String(f.name).toLowerCase(), f]));

        const results = [];

        for (const [index, row] of rows.entries()) {
            const name = String(row?.name || '').trim();
            const description = String(row?.description || '').trim();
            const priceText = String(row?.priceText || '').trim();
            const category = String(row?.category || '').trim() || null;
            const imageFilename = String(row?.imageFilename || '').trim().toLowerCase();

            if (!name || !description || !priceText) {
                results.push({ index, name: name || `Satir ${index + 1}`, success: false, message: 'name, priceText ve description zorunlu.' });
                continue;
            }

            try {
                let imageUrl = null;
                if (imageFilename && imagesByName.has(imageFilename)) {
                    imageUrl = await uploadImage(imagesByName.get(imageFilename), 'toros-solar/products');
                } else if (imageFilename && /^https?:\/\//i.test(String(row.imageFilename).trim())) {
                    imageUrl = String(row.imageFilename).trim();
                }

                const created = await prisma.product.create({
                    data: {
                        name,
                        description,
                        priceText,
                        price: parsePriceTextToNumber(priceText),
                        category,
                        imageUrl
                    }
                });

                results.push({ index, name, success: true, id: created.id, hasImage: Boolean(imageUrl) });
            } catch (error) {
                results.push({
                    index,
                    name,
                    success: false,
                    message: error instanceof Error ? error.message : 'Kaydedilemedi.'
                });
            }
        }

        const succeeded = results.filter((r) => r.success).length;
        return NextResponse.json({ total: rows.length, succeeded, failed: rows.length - succeeded, results });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Toplu ice aktarma basarisiz.' },
            { status: 500 }
        );
    }
}
