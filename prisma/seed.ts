import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create Default Admin (Store Owner)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email_storeId: { email: 'admin@stitch.com', storeId: '' } },
        update: {},
        create: {
            email: 'admin@stitch.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            storeId: null,
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
            description: 'Auriculares con cancelación de ruido activa y sonido de alta fidelidad. Diseño minimalista.',
            price: 150000,
            category: 'Audio',
            images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop']),
            storeId: store.id,
        },
        {
            name: 'Teclado Mecánico RGB',
            description: 'Teclado mecánico para programación y gaming con switches rojos. Chasis de aluminio.',
            price: 85000,
            category: 'Periféricos',
            images: JSON.stringify(['https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop']),
            storeId: store.id,
        },
        {
            name: 'Mouse Ergonómico',
            description: 'Mouse inalámbrico con diseño ergonómico para largas horas de trabajo. Sensor de alta precisión.',
            price: 45000,
            category: 'Periféricos',
            images: JSON.stringify(['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop']),
            storeId: store.id,
        },
        {
            name: 'Lámpara de Escritorio LED',
            description: 'Lámpara minimalista de escritorio con carga inalámbrica Qi y control de temperatura de color.',
            price: 55000,
            category: 'Decoración',
            images: JSON.stringify(['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop']),
            storeId: store.id,
        }
    ]

    for (const product of products) {
        // Upsert to not duplicate if already exists based on some field, 
        // using create but skipping if we simply reset the DB.
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
