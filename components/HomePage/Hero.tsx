"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
    {
        desktop: 'https://getsmoke.com/wp-content/uploads/2025/10/Main-banner-Beri-1-scaled.jpg',
        mobile: 'https://getsmoke.com/wp-content/uploads/2025/10/Main-banner-Beri-mob-1-scaled.jpg',
        alt: 'Beri Crush 50K – Welcome to our VapeShop',
        href: '/brand/beri',
    },
    {
        desktop: 'https://getsmoke.com/wp-content/uploads/2025/10/Main-banner-ebcreate-scaled.jpg',
        mobile: 'https://getsmoke.com/wp-content/uploads/2025/10/Main-banner-ebcreate-mob-scaled.jpg',
        alt: 'EBCreate BC Pro – Welcome to our VapeShop',
        href: '/brand/ebcreate',
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

    return (
        <section className="w-full relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
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
                        className="object-cover object-center md:hidden"
                        priority={i === 0}
                        unoptimized
                    />
                    {/* Desktop image */}
                    <Image
                        src={slide.desktop}
                        alt={slide.alt}
                        fill
                        className="object-cover object-center hidden md:block"
                        priority={i === 0}
                        unoptimized
                    />
                </Link>
            ))}

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button
                onClick={() => setCurrent(c => (c + 1) % slides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
                aria-label="Next slide"
            >
                ›
            </button>
        </section>
    );
};

export default Hero;
