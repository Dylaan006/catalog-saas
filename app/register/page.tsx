import { RegisterForm } from '@/components/auth/register-form';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Crear Cuenta</h1>
                        <p className="text-gray-500">Regístrate para realizar pedidos y trackear tus compras.</p>
                    </div>
                    <RegisterForm />
                </div>
                <p className="text-center text-sm text-gray-400 mt-6">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="font-bold text-gray-900 hover:underline">
                        Ingresar
                    </Link>
                </p>
            </div>
        </main>
    );
}
