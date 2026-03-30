import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { uploadImage } from '@/lib/imageStorage';

export const runtime = 'nodejs';

function normalizeProject(project) {
    return {
        ...project,
        imageUrl: typeof project.imageUrl === 'string' && project.imageUrl.trim() === '' ? null : project.imageUrl
    };
}

async function getIdFromParams(paramsPromise) {
    const params = await paramsPromise;
    return parseInt(params.id, 10);
}

async function requireAdmin() {
    const user = await getAuthUser();
    return Boolean(user && user.role === 'Admin');
}

export async function GET(request, { params }) {
    if (!(await requireAdmin())) {
        return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
    }

    const id = await getIdFromParams(params);
    const project = await prisma.project.findUnique({
        where: { id }
    });

    if (!project) {
        return NextResponse.json({ message: 'Proje bulunamadi' }, { status: 404 });
    }

    return NextResponse.json(normalizeProject(project));
}

export async function PUT(request, { params }) {
    try {
        if (!(await requireAdmin())) {
            return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
        }

        const id = await getIdFromParams(params);
        const formData = await request.formData();
        const name = String(formData.get('name') || '').trim();
        const description = String(formData.get('description') || '').trim();
        const currentImageUrl = String(formData.get('imageUrl') || '').trim();

        if (!name || !description) {
            return NextResponse.json({ message: 'Lutfen zorunlu alanlari doldurun.' }, { status: 400 });
        }

        let imageUrl = currentImageUrl || null;
        const imageFile = formData.get('imageFile');

        if (imageFile && typeof imageFile !== 'string' && imageFile.size > 0) {
            imageUrl = await uploadImage(imageFile, 'toros-solar/projects');
        }

        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                name,
                description,
                imageUrl
            }
        });

        return NextResponse.json({ success: true, project: normalizeProject(updatedProject) });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Guncelleme hatasi' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        if (!(await requireAdmin())) {
            return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
        }

        const id = await getIdFromParams(params);

        await prisma.project.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: 'Proje silindi' });
    } catch {
        return NextResponse.json({ message: 'Silme hatasi' }, { status: 500 });
    }
}