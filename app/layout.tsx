import type { Metadata } from "next";
import "./globals.css";

// Note: store config fetching for metadata should be handled gracefully
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
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased min-h-screen font-sans`}>
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
