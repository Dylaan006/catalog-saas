import { StoreLoginForm } from '@/components/auth/store-login-form';
import { getStoreConfig } from '@/lib/store-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function StoreLoginPage(props: {
    params: Promise<{ storeSlug: string }>;
    searchParams: Promise<{ callbackUrl?: string }>;
}) {
    const { storeSlug } = await props.params;
    const { callbackUrl } = await props.searchParams;
    const config = await getStoreConfig(storeSlug);
    if (!config) notFound();

    const storeName = config.storeName || storeSlug;
    const redirectTo = callbackUrl || `/${storeSlug}`;

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="mb-8 text-center">
                        {config.logoUrl && (
                            <img src={config.logoUrl} alt={storeName} className="h-12 w-auto mx-auto mb-4 object-contain" />
                        )}
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Bienvenido</h1>
                        <p className="text-gray-500">Ingresa a tu cuenta de <strong>{storeName}</strong>.</p>
                    </div>
                    <StoreLoginForm storeSlug={storeSlug} callbackUrl={redirectTo} />
                </div>
                <p className="text-center text-sm text-gray-400 mt-6">
                    ¿No tienes cuenta?{' '}
                    <Link href={`/${storeSlug}/register`} className="font-bold text-gray-900 hover:underline">
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </main>
    );
}
