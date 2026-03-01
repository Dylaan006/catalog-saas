import { createProduct } from '@/lib/actions';
import { ProductForm } from '@/components/product/product-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function NewProductPage() {
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

    const createProductWithId = createProduct.bind(null, userStore.id);

    return (
        <div className="py-10 px-6 lg:px-40">
            <div className="mb-8">
                <Button asChild variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-gray-600 text-gray-500">
                    <Link href="/admin/productos" className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        Volver a Productos
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Nuevo Producto</h1>
            </div>
            <ProductForm action={createProductWithId} />
        </div>
    );
}
