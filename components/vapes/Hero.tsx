import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="w-full relative overflow-hidden" style={{ minHeight: '400px', maxHeight: '600px' }}>
            {/* Background banner image */}
            <Image
                src="/images/home_banner.jpg"
                alt="GetSmoke - Best Disposable Vapes Online"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 py-20 md:py-28">
                <h1 className="text-3xl md:text-5xl font-bold uppercase font-unbounded mb-4 leading-tight">
                    Best Disposable Vapes<br />
                    <span style={{ color: '#fe3500' }}>Online Store</span>
                </h1>
                <p className="text-sm md:text-base mb-8 max-w-xl opacity-90">
                    Top brands: Geek Bar, Lost Mary, RAZ, VIHO, HQD, FUME and more. Fast shipping across the USA.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Link href="/vapes"
                        className="font-unbounded font-bold px-8 py-3 rounded text-white text-sm uppercase tracking-wide transition-colors"
                        style={{ backgroundColor: '#fe3500' }}
                    >
                        Shop Now
                    </Link>
                    <Link href="/brand/geek-bar"
                        className="font-unbounded font-bold px-8 py-3 rounded text-white text-sm uppercase tracking-wide border border-white hover:bg-white hover:text-black transition-colors"
                    >
                        Geek Bar
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
