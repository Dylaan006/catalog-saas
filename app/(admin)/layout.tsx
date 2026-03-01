import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    // @ts-ignore
    if (!session || session?.user?.role !== 'ADMIN') {
        notFound();
    }

    const userStore = await prisma.store.findFirst({
        where: { userId: session.user.id },
        include: { storeConfig: true }
    });

    const config = userStore?.storeConfig;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar config={config || undefined} />
            <main className="flex-1 w-full bg-gray-50/50">
                {children}
            </main>
            <Footer />
        </div>
    );
}
