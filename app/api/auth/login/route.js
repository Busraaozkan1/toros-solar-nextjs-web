import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { verifyAdminCredentials } from '@/lib/adminAuth';

export const runtime = 'nodejs';

// Sadece admin girisi. Kullanici hesaplari kaldirildi.
export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password, securityAnswer, number1, number2 } = body;

        // Guvenlik sorusu (basit bot engeli)
        if (parseInt(securityAnswer) !== (parseInt(number1) + parseInt(number2))) {
            return NextResponse.json({ message: 'Güvenlik sorusu hatalı!' }, { status: 400 });
        }

        const isValid = await verifyAdminCredentials(username, password);
        if (!isValid) {
            return NextResponse.json({ message: 'Kullanıcı adı veya şifre hatalı!' }, { status: 401 });
        }

        const jwtSecret = (process.env.JWT_SECRET || '').trim() || 'dev-only-change-this-secret';
        const secret = new TextEncoder().encode(jwtSecret);
        const token = await new SignJWT({
            id: 0,
            username: username,
            role: 'Admin'
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return NextResponse.json({ success: true, role: 'Admin' });
    } catch (error) {
        return NextResponse.json({ message: error?.message || 'Bir hata oluştu' }, { status: 500 });
    }
}
