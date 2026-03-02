'use client';

import { useActionState } from 'react';
import { storeRegister } from '@/lib/auth-actions';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface StoreRegisterFormProps {
    storeSlug: string;
}

export function StoreRegisterForm({ storeSlug }: StoreRegisterFormProps) {
    const [state, dispatch, isPending] = useActionState(storeRegister, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state === 'success') {
            router.push(`/${storeSlug}/login?registered=true`);
        }
    }, [state, router, storeSlug]);

    return (
        <form action={dispatch} className="flex flex-col gap-4">
            <input type="hidden" name="storeSlug" value={storeSlug} />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="name">Nombre Completo</label>
                <input
                    className="w-full rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 p-3 text-sm outline-none"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Juan Pérez"
                    required
                    minLength={2}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="email">Email</label>
                <input
                    className="w-full rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 p-3 text-sm outline-none"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="phoneNumber">Teléfono</label>
                <input
                    className="w-full rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 p-3 text-sm outline-none"
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="+54 9 11 1234 5678"
                    required
                    minLength={10}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="password">Contraseña</label>
                <input
                    className="w-full rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 p-3 text-sm outline-none"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••"
                    required
                    minLength={6}
                />
            </div>
            <div className="flex h-8 items-end" aria-live="polite" aria-atomic="true">
                {state && state !== 'success' && (
                    <p className="text-sm text-red-500 font-medium">{state}</p>
                )}
            </div>
            <Button className="w-full bg-gray-900 text-white font-bold h-12 hover:bg-gray-800" aria-disabled={isPending}>
                {isPending ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
        </form>
    );
}
