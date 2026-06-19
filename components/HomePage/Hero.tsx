"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
    {
        desktop: '/banners/desktop-1.jpeg',
        mobile: '/banners/mobile-1.jpeg',
        alt: 'Welcome to our VapeShop',
        href: '/vapes',
    },
    {
        desktop: '/banners/desktop-2.jpg',
        mobile: '/banners/mobile-2.jpg',
        alt: 'Beri Crush 50K',
        href: '/brands/beri',
    },
    {
        desktop: '/banners/desktop-3.jpg',
        mobile: '/banners/mobile-3.jpg',
        alt: 'EBCreate BC Pro',
        href: '/brands/ebcreate',
    },
    {
        desktop: '/banners/desktop-4.jpeg',
        mobile: '/banners/mobile-4.jpeg',
        alt: 'New Arrivals',
        href: '/vapes',
    },
    {
        desktop: '/banners/desktop-5.jpg',
        mobile: '/banners/mobile-5.jpg',
        alt: 'New In – Lost Mary',
        href: '/brands/lost-mary',
    },
    {
        desktop: '/banners/desktop-6.jpeg',
        mobile: '/banners/mobile-6.jpeg',
        alt: 'New Collection',
        href: '/vapes',
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setCurrent(c => (c + 1) % slides.length);
        }, 5000);
        return () => clearInterval(t);
    }, []);

    const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent(c => (c + 1) % slides.length);

    return (
        <section className="w-full overflow-hidden">
            {/* Safari-safe: no fill, no padding-bottom trick. Use explicit aspect-ratio via wrapper. */}

            {/* Mobile slider */}
            <div className="block md:hidden relative" style={{ aspectRatio: '860/1280' }}>
                {slides.map((slide, i) => (
                    <Link
                        key={i}
                        href={slide.href}
                        className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        tabIndex={i === current ? 0 : -1}
                        style={{ display: 'block', width: '100%', height: '100%' }}
                    >
                        <img
                            src={slide.mobile}
                            alt={slide.alt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            loading={i === 0 ? 'eager' : 'lazy'}
                        />
                    </Link>
                ))}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop slider */}
            <div className="hidden md:block relative" style={{ aspectRatio: '2560/933' }}>
                {slides.map((slide, i) => (
                    <Link
                        key={i}
                        href={slide.href}
                        className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        tabIndex={i === current ? 0 : -1}
                        style={{ display: 'block', width: '100%', height: '100%' }}
                    >
                        <img
                            src={slide.desktop}
                            alt={slide.alt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            loading={i === 0 ? 'eager' : 'lazy'}
                        />
                    </Link>
                ))}
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
                {/* Arrows */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white text-2xl"
                    aria-label="Previous slide"
                >
                    ‹
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white text-2xl"
                    aria-label="Next slide"
                >
                    ›
                </button>
            </div>
        </section>
    );
};

export default Hero;
