'use client';

import { useActionState } from 'react';
import { storeAuthenticate } from '@/lib/auth-actions';
import { Button } from '@/components/ui/button';

interface StoreLoginFormProps {
    storeSlug: string;
    callbackUrl: string;
}

export function StoreLoginForm({ storeSlug, callbackUrl }: StoreLoginFormProps) {
    const [errorMessage, dispatch, isPending] = useActionState(
        storeAuthenticate,
        undefined,
    );

    return (
        <form action={dispatch} className="flex flex-col gap-4">
            <input type="hidden" name="storeSlug" value={storeSlug} />
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

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
                {errorMessage && (
                    <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                )}
            </div>
            <Button className="w-full bg-gray-900 text-white font-bold h-12 hover:bg-gray-800" aria-disabled={isPending}>
                {isPending ? 'Ingresando...' : 'Ingresar'}
            </Button>
        </form>
    );
}
