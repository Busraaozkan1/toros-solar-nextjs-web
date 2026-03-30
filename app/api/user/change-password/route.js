import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(request) {
    const authUser = await getAuthUser();
    const { newUsername, newPassword, confirmPassword } = await request.json();

    if (newPassword !== confirmPassword) {
        return NextResponse.json({ message: "Şifreler eşleşmiyor" }, { status: 400 });
    }

    const user = await prisma.user.update({
        where: { id: authUser.id },
        data: { username: newUsername, password: newPassword }
    });

    return NextResponse.json({ success: true });
}