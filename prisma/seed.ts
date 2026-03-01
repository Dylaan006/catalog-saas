import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create Default Admin (Store Owner)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@stitch.com' },
        update: {},
        create: {
            email: 'admin@stitch.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    // Create a default Store for the admin
    const store = await prisma.store.upsert({
        where: { slug: 'pixel-store' },
        update: {},
        create: {
            name: 'PixelStore',
            slug: 'pixel-store',
            userId: adminUser.id,
        },
    });

    // Create a default StoreConfig
    await prisma.storeConfig.upsert({
        where: { storeId: store.id },
        update: {},
        create: {
            storeId: store.id,
            storeName: 'PixelStore',
            description: 'La mejor tienda tecnológica SaaS',
            primaryColor: '#09090b', // Negro moderno
            secondaryColor: '#ffffff',
            heroTitle: 'Bienvenido a PixelStore',
        },
    });

    const products = [
        {
            name: 'Auriculares Inalámbricos Pro',
            description: 'Auriculares con cancelación de ruido activa y sonido de alta fidelidad.',
            price: 150000,
            category: 'Audio',
            images: JSON.stringify(['https://placehold.co/600x400/png?text=Auriculares']),
            storeId: store.id,
        },
        {
            name: 'Teclado Mecánico RGB',
            description: 'Teclado mecánico para programación y gaming con switches rojos.',
            price: 85000,
            category: 'Periféricos',
            images: JSON.stringify(['https://placehold.co/600x400/png?text=Teclado']),
            storeId: store.id,
        },
        {
            name: 'Mouse Ergonómico',
            description: 'Mouse inalámbrico con diseño ergonómico para largas horas de trabajo.',
            price: 45000,
            category: 'Periféricos',
            images: JSON.stringify(['https://placehold.co/600x400/png?text=Mouse']),
            storeId: store.id,
        },
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product,
        })
    }

    console.log('Seed data inserted for multi-tenant SaaS')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
