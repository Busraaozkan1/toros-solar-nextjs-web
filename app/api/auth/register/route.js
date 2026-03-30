import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { fullName, username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: 'Zorunlu alanlar eksik.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ username }, { email }] }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Bu kullanıcı adı veya e-posta zaten alınmış." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ success: true, message: "Kayıt başarıyla oluşturuldu." });
    } catch {
        return NextResponse.json({ message: "Kayıt sırasında hata oluştu." }, { status: 500 });
    }
}