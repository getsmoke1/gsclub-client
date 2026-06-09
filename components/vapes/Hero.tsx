"use client"
import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section
            className="w-full relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1a0a2e 0%, #003399 40%, #0a1a4e 100%)',
                minHeight: '220px',
            }}
        >
            <div className="w-11/12 mx-auto py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: text */}
                <div className="flex flex-col gap-3 text-white max-w-lg">
                    <span
                        className="text-xs font-bold uppercase px-3 py-1 rounded w-fit"
                        style={{ backgroundColor: '#ffc42e', color: '#000' }}
                    >
                        No more trips to stores
                    </span>
                    <h1 className="font-unbounded font-bold text-2xl md:text-4xl uppercase leading-tight">
                        Welcome to our<br />
                        <span style={{ color: '#fe3500' }}>VAPESHOP</span>
                    </h1>
                    <p className="text-sm text-gray-300 max-w-sm">
                        Top brands: Geek Bar, Lost Mary, RAZ, VIHO, HQD, FUME. Fast shipping across the USA.
                    </p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                        <Link href="/vapes"
                            className="font-unbounded font-bold px-6 py-2.5 rounded text-white text-xs uppercase"
                            style={{ backgroundColor: '#fe3500' }}
                        >
                            Shop Now
                        </Link>
                        <Link href="/brand/geek-bar"
                            className="font-unbounded font-bold px-6 py-2.5 rounded text-white text-xs uppercase border border-white hover:bg-white hover:text-black transition-colors"
                        >
                            Geek Bar
                        </Link>
                    </div>
                </div>

                {/* Right: brand pills */}
                <div className="hidden md:flex flex-wrap gap-2 max-w-xs justify-end">
                    {['Geek Bar','Lost Mary','RAZ','VIHO','HQD','FUME','Juicy Bar','Foger'].map(b => (
                        <span
                            key={b}
                            className="text-white text-xs font-unbounded px-3 py-1 rounded-full border border-white/30"
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                        >
                            {b}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
