import { NextResponse } from 'next/server';
import { updateAdminCredentials } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request) {
    try {
        const body = await request.json();
        const { currentPassword, newUsername, newPassword, confirmPassword } = body;

        if (!currentPassword || !newUsername || !newPassword || !confirmPassword) {
            return NextResponse.json({ message: 'Tum alanlar zorunludur.' }, { status: 400 });
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json({ message: 'Yeni sifreler eslesmiyor.' }, { status: 400 });
        }

        const result = await updateAdminCredentials({
            currentPassword,
            newUsername,
            newPassword
        });

        if (!result.success) {
            return NextResponse.json({ message: result.message || 'Sifre degistirilemedi.' }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: 'Admin bilgileri guncellendi.' });
    } catch (error) {
        return NextResponse.json({ message: error?.message || 'Islem sirasinda bir hata olustu.' }, { status: 500 });
    }
}
