
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
        where: { email_storeId: { email: 'admin@admin.com', storeId: '' } },
        update: {},
        create: {
            email: 'admin@admin.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            storeId: null,
        },
    });

    console.log('Admin user created: admin@admin.com / admin123');
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
