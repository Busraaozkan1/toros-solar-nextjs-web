import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Prisma kullandığını varsayıyoruz
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getAdminUsername, verifyAdminCredentials } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password, securityAnswer, number1, number2 } = body;
        const portal = String(body?.portal || 'user').toLowerCase();

        // 1. Güvenlik Sorusu Kontrolü
        if (parseInt(securityAnswer) !== (parseInt(number1) + parseInt(number2))) {
            return NextResponse.json({ message: "Güvenlik sorusu hatalı!" }, { status: 400 });
        }

        const adminUsername = await getAdminUsername();
        const isAdminLoginAttempt = String(username).trim().toLowerCase() === String(adminUsername).trim().toLowerCase();

        if (portal !== 'admin' && portal !== 'user') {
            return NextResponse.json({ message: 'Gecersiz giris kaynagi.' }, { status: 400 });
        }

        if (portal === 'user' && isAdminLoginAttempt) {
            return NextResponse.json({ message: 'Kullanici adi veya sifre hatali!' }, { status: 401 });
        }

        if (portal === 'admin' && !isAdminLoginAttempt) {
            return NextResponse.json({ message: 'Bu giris paneli sadece admin hesabi icindir.' }, { status: 403 });
        }

        let user = null;
        let role = "User";

        if (isAdminLoginAttempt) {
            const isAdminPasswordValid = await verifyAdminCredentials(username, password);
            if (!isAdminPasswordValid) {
                return NextResponse.json({ message: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
            }

            role = "Admin";
        } else {
            // 2. Kullanıcıyı Veritabanında Ara
            user = await prisma.user.findFirst({
                where: { username: username }
            });

            if (!user) {
                return NextResponse.json({ message: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
            }

            // Eski plaintext kayıtlar için fallback bırakıyoruz.
            const isPasswordCorrect = (await bcrypt.compare(password, user.password)) || user.password === password;
            if (!isPasswordCorrect) {
                return NextResponse.json({ message: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
            }
        }

        // 3. JWT Token Oluştur (Claims mantığı)
        const jwtSecret = (process.env.JWT_SECRET || '').trim() || 'dev-only-change-this-secret';
        const secret = new TextEncoder().encode(jwtSecret);
        const token = await new SignJWT({ 
            id: user?.id || 0, 
            username: username, 
            role: role 
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        // 4. Cookie'ye Kaydet (SignInAsync karşılığı)
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 gün
            path: '/',
        });

        return NextResponse.json({ success: true, role });

    } catch (error) {
        return NextResponse.json({ message: error?.message || "Bir hata oluştu" }, { status: 500 });
    }
}