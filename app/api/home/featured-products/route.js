import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // En yeni eklenen 6 ürünü çekiyoruz (OrderByDescending & Take(6))
        const featuredProducts = await prisma.product.findMany({
            take: 6,
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json(featuredProducts);
    } catch (error) {
        return NextResponse.json({ message: "Ürünler çekilemedi" }, { status: 500 });
    }
}