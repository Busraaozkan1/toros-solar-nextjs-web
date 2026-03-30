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

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json(projects.map(normalizeProject));
    } catch {
        return NextResponse.json({ message: 'Projeler cekilemedi.' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const user = await getAuthUser();
        if (!user || user.role !== 'Admin') {
            return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });
        }

        const formData = await request.formData();
        const name = String(formData.get('name') || '').trim();
        const description = String(formData.get('description') || '').trim();

        if (!name || !description) {
            return NextResponse.json({ message: 'Lutfen zorunlu alanlari doldurun.' }, { status: 400 });
        }

        let imageUrl = null;
        const imageFile = formData.get('imageFile');
        imageUrl = await uploadImage(imageFile, 'toros-solar/projects');

        const createdProject = await prisma.project.create({
            data: {
                name,
                description,
                imageUrl
            }
        });

        return NextResponse.json({ success: true, project: normalizeProject(createdProject) }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Proje kaydedilemedi.' }, { status: 500 });
    }
}