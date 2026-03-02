import { LoginForm } from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Bienvenido</h1>
                        <p className="text-gray-500">Ingresa a tu cuenta para gestionar tus pedidos.</p>
                    </div>
                    <LoginForm />
                </div>
                <p className="text-center text-sm text-gray-400 mt-6">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="font-bold text-gray-900 hover:underline">
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </main>
    );
}
