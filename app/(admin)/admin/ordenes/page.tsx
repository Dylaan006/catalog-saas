import { getAllOrders } from '@/lib/data';
import { OrdersTable } from '@/components/admin/orders-table';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function AdminOrdersPage() {
    const session = await auth();
    // @ts-ignore
    if (!session || session?.user?.role !== 'ADMIN') {
        notFound();
    }

    const userStore = await prisma.store.findFirst({
        where: { userId: session.user.id }
    });

    if (!userStore) {
        return <div className="p-8 text-center text-red-500">Error: No tienes una tienda asignada a tu cuenta.</div>;
    }

    const orders = await getAllOrders(userStore.id);

    return (
        <div className="py-10 px-6 lg:px-40">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ordenes de Compra</h1>
                    <p className="text-gray-500 mt-1">Gestiona los pedidos realizados por los clientes.</p>
                </div>
            </div>

            <OrdersTable storeId={userStore.id} orders={orders} />
        </div>
    );
}
