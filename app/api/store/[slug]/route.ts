import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: Request,
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;

    try {
        const store = await prisma.store.findUnique({
            where: { slug: params.slug },
            select: { id: true, name: true, slug: true }
        });

        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        return NextResponse.json({ storeId: store.id, ...store });
    } catch (error) {
        console.error('Error fetching store by slug:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
