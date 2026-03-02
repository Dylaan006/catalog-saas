import { StoreRegisterForm } from '@/components/auth/store-register-form';
import { getStoreConfig } from '@/lib/store-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function StoreRegisterPage(props: {
    params: Promise<{ storeSlug: string }>;
}) {
    const { storeSlug } = await props.params;
    const config = await getStoreConfig(storeSlug);
    if (!config) notFound();

    const storeName = config.storeName || storeSlug;

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="mb-8 text-center">
                        {config.logoUrl && (
                            <img src={config.logoUrl} alt={storeName} className="h-12 w-auto mx-auto mb-4 object-contain" />
                        )}
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Crear Cuenta</h1>
                        <p className="text-gray-500">Regístrate en <strong>{storeName}</strong> para realizar pedidos.</p>
                    </div>
                    <StoreRegisterForm storeSlug={storeSlug} />
                </div>
                <p className="text-center text-sm text-gray-400 mt-6">
                    ¿Ya tienes cuenta?{' '}
                    <Link href={`/${storeSlug}/login`} className="font-bold text-gray-900 hover:underline">
                        Ingresar
                    </Link>
                </p>
            </div>
        </main>
    );
}
