import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AdminDashboardViewProps {
    logoutAction: () => Promise<void>;
}

export function AdminDashboardView({ logoutAction }: AdminDashboardViewProps) {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Hola, Administrador</h1>
                        <p className="text-gray-500">Gestiona tu catálogo y órdenes desde aquí.</p>
                    </div>
                    <form action={logoutAction}>
                        <Button variant="outline" type="submit">Cerrar Sesión</Button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 transition-all hover:shadow-md h-full">
                        <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-900">
                            <span className="material-symbols-outlined text-3xl">inventory_2</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-gray-900">Productos</h2>
                            <p className="text-gray-500 text-sm mt-1">Gestiona los productos del catálogo.</p>
                        </div>
                        <Button asChild className="w-full mt-2 bg-gray-900 text-white font-bold h-12 rounded-xl hover:bg-gray-800">
                            <Link href="/admin/productos">Ir a Productos</Link>
                        </Button>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 transition-all hover:shadow-md h-full">
                        <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-900">
                            <span className="material-symbols-outlined text-3xl">receipt_long</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-gray-900">Gestión de Ordenes</h2>
                            <p className="text-gray-500 text-sm mt-1">Revisa y actualiza el estado de las compras de los usuarios.</p>
                        </div>
                        <Button asChild variant="outline" className="w-full mt-2 border-gray-200 font-bold h-12 rounded-xl">
                            <Link href="/admin/ordenes">Ver Ordenes</Link>
                        </Button>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 transition-all hover:shadow-md h-full md:col-span-2">
                        <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-900">
                            <span className="material-symbols-outlined text-3xl">tune</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-gray-900">Personalización de Tienda</h2>
                            <p className="text-gray-500 text-sm mt-1">Editá el nombre, logo, imágenes del hero y datos de contacto.</p>
                        </div>
                        <Button asChild variant="outline" className="w-full mt-2 border-gray-200 font-bold h-12 rounded-xl">
                            <Link href="/admin/configuracion">Configurar Tienda</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
