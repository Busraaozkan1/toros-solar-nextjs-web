type RegisterInput = {
    fullName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword?: string;
};

type LoginInput = {
    username: string;
    password: string;
    securityAnswer: string;
    number1: number;
    number2: number;
    portal?: 'user' | 'admin';
};

type AuthResult = {
    success?: boolean;
    role?: string;
    error?: string;
};

async function postJson<TBody>(url: string, body: TBody): Promise<AuthResult> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                error: data?.message || 'İstek sırasında bir hata oluştu.'
            };
        }

        return {
            success: true,
            role: data?.role
        };
    } catch {
        return {
            error: 'Sunucuya bağlanırken bir hata oluştu.'
        };
    }
}

export async function register(input: RegisterInput): Promise<AuthResult> {
    const { fullName, username, email, password } = input;

    return postJson('/api/auth/register', {
        fullName,
        username,
        email,
        password
    });
}

export async function login(input: LoginInput): Promise<AuthResult> {
    return postJson('/api/auth/login', input);
}