import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // Admin login sayfasi haric tum admin sayfalari icin admin token zorunlu.
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('next', `${pathname}${search}`);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const jwtSecret = (process.env.JWT_SECRET || '').trim() || 'dev-only-change-this-secret';
            const secret = new TextEncoder().encode(jwtSecret);
            const { payload } = await jwtVerify(token, secret);

            if (payload?.role !== 'Admin') {
                const loginUrl = new URL('/admin/login', request.url);
                loginUrl.searchParams.set('next', `${pathname}${search}`);
                return NextResponse.redirect(loginUrl);
            }
        } catch {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('next', `${pathname}${search}`);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
};