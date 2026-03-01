import { prisma } from '@/lib/db';
import { cache } from 'react';

export const getStoreConfig = cache(async (storeSlug?: string) => {
    try {
        if (!storeSlug) {
            // En caso de que no haya slug (ej: rutas /admin que buscaremos por auth session luego,
            // pero para evitar que rompa ahora devolvemos null temporalmente
            // o podríamos buscar la del usuario logueado en el futuro)
            return null;
        }

        const store = await prisma.store.findUnique({
            where: { slug: storeSlug },
            include: { storeConfig: true }
        });

        return store?.storeConfig || null;
    } catch (e) {
        console.error('Failed to fetch store config:', e);
        return null;
    }
});
