import Link from 'next/link';
import { prisma } from '@/lib/db';

async function getStoreConfig() {
    try {
        // @ts-ignore
        const storeConfigs = await prisma.$queryRaw`SELECT * FROM StoreConfig LIMIT 1`;
        return Array.isArray(storeConfigs) ? storeConfigs[0] : null;
    } catch (e) {
        return null;
    }
}

export async function Footer() {
    const config = await getStoreConfig();
    const year = new Date().getFullYear();
    const storeName = config?.storeName || 'Pixel Catalog';

    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-white text-xl font-bold mb-4">{storeName}</h3>
                    <p className="text-sm text-gray-400 max-w-sm mb-6">
                        {config?.description || 'Tu tienda de confianza para los mejores productos.'}
                    </p>
                    <div className="flex gap-4">
                        {config?.instagramUrl && (
                            <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <span className="material-symbols-outlined">camera_alt</span>
                            </a>
                        )}
                        {config?.facebookUrl && (
                            <a href={config.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <span className="material-symbols-outlined">public</span>
                            </a>
                        )}
                        {config?.whatsappNumber && (
                            <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <span className="material-symbols-outlined">chat</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold mb-4">Enlaces</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">Catálogo</Link></li>
                        {/* Once implemented: 
                        <li><Link href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li> 
                        <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                        */}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold mb-4">Contacto</h4>
                    <ul className="space-y-2 text-sm">
                        {config?.contactEmail && (
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">mail</span>
                                <a href={`mailto:${config.contactEmail}`} className="hover:text-white transition-colors">{config.contactEmail}</a>
                            </li>
                        )}
                        {config?.contactPhone && (
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">call</span>
                                <span>{config.contactPhone}</span>
                            </li>
                        )}
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            <span>Online Store</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                <p>&copy; {year} {storeName}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
