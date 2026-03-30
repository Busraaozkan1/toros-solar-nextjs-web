import { redirect } from 'next/navigation';

export default async function LoginRedirectPage({
    searchParams,
}: {
    searchParams: Promise<{ next?: string }>;
}) {
    const { next } = await searchParams;

    if (next && next.startsWith('/')) {
        redirect(`/user-login?next=${encodeURIComponent(next)}`);
    }

    redirect('/user-login');
}
