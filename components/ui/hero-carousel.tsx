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

const slides: Slide[] = [
    {
        id: 1,
        title: "Descubre Nuestra Nueva Colección",
        description: "Encuentra las mejores piezas de diseño y tecnología seleccionadas para elevar tu espacio personal.",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop", // Sofá verde estilo moderno
        ctaDetails: { text: "Ver Novedades", href: "/?sort=newest" }
    },
    {
        id: 2,
        title: "Tecnología que Inspira",
        description: "Dispositivos de última generación para un estilo de vida conectado y eficiente.",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop", // Setup electronico clean
        ctaDetails: { text: "Ver Electrónica", href: "/?category=Electrónica" }
    },
    {
        id: 3,
        title: "Minimalismo para tu Hogar",
        description: "Muebles y decoración que combinan funcionalidad con una estética impecable.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop", // Muebles minimalistas
        ctaDetails: { text: "Explorar Decoración", href: "/?category=Decoración" }
    }
];

export function HeroCarousel({ config }: { config?: any }) {
    const [currentSlide, setCurrentSlide] = useState(0);

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
                    ctaDetails: { text: "Ver Catálogo", href: "/?sort=newest" }
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
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900 group">
            {/* Slides */}
            {displaySlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Dark Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 h-full max-w-[1280px] mx-auto px-4 lg:px-40 flex items-center">
                        <div className="max-w-2xl text-white space-y-6 animate-fade-in-up">
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-lg">
                                {slide.description}
                            </p>
                            <div className="pt-4">
                                <Link
                                    href={slide.ctaDetails.href}
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    {slide.ctaDetails.text}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
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
