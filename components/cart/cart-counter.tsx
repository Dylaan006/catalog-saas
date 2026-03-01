'use client';

import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CartCounter({ storeSlug }: { storeSlug?: string }) {
    const { items } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartLink = storeSlug ? `/${storeSlug}/cart` : '/cart';

    if (!mounted) {
        return (
            <Link href={cartLink} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center relative p-1">
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
            </Link>
        );
    }

    return (
        <Link href={cartLink} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center relative p-1">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center outline outline-2 outline-white">
                    {items.length}
                </span>
            )}
        </Link>
    );
}
