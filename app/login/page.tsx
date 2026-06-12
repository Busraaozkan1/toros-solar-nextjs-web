import { redirect } from 'next/navigation';

// Kullanici hesaplari kaldirildi; /login artik admin girisine yonlendirir.
export default function LoginRedirectPage() {
    redirect('/admin/login');
}
