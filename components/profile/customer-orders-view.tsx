import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CustomerOrdersViewProps {
    userName: string | null | undefined;
    userProfile: any;
    orders: any[];
    logoutAction: () => Promise<void>;
}

export function CustomerOrdersView({ userName, userProfile, orders, logoutAction }: CustomerOrdersViewProps) {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Hola, {userName}</h1>
                        <p className="text-gray-500">{userProfile?.email}</p>
                        {userProfile?.phoneNumber && (
                            <p className="text-gray-500 flex items-center gap-1 mt-1">
                                <span className="material-symbols-outlined text-sm">call</span>
                                {userProfile.phoneNumber}
                            </p>
                        )}
                    </div>
                    <form action={logoutAction}>
                        <Button variant="outline" type="submit">Cerrar Sesión</Button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="material-symbols-outlined">receipt_long</span>
                            Mis Pedidos
                        </h2>
                    </div>

                    {orders.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2">shopping_bag</span>
                            <p>Aún no has realizado ningún pedido.</p>
                            <Button asChild className="mt-4" variant="link">
                                <Link href="/">Ir al Catálogo</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Orden #{order.id.slice(-8)}</span>
                                            <span className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                order.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-gray-50 text-gray-700 border-gray-200'
                                                }`}>
                                                {order.status === 'PENDING' ? 'Pendiente' :
                                                    order.status === 'COMPLETED' ? 'Completado' :
                                                        order.status === 'CANCELLED' ? 'Cancelado' : order.status}
                                            </span>
                                            <span className="text-xl font-black text-gray-900">${order.total.toLocaleString('es-AR')}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-900">{item.quantity}x</span>
                                                    <span className="text-gray-700">{item.productName || item.product?.name || 'Producto Eliminado'}</span>
                                                </div>
                                                <span className="text-gray-600">${item.price.toLocaleString('es-AR')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
