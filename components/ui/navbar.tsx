import Link from 'next/link';
import { auth } from '@/auth';
import { CartCounter } from '@/components/cart/cart-counter';
import { MobileMenu } from '@/components/ui/mobile-menu';

export async function Navbar({ config, storeSlug }: { config?: any; storeSlug?: string }) {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    // @ts-ignore
    const isAdmin = session?.user?.role === 'ADMIN';

    const storeName = config?.storeName || 'CatalogPro';

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-solid border-gray-200/50 px-4 xl:px-8 py-3">
            <div className="flex items-center justify-between whitespace-nowrap max-w-[1400px] mx-auto w-full">
                <div className="flex items-center gap-2 lg:gap-4 text-gray-900">
                    <MobileMenu isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

                    <Link href={`/${storeSlug || ''}`} className="flex items-center gap-2">
                        {config?.logoUrl ? (
                            <img src={config.logoUrl} alt={storeName} className="h-10 w-auto object-contain" />
                        ) : (
                            <div className="size-6 text-gray-900">
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                                </svg>
                            </div>
                        )}
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{storeName}</h2>
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 justify-center items-center gap-10">
                    <Link href={`/${storeSlug || ''}`} className="text-gray-600 text-[13px] font-semibold tracking-wide hover:text-gray-900 transition-colors">
                        Modelos
                    </Link>
                    <Link href={`/${storeSlug || ''}?category=Accesorios`} className="text-gray-600 text-[13px] font-semibold tracking-wide hover:text-gray-900 transition-colors">
                        Accesorios
                    </Link>
                    <Link href={`/${storeSlug || ''}?category=Soporte`} className="text-gray-600 text-[13px] font-semibold tracking-wide hover:text-gray-900 transition-colors">
                        Soporte
                    </Link>
                    {/* Admin Links */}
                    {isAdmin && (
                        <>
                            <Link href="/admin/productos" className="text-primary text-[13px] font-semibold tracking-wide hover:text-primary/80 transition-colors">
                                Admin Prods
                            </Link>
                            <Link href="/admin/ordenes" className="text-primary text-[13px] font-semibold tracking-wide hover:text-primary/80 transition-colors">
                                Admin Órdenes
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex flex-1 justify-end gap-5 items-center">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </button>
                    {session?.user ? (
                        <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">person</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">person</span>
                        </Link>
                    )}
                    <div className="flex items-center gap-3">
                        <CartCounter storeSlug={storeSlug} />
                    </div>
                </div>
            </div>
        </header>
    );
}
