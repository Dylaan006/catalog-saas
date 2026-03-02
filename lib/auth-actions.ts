'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { redirect } from 'next/navigation';

// ─── Admin login (global, no storeId) ────────────────────────────────────────
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const callbackUrl = (formData.get('callbackUrl') as string) || '/';
    formData.delete('callbackUrl');

    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirect: false });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas.';
                default:
                    return 'Algo salió mal.';
            }
        }
        throw error;
    }
    redirect(callbackUrl);
}

// ─── Store customer login (scoped to a store) ─────────────────────────────────
export async function storeAuthenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const callbackUrl = (formData.get('callbackUrl') as string) || '/';
    const storeSlug = formData.get('storeSlug') as string;
    formData.delete('callbackUrl');
    formData.delete('storeSlug');

    const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
    if (!store) return 'Tienda no encontrada.';

    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            storeId: store.id,
            redirect: false,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas.';
                default:
                    return 'Algo salió mal.';
            }
        }
        throw error;
    }
    redirect(callbackUrl);
}

// ─── Admin registration (global, used by create-admin script) ────────────────
const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().min(10, "El número debe tener al menos 10 dígitos"),
});

export async function register(prevState: string | undefined, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phoneNumber: formData.get('phoneNumber'),
    });

    if (!validatedFields.success) {
        return 'Campos inválidos. Por favor verifique sus datos.';
    }

    const { name, email, password, phoneNumber } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findFirst({ where: { email, storeId: null } });
        if (existingUser) return 'Este correo ya está registrado.';

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword, phoneNumber, role: 'USER', storeId: null },
        });

        return 'success';
    } catch (error) {
        console.error('Registration error:', error);
        return 'Error al crear la cuenta.';
    }
}

// ─── Store customer registration (scoped to a store) ─────────────────────────
const StoreRegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().min(10, "El número debe tener al menos 10 dígitos"),
    storeSlug: z.string(),
});

export async function storeRegister(prevState: string | undefined, formData: FormData) {
    const validatedFields = StoreRegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phoneNumber: formData.get('phoneNumber'),
        storeSlug: formData.get('storeSlug'),
    });

    if (!validatedFields.success) {
        return 'Campos inválidos. Por favor verifique sus datos.';
    }

    const { name, email, password, phoneNumber, storeSlug } = validatedFields.data;

    const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
    if (!store) return 'Tienda no encontrada.';

    try {
        const existingCustomer = await prisma.user.findFirst({
            where: { email, storeId: store.id },
        });
        if (existingCustomer) return 'Este correo ya está registrado en esta tienda.';

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword, phoneNumber, role: 'USER', storeId: store.id },
        });

        return 'success';
    } catch (error) {
        console.error('Store registration error:', error);
        return 'Error al crear la cuenta.';
    }
}
