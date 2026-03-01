import { prisma } from '@/lib/db';
import { cache } from 'react';

// Cache the result for the duration of the request
export const getStoreConfig = cache(async () => {
    try {
        // @ts-ignore
        const configs = await prisma.$queryRaw`SELECT * FROM StoreConfig LIMIT 1`;
        return Array.isArray(configs) ? configs[0] : null;
    } catch (e) {
        console.error('Failed to fetch store config:', e);
        return null;
    }
});
