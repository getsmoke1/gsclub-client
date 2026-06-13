"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
        href: '/brand/beri',
    },
    {
        desktop: '/banners/desktop-3.jpg',
        mobile: '/banners/mobile-3.jpg',
        alt: 'EBCreate BC Pro',
        href: '/brand/ebcreate',
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
        href: '/brand/lost-mary',
    },
    {
        desktop: '/banners/desktop-6.jpeg',
        mobile: '/banners/mobile-6.jpeg',
        alt: 'New Collection',
        href: '/vapes',
    },
];

// Copy existing banners to new names for slides 2 & 3
// (Beri and EBCreate were previously downloaded to /categories area, now in /banners)

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
        <section className="w-full relative overflow-hidden">
            {/* Desktop aspect ratio: 2560x933 ≈ 36.5% | Mobile: 860x1280 portrait */}
            <div className="hidden md:block" style={{ paddingBottom: '36.4%' }} />
            <div className="block md:hidden" style={{ paddingBottom: '148.8%' }} />

            {slides.map((slide, i) => (
                <Link
                    key={i}
                    href={slide.href}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    tabIndex={i === current ? 0 : -1}
                >
                    {/* Mobile image */}
                    <Image
                        src={slide.mobile}
                        alt={slide.alt}
                        fill
                        className="object-contain object-center md:hidden"
                        priority={i === 0}
                        sizes="100vw"
                    />
                    {/* Desktop image */}
                    <Image
                        src={slide.desktop}
                        alt={slide.alt}
                        fill
                        className="object-contain object-center hidden md:block"
                        priority={i === 0}
                        sizes="100vw"
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

            {/* Arrows — hidden on mobile, visible on desktop */}
            <button
                onClick={prev}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white text-2xl"
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button
                onClick={next}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white text-2xl"
                aria-label="Next slide"
            >
                ›
            </button>
        </section>
    );
};

export default Hero;
