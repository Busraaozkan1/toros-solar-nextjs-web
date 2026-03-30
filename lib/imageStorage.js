import { v2 as cloudinary } from 'cloudinary';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';

const cloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME
    && process.env.CLOUDINARY_API_KEY
    && process.env.CLOUDINARY_API_SECRET
);

if (cloudinaryConfigured) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}

function sanitizeFileName(fileName) {
    return String(fileName || 'image')
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase() || 'image';
}

function getExtension(file) {
    const originalExtension = String(file?.name || '').split('.').pop();
    if (originalExtension && originalExtension !== file?.name) {
        return originalExtension.toLowerCase();
    }

    const mimeExtension = String(file?.type || '').split('/').pop();
    return mimeExtension ? mimeExtension.toLowerCase() : 'jpg';
}

async function uploadToCloudinary(buffer, file, folder) {
    const publicId = `${Date.now()}-${sanitizeFileName(file.name)}`;

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: publicId,
                resource_type: 'image'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result.secure_url);
            }
        );

        Readable.from(buffer).pipe(stream);
    });
}

async function saveToLocalPublic(buffer, file) {
    const extension = getExtension(file);
    const fileName = `${Date.now()}_${sanitizeFileName(file.name)}.${extension}`;
    const outputDir = path.join(process.cwd(), 'public', 'img');
    const outputPath = path.join(outputDir, fileName);

    await mkdir(outputDir, { recursive: true });
    await writeFile(outputPath, buffer);

    return `/img/${fileName}`;
}

export async function uploadImage(file, folder = 'toros-solar') {
    if (!file || typeof file === 'string' || file.size <= 0) {
        return null;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (cloudinaryConfigured) {
        return uploadToCloudinary(buffer, file, folder);
    }

    if (process.env.NODE_ENV === 'production') {
        throw new Error('Cloudinary ayarlari eksik. Uretimde gorsel yuklemek icin CLOUDINARY_* degiskenlerini tanimlayin.');
    }

    return saveToLocalPublic(buffer, file);
}

export function isCloudinaryConfigured() {
    return cloudinaryConfigured;
}