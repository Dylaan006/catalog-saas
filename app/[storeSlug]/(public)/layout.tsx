export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { getStoreConfig } from '@/lib/store-config';
import { notFound } from 'next/navigation';

export default async function PublicLayout(props: {
    children: React.ReactNode;
    params: Promise<{ storeSlug: string }>;
}) {
    const params = await props.params;
    const config = await getStoreConfig(params.storeSlug);

    if (!config) {
        // Option A: return 404, Option B: show default store. Let's do 404 for SaaS
        notFound();
    }

    // Convert hex to HSL (approximate) or just use hex for our custom variables
    // In Tailwind v4, we can map --color-primary to var(--primary) in globals.css
    const themeStyle = {
        '--primary': config.primaryColor || '#111827',
        '--primary-foreground': '#ffffff', // Simplified for now
        '--secondary': config.secondaryColor || '#f3f4f6',
        '--secondary-foreground': '#1f2937',
        '--font-sans': `"${config.fontFamily}", sans-serif`,
        '--font-display': `"${config.fontFamily}", sans-serif`,
    } as React.CSSProperties;

    return (
        <div style={themeStyle} className="store-theme-wrapper flex h-full grow flex-col bg-background text-foreground font-sans">
            <Navbar config={config} storeSlug={params.storeSlug} />
            <main className="flex-1 w-full relative z-0">
                {props.children}
            </main>
            <Footer />
        </div>
    );
}
