type LoginInput = {
    username: string;
    password: string;
    securityAnswer: string;
    number1: number;
    number2: number;
    portal?: 'admin';
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

export async function login(input: LoginInput): Promise<AuthResult> {
    return postJson('/api/auth/login', input);
}
