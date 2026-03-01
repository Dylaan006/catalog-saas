'use client';

import { useCartStore } from '@/lib/cart-store';
import { Product } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AddToCartButtonProps {
    product: Product;
    fullWidth?: boolean;
}

export function AddToCartButton({ product, fullWidth }: AddToCartButtonProps) {
    const { addItem } = useCartStore();
    const [isLoading, setIsLoading] = useState(false);

    if (!product.inStock) {
        return (
            <button
                disabled
                className={`flex items-center justify-center gap-2 bg-gray-200 text-gray-500 font-bold rounded-full transition-all cursor-not-allowed ${fullWidth ? 'w-full py-4 text-lg' : 'px-6 py-2.5 text-sm'}`}
            >
                <span className="material-symbols-outlined text-[20px]">block</span>
                Sin Stock
            </button>
        );
    }

    const handleAddToCart = async () => {
        setIsLoading(true);

        // Simular pequeño delay para feedback visual
        await new Promise(resolve => setTimeout(resolve, 300));

        addItem(product);

        setIsLoading(false);
    };

    return (
        <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`${fullWidth ? 'w-full' : ''} bg-gray-900 text-white hover:bg-gray-800 transition-all font-bold gap-2`}
        >
            <span className="material-symbols-outlined text-[20px]">
                {isLoading ? 'hourglass_empty' : 'add_shopping_cart'}
            </span>
            {isLoading ? 'Agregando...' : 'Agregar'}
        </Button>
    );
}
