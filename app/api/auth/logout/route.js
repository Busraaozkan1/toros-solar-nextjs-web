import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
}

export async function POST() {
    await clearAuthCookie();
    return NextResponse.json({ success: true });
}

export async function GET(request) {
    await clearAuthCookie();

    const { searchParams } = new URL(request.url);
    const next = searchParams.get('next') || '/admin/login';

    return NextResponse.redirect(new URL(next, request.url));
}