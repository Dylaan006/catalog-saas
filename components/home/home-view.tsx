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
        <div className="flex flex-col w-full">
            {/* Hero Section - Only show if no search/filter is active to keep focus when searching */}
            {!query && !category && <HeroCarousel config={config} storeSlug={storeSlug} />}

            <main className="flex-1 px-4 lg:px-40 py-12 max-w-[1400px] mx-auto w-full mb-12">
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

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between w-full mt-4">
                        {/* Categorias - Scroll Horizontal */}
                        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <Link href={`/${storeSlug}?query=${query}&sort=${sort}`} className="shrink-0">
                                <div className={`flex h-12 cursor-pointer items-center justify-center gap-x-2 rounded-full px-8 transition-all duration-300 border ${category === '' ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-white/60 backdrop-blur-sm text-gray-600 border-gray-200/50 hover:bg-white hover:text-gray-900 hover:shadow-md'}`}>
                                    <p className={`text-[15px] font-bold tracking-wide`}>Todos</p>
                                </div>
                            </Link>
                            {categories.map((cat) => (
                                <Link key={cat} href={`/${storeSlug}?category=${cat}&query=${query}&sort=${sort}`} className="shrink-0">
                                    <div className={`flex h-12 cursor-pointer items-center justify-center gap-x-2 rounded-full px-8 transition-all duration-300 border ${category === cat ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-white/60 backdrop-blur-sm text-gray-600 border-gray-200/50 hover:bg-white hover:text-gray-900 hover:shadow-md'}`}>
                                        <p className={`text-[15px] font-bold tracking-wide`}>
                                            {cat}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Ordenar */}
                        <div className="flex-shrink-0 self-end md:self-auto">
                            <ProductSort />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} storeSlug={storeSlug} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No se encontraron productos{query ? ` para "${query}"` : ''}.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
