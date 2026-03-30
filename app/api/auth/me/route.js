import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false });
        }

        const jwtSecret = (process.env.JWT_SECRET || '').trim() || 'dev-only-change-this-secret';
        const secret = new TextEncoder().encode(jwtSecret);
        const { payload } = await jwtVerify(token, secret);

        return NextResponse.json({
            authenticated: true,
            role: payload?.role || 'User',
            username: payload?.username || null
        });
    } catch {
        return NextResponse.json({ authenticated: false });
    }
}
