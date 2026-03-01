'use client';

import { useState } from 'react';
import { toggleProductStock } from '@/lib/actions';

export function StockToggle({ productId, initialInStock }: { productId: string; initialInStock: boolean }) {
    const [inStock, setInStock] = useState(initialInStock);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        const newState = !inStock;

        try {
            // Optimistic update
            setInStock(newState);

            const result = await toggleProductStock(productId, newState);
            if (!result.success) {
                // Revert if error
                setInStock(!newState);
                alert('Error al actualizar el stock');
            }
        } catch (error) {
            setInStock(!newState);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                ${inStock ? 'bg-green-500' : 'bg-gray-200'}
            `}
        >
            <span className="sr-only">Activar stock</span>
            <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${inStock ? 'translate-x-6' : 'translate-x-1'}
                `}
            />
        </button>
    );
}
