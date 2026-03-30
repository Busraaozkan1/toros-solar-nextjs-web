import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getAuthUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return null;
        }

        const jwtSecret = (process.env.JWT_SECRET || '').trim() || 'dev-only-change-this-secret';
        const secret = new TextEncoder().encode(jwtSecret);
        const { payload } = await jwtVerify(token, secret);

        return {
            id: Number(payload?.id || 0),
            username: payload?.username || null,
            role: payload?.role || 'User'
        };
    } catch {
        return null;
    }
}
