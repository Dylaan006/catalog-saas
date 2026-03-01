'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
    id: number;
    title: string;
    description: string;
    image: string;
    ctaDetails: {
        text: string;
        href: string;
    }
}

export function HeroCarousel({ config, storeSlug }: { config?: any; storeSlug?: string }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides: Slide[] = [
        {
            id: 1,
            title: "iPhone 15 Pro. Forjado en Titanio.",
            description: "El nuevo chip A17 Pro. Una victoria monumental para el rendimiento y la eficiencia en la palma de tu mano.",
            // Using a tech product image since we can't get the exact transparent iphone render right now
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
            ctaDetails: { text: "Comprar", href: `/${storeSlug || ''}?category=Electrónica` }
        },
        {
            id: 2,
            title: "MacBook Pro M3",
            description: "Alucinante. Y punto. La laptop pro más avanzada del mundo. Ahora con la familia de chips M3.",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop",
            ctaDetails: { text: "Comprar", href: `/${storeSlug || ''}?category=Electrónica` }
        }
    ];

    let displaySlides = slides;
    if (config?.heroImageUrls) {
        try {
            const images = JSON.parse(config.heroImageUrls);
            if (Array.isArray(images) && images.length > 0) {
                displaySlides = images.map((img: string, idx: number) => ({
                    id: idx,
                    title: config.heroTitle || "Bienvenido",
                    description: config.heroSubtitle || "",
                    image: img,
                    ctaDetails: { text: "Ver Catálogo", href: `/${storeSlug || ''}?sort=newest` }
                }));
            }
        } catch (e) { }
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [displaySlides.length]); // Add dependency

    return (
        <div className="relative w-full overflow-hidden bg-[#05050A] group xl:rounded-[2.5rem] xl:mx-auto max-w-[1400px] xl:mb-10 xl:mt-4 shadow-2xl min-h-[500px] md:min-h-[600px] flex items-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

            {/* Slides */}
            {displaySlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center ${index === currentSlide ? 'opacity-100 x-0 z-10 scale-100' : 'opacity-0 scale-95 z-0 pointer-events-none'}`}
                >
                    <div className="relative z-20 h-full w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center py-12 md:py-0">
                        {/* Left Content */}
                        <div className="w-full md:w-[55%] text-white space-y-6 animate-fade-in-up pr-0 md:pr-8 mb-10 md:mb-0">
                            <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.04em] text-white">
                                {slide.title.split('. ').map((part, i, arr) => (
                                    <span key={i} className={i === 1 ? 'text-gray-400 block' : 'block'}>
                                        {part}{i !== arr.length - 1 && '.'}
                                    </span>
                                ))}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-lg mt-4">
                                {slide.description}
                            </p>
                            <div className="pt-6 flex flex-wrap gap-4">
                                <Link
                                    href={slide.ctaDetails.href}
                                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-[15px] transition-colors"
                                >
                                    {slide.ctaDetails.text}
                                </Link>
                                <Link
                                    href={slide.ctaDetails.href}
                                    className="inline-flex items-center justify-center bg-transparent border border-gray-600 text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold text-[15px] transition-colors"
                                >
                                    Más información
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="w-full md:w-[45%] h-full flex justify-center items-center relative">
                            <div className="relative w-full max-w-[500px] aspect-[4/3] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Desktop Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
                aria-label="Previous slide"
            >
                <span className="material-symbols-outlined block text-2xl">arrow_back_ios_new</span>
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/10"
                aria-label="Next slide"
            >
                <span className="material-symbols-outlined block text-2xl">arrow_forward_ios</span>
            </button>

            {/* Bottom Controls (Dots + Mobile Arrows) */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-4 md:gap-3 px-4">
                {/* Mobile Prev */}
                <button
                    onClick={prevSlide}
                    className="md:hidden p-1 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border border-white/10 active:scale-95"
                    aria-label="Previous slide"
                >
                    <span className="material-symbols-outlined block text-base">arrow_back_ios_new</span>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {displaySlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white w-6'
                                : 'bg-white/40 w-2 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Mobile Next */}
                <button
                    onClick={nextSlide}
                    className="md:hidden p-1 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border border-white/10 active:scale-95"
                    aria-label="Next slide"
                >
                    <span className="material-symbols-outlined block text-base">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    );
}
