"use client"
import React, { useState, useEffect } from 'react';

const slides = [
    { desktop: '/banners/desktop-1.webp', mobile: '/banners/mobile-july4.webp', alt: '4th of July Sale - GetSmoke' },
    { desktop: '/banners/desktop-1.webp', mobile: '/banners/mobile-1.webp', alt: 'Welcome to our VapeShop' },
    { desktop: '/banners/desktop-2.webp', mobile: '/banners/mobile-2.webp', alt: 'Beri Crush 50K' },
    { desktop: '/banners/desktop-3.webp', mobile: '/banners/mobile-3.webp', alt: 'EBCreate BC Pro' },
    { desktop: '/banners/desktop-4.webp', mobile: '/banners/mobile-4.webp', alt: 'New Arrivals' },
    { desktop: '/banners/desktop-5.webp', mobile: '/banners/mobile-5.webp', alt: 'New In - Lost Mary' },
    { desktop: '/banners/desktop-6.webp', mobile: '/banners/mobile-6.webp', alt: 'New Collection' },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, []);

    const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent(c => (c + 1) % slides.length);

    return (
        <section className="w-full relative overflow-hidden">
            {/* Height spacers */}
            <div className="hidden md:block" style={{ paddingBottom: '36.4%' }} />
            <div className="block md:hidden" style={{ paddingBottom: '148.8%' }} />

            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {/* Mobile */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={slide.mobile}
                        alt={slide.alt}
                        className="block md:hidden"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        {...(i === 0 ? { fetchPriority: 'high' } : {})}
                    />
                    {/* Desktop */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={slide.desktop}
                        alt={slide.alt}
                        className="hidden md:block"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        {...(i === 0 ? { fetchPriority: 'high' } : {})}
                    />
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20" style={{ left: '50%', WebkitTransform: 'translateX(-50%)', transform: 'translateX(-50%)' }}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
                        style={{ height: '8px', borderRadius: '9999px', background: i === current ? 'white' : 'rgba(255,255,255,0.5)', width: i === current ? '20px' : '8px' }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Arrows - desktop only */}
            <button onClick={prev} className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white text-2xl" aria-label="Previous slide">‹</button>
            <button onClick={next} className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white text-2xl" aria-label="Next slide">›</button>
        </section>
    );
};

export default Hero;
