import Link from 'next/link';
import { Product } from '@prisma/client';

interface ProductCardProps {
    storeSlug: string;
    product: Product;
}

export function ProductCard({ storeSlug, product }: ProductCardProps) {
    const images = JSON.parse(product.images) as string[];
    const mainImage = images[0] || '/placeholder.png';

    const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    }).format(product.price);

    return (
        <Link
            href={`/${storeSlug}/producto/${product.id}`}
            className="group relative flex flex-col w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 block border border-gray-100/50"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url("${mainImage}")` }}
                role="img"
                aria-label={product.name}
            ></div>

            {/* Gradient Overlay for better text legibility at the top/bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                <span className="backdrop-blur-md bg-white/20 text-white border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {product.category}
                </span>
                {!product.inStock && (
                    <span className="backdrop-blur-md bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        Sin Stock
                    </span>
                )}
            </div>

            {/* Bottom Content - Frosted Glass */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 md:p-5 rounded-[1.5rem] shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white text-base md:text-xl font-black leading-tight line-clamp-1 drop-shadow-md">
                            {product.name}
                        </h3>
                        <p className="text-white font-black text-sm md:text-lg bg-black/40 px-3 py-1 rounded-full drop-shadow-md whitespace-nowrap ml-2">
                            {formattedPrice}
                        </p>
                    </div>

                    <p className="text-gray-200 text-xs md:text-sm line-clamp-2 transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out font-medium drop-shadow-sm h-0 group-hover:h-auto overflow-hidden">
                        {product.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
