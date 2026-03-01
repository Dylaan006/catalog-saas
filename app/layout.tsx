import type { Metadata } from "next";
import "./globals.css";
import { currentTheme } from '@/lib/theme-config';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

import { getStoreConfig } from '@/lib/store-config';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getStoreConfig();

  const title = config?.storeName || "Catálogo Pixel";
  const description = config?.description || "Catálogo de productos exclusivos";

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getStoreConfig();

  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased min-h-screen bg-background text-foreground font-sans theme-${currentTheme}`}>
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display">
          <div className="layout-container flex h-full grow flex-col">
            <Navbar config={config} />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
