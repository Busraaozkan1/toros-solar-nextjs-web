import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const ADMIN_AUTH_DIR = path.join(process.cwd(), 'data');
const ADMIN_AUTH_FILE = path.join(ADMIN_AUTH_DIR, 'admin-auth.json');

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

function getEnvAdminCredentials() {
    const username = String(process.env.ADMIN_USERNAME || '').trim();
    const passwordHash = String(process.env.ADMIN_PASSWORD_HASH || '').trim();
    const passwordPlain = String(process.env.ADMIN_PASSWORD || '').trim();

    if (!username) {
        return null;
    }

    if (!passwordHash && !passwordPlain) {
        return null;
    }

    return {
        username,
        passwordHash: passwordHash || null,
        passwordPlain: passwordPlain || null,
        updatedAt: null
    };
}

async function writeAdminData(data) {
    await mkdir(ADMIN_AUTH_DIR, { recursive: true });
    await writeFile(ADMIN_AUTH_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function getAdminData() {
    const envAdmin = getEnvAdminCredentials();
    if (isProduction()) {
        if (!envAdmin) {
            throw new Error('Production admin kimlik bilgileri eksik. ADMIN_USERNAME ve ADMIN_PASSWORD_HASH (veya ADMIN_PASSWORD) tanimlayin.');
        }

        return envAdmin;
    }

    if (envAdmin) {
        return envAdmin;
    }

    try {
        const raw = await readFile(ADMIN_AUTH_FILE, 'utf-8');
        const data = JSON.parse(raw);

        if (!data?.username || !data?.passwordHash) {
            throw new Error('admin-auth.json eksik veya bozuk.');
        }

        return data;
    } catch {
        // Kodda gomulu varsayilan kimlik YOK. Dev ortaminda da ENV kullanin:
        // ADMIN_USERNAME=... ADMIN_PASSWORD=... (veya ADMIN_PASSWORD_HASH)
        throw new Error(
            'Admin kimlik bilgileri tanimli degil. ADMIN_USERNAME ve ADMIN_PASSWORD (veya ADMIN_PASSWORD_HASH) ortam degiskenlerini ayarlayin.'
        );
    }
}

export async function getAdminUsername() {
    const admin = await getAdminData();
    return admin.username;
}

export async function verifyAdminCredentials(username, password) {
    let admin;
    try {
        admin = await getAdminData();
    } catch {
        return false;
    }

    const sameUsername =
        String(username || '').trim().toLowerCase() ===
        String(admin.username || '').trim().toLowerCase();

    if (!sameUsername) {
        return false;
    }

    if (admin.passwordHash) {
        return bcrypt.compare(password, admin.passwordHash);
    }

    return String(password || '') === String(admin.passwordPlain || '');
}

export async function updateAdminCredentials({ currentPassword, newUsername, newPassword }) {
    if (isProduction()) {
        return {
            success: false,
            message: 'Production ortaminda admin bilgileri ENV uzerinden yonetilir. Vercel ortam degiskenlerini guncelleyin.'
        };
    }

    const admin = await getAdminData();

    let isCurrentPasswordValid = false;
    if (admin.passwordHash) {
        isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    } else {
        isCurrentPasswordValid = String(currentPassword || '') === String(admin.passwordPlain || '');
    }

    if (!isCurrentPasswordValid) {
        return { success: false, message: 'Mevcut admin sifresi hatali.' };
    }

    const normalizedUsername = String(newUsername || '').trim();
    if (!normalizedUsername) {
        return { success: false, message: 'Kullanici adi bos olamaz.' };
    }

    if (String(newPassword || '').length < 8) {
        return { success: false, message: 'Yeni sifre en az 8 karakter olmali.' };
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await writeAdminData({
        username: normalizedUsername,
        passwordHash: newHash,
        updatedAt: new Date().toISOString()
    });

    return { success: true };
}
