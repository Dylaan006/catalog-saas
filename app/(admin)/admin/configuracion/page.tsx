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

    // We need the admin's storeId. Let's fetch it from the database based on their user ID.
    // For now, assuming they have at least one store.
    const userStore = await prisma.store.findFirst({
        where: { userId: session.user.id }
    });

    if (!userStore) {
        return <div className="p-8 text-center text-red-500">Error: No tienes una tienda asignada a tu cuenta.</div>;
    }

    // Fetch existing config
    let config = null;
    try {
        const storeConfigs = await prisma.storeConfig.findMany({
            where: { storeId: userStore.id },
            take: 1
        });
        config = storeConfigs.length > 0 ? storeConfigs[0] : null;
    } catch (e) {
        console.error('Error fetching store config:', e);
    }

    const updateStoreConfigWithId = updateStoreConfig.bind(null, userStore.id);

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <StoreConfigForm config={config} action={updateStoreConfigWithId} />
        </div>
    );
}
