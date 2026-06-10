"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #0a1a4e 100%)', minHeight: '280px' }}>
            <div className="w-11/12 mx-auto py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left: text */}
                <div className="flex flex-col gap-4 text-white max-w-lg z-10">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg w-fit" style={{ backgroundColor: '#ffc42e', color: '#000' }}>
                        No more trips to stores
                    </span>
                    <div>
                        <p className="text-base md:text-lg font-normal text-white/80">Welcome to our</p>
                        <h1 className="font-unbounded font-extrabold text-4xl md:text-6xl uppercase leading-tight text-white">
                            VAPESHOP
                        </h1>
                    </div>
                    <p className="text-sm text-gray-300 max-w-sm">
                        Top brands: Geek Bar, Lost Mary, RAZ, VIHO, HQD, FUME. Fast shipping across the USA.
                    </p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                        <Link href="/vapes" className="font-unbounded font-bold px-6 py-2.5 rounded text-white text-xs uppercase" style={{ backgroundColor: '#fe3500' }}>
                            Shop Now
                        </Link>
                        <Link href="/brand/geek-bar" className="font-unbounded font-bold px-6 py-2.5 rounded text-white text-xs uppercase border border-white/50 hover:bg-white hover:text-black transition-colors">
                            Geek Bar
                        </Link>
                    </div>
                </div>
                {/* Right: visual */}
                <div className="hidden md:flex relative items-center justify-center w-[380px] h-[220px]">
                    <span className="absolute text-[120px] font-extrabold text-white/10 font-unbounded select-none">35K</span>
                    <span className="absolute top-4 right-8 text-3xl font-extrabold font-unbounded" style={{ color: '#ffc42e' }}>NEW IN</span>
                    <Image
                        src="https://getsmoke.com/wp-content/uploads/2024/07/Mystery-box-2.png"
                        alt="New vapes"
                        width={200}
                        height={200}
                        className="object-contain z-10 drop-shadow-2xl"
                        unoptimized
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
