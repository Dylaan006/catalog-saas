import { ProductCard } from '@/components/product/product-card';
import { ProductSort } from '@/components/product/product-sort';
import { HeroCarousel } from '@/components/ui/hero-carousel';
import Link from 'next/link';

interface HomeViewProps {
    storeSlug: string;
    products: any[];
    categories: string[];
    config: any;
    query: string;
    category: string;
    sort: string;
}

export function HomeView({ storeSlug, products, categories, config, query, category, sort }: HomeViewProps) {
    return (
        <div className="flex flex-col w-full bg-[#f5f5f7] min-h-screen">
            {/* Hero Section - Only show if no search/filter is active to keep focus when searching */}
            {!query && !category && (
                <>
                    <HeroCarousel config={config} storeSlug={storeSlug} />

                    {/* Features Row */}
                    <div className="bg-white py-6 w-full mt-4 xl:mt-0 xl:-translate-y-6">
                        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">local_shipping</span>
                                <div>
                                    <h4 className="text-gray-900 font-bold text-sm">Envío Gratis</h4>
                                    <p className="text-gray-500 text-xs">En todos tus pedidos nacionales</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">verified_user</span>
                                <div>
                                    <h4 className="text-gray-900 font-bold text-sm">Garantía Oficial</h4>
                                    <p className="text-gray-500 text-xs">Respaldo directo oficial</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">sync_alt</span>
                                <div>
                                    <h4 className="text-gray-900 font-bold text-sm">Plan Canje</h4>
                                    <p className="text-gray-500 text-xs">Recibimos tu equipo usado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <main className="flex-1 px-4 lg:px-8 py-12 max-w-[1400px] mx-auto w-full mb-12">
                <div className="flex flex-col gap-8 mb-10">
                    <div className="w-full">
                        <form className="flex flex-col min-w-40 h-16 w-full max-w-2xl mx-auto">
                            <div className="flex w-full flex-1 items-stretch rounded-full h-full shadow-sm bg-white/80 backdrop-blur-md border border-gray-200/50 hover:shadow-md transition-shadow duration-300">
                                <div className="text-gray-400 flex border-none items-center justify-center pl-6 rounded-l-full border-r-0">
                                    <span className="material-symbols-outlined text-[24px]">search</span>
                                </div>
                                <input
                                    name="query"
                                    defaultValue={query}
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-full text-gray-900 focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-gray-400 px-4 text-lg font-medium leading-normal"
                                    placeholder="Buscar productos..."
                                />
                                {/* Maintain category if set */}
                                {category && <input type="hidden" name="category" value={category} />}
                                {/* Maintain sort if set */}
                                {sort && <input type="hidden" name="sort" value={sort} />}
                            </div>
                        </form>
                    </div>

                    {/* Header: Title + Sort + Categories */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between w-full mt-4 pb-6 border-b border-gray-200/60">
                        <div>
                            <p className="text-blue-600 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2">Nuestra Colección</p>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Explora la línea {config?.storeName || 'Premium'}</h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
                            {/* Categorias - Minimalist Text Links */}
                            <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                <Link href={`/${storeSlug}?query=${query}&sort=${sort}`} className="shrink-0 p-1">
                                    <span className={`text-[14px] leading-none transition-colors duration-200 ${category === '' ? 'font-bold text-gray-900' : 'font-medium text-gray-500 hover:text-gray-900'}`}>
                                        Todos
                                    </span>
                                </Link>
                                {categories.map((cat) => (
                                    <Link key={cat} href={`/${storeSlug}?category=${cat}&query=${query}&sort=${sort}`} className="shrink-0 p-1">
                                        <span className={`text-[14px] leading-none transition-colors duration-200 ${category === cat ? 'font-bold text-gray-900' : 'font-medium text-gray-500 hover:text-gray-900'}`}>
                                            {cat}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-20 mt-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} storeSlug={storeSlug} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-32 text-gray-500 bg-white rounded-3xl">
                            No se encontraron productos{query ? ` para "${query}"` : ''}.
                        </div>
                    )}
                </div>

                {/* Promotional Banner */}
                <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative border border-slate-700">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <div className="relative z-10 w-full md:w-1/2 pr-0 md:pr-10">
                        <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3 text-start">Personaliza tu Estilo</p>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 text-start">
                            Accesorios<br className="hidden md:block" />Originales
                        </h2>
                        <p className="text-slate-300 font-medium mb-8 text-start max-w-sm">
                            Desde fundas protectoras hasta cargadores magnéticos. Todo lo que necesitas para potenciar tu experiencia diaria.
                        </p>
                        <Link
                            href={`/${storeSlug || ''}?category=Accesorios`}
                            className="inline-flex bg-white hover:bg-gray-100 text-slate-900 px-8 py-4 rounded-full font-bold transition-all shadow-lg transform hover:-translate-y-1"
                        >
                            Ver catálogo de accesorios
                        </Link>
                    </div>

                    <div className="relative z-10 w-full md:w-1/2 mt-10 md:mt-0 flex justify-end">
                        {/* Placeholder generic image for accessories banner since we don't have the exact render */}
                        <div className="w-full max-w-sm aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-xl relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1603921385966-231920875b15?q=80&w=1968&auto=format&fit=crop" alt="Accesorios" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/90 hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
