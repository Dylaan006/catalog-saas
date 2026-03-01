import { ProductCard } from '@/components/product/product-card';
import { ProductSort } from '@/components/product/product-sort';
import { HeroCarousel } from '@/components/ui/hero-carousel';
import Link from 'next/link';

interface HomeViewProps {
    products: any[];
    categories: string[];
    config: any;
    query: string;
    category: string;
    sort: string;
}

export function HomeView({ products, categories, config, query, category, sort }: HomeViewProps) {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section - Only show if no search/filter is active to keep focus when searching */}
            {!query && !category && <HeroCarousel config={config} />}

            <main className="flex-1 px-4 lg:px-40 py-8 max-w-[1280px] mx-auto w-full mb-12">
                <div className="flex flex-col gap-6 mb-8">
                    <div className="w-full">
                        <form className="flex flex-col min-w-40 h-14 w-full">
                            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                                <div className="text-gray-400 flex border-none bg-white items-center justify-center pl-5 rounded-l-xl border-r-0">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input
                                    name="query"
                                    defaultValue={query}
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-gray-900 focus:outline-0 focus:ring-0 border-none bg-white focus:border-none h-full placeholder:text-gray-400 px-4 text-base font-normal leading-normal"
                                    placeholder="Buscar productos..."
                                />
                                {/* Maintain category if set */}
                                {category && <input type="hidden" name="category" value={category} />}
                                {/* Maintain sort if set */}
                                {sort && <input type="hidden" name="sort" value={sort} />}
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full">
                        {/* Categorias - Scroll Horizontal */}
                        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <Link href={`/?query=${query}&sort=${sort}`} className="shrink-0">
                                <div className={`flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full px-6 transition-all border border-gray-800 ${category === '' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-800 hover:text-white'}`}>
                                    <p className={`text-sm font-bold leading-normal`}>Todos</p>
                                </div>
                            </Link>
                            {categories.map((cat) => (
                                <Link key={cat} href={`/?category=${cat}&query=${query}&sort=${sort}`} className="shrink-0">
                                    <div className={`flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full px-6 transition-all border border-gray-800 ${category === cat ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 hover:bg-gray-800 hover:text-white'}`}>
                                        <p className={`text-sm font-bold leading-normal`}>
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

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
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
