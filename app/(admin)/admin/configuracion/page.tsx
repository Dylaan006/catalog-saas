import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { StoreConfigForm } from '@/components/admin/store-config-form';
import { updateStoreConfig } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function StoreConfigPage() {
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== 'ADMIN') {
        redirect('/');
    }

    // Fetch existing config
    let config = null;
    try {
        // @ts-ignore
        const configs = await prisma.$queryRaw`SELECT * FROM StoreConfig LIMIT 1`;
        config = Array.isArray(configs) ? configs[0] : null;
    } catch (e) {
        console.error('Error fetching store config:', e);
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <StoreConfigForm config={config} action={updateStoreConfig} />
        </div>
    );
}
