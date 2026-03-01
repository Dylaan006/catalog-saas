import { getAllOrders } from '@/lib/data';
import { OrdersTable } from '@/components/admin/orders-table';

export default async function AdminOrdersPage() {
    const orders = await getAllOrders();

    return (
        <div className="py-10 px-6 lg:px-40">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ordenes de Compra</h1>
                    <p className="text-gray-500 mt-1">Gestiona los pedidos realizados por los clientes.</p>
                </div>
            </div>

            <OrdersTable orders={orders} />
        </div>
    );
}
