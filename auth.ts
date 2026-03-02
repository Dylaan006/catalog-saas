import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Finds a user by email, scoped to a store (for customers) or global (for admins, storeId = null)
async function getUser(email: string, storeId?: string | null) {
    try {
        // For admins: storeId is null. For customers: storeId is set.
        const user = await prisma.user.findFirst({
            where: {
                email,
                storeId: storeId || null,
            },
        });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                        storeId: z.string().optional(),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password, storeId } = parsedCredentials.data;
                    const user = await getUser(email, storeId);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
