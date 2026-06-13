"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    {
        label: 'DISPOSABLES',
        href: '/vapes',
        img: '/categories/disposables.jpg',
    },
    {
        label: 'DELTA',
        href: '/delta',
        img: '/categories/delta.jpg',
    },
    {
        label: 'VAPE JUICE',
        href: '/vape-juice',
        img: '/categories/vape-juice.jpg',
    },
    {
        label: 'HOOKAH',
        href: '/hookah',
        img: '/categories/hookah.jpg',
    },
];

const ShopByCategory = () => {
    return (
        <section className="w-full bg-white py-10">
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded text-center text-2xl font-normal mb-8">
                    SHOP BY <strong>CATEGORY</strong>
                </h2>
                {/* 2x2 grid on mobile, 4 cols on desktop */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {categories.map((cat) => (
                        <Link key={cat.label} href={cat.href} className="block group">
                            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                                {/* Background image */}
                                <Image
                                    src={cat.img}
                                    alt={cat.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/40" />
                                {/* Label at top-left */}
                                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                                    <span className="font-unbounded font-bold text-white uppercase text-xs md:text-sm leading-tight drop-shadow-md">
                                        {cat.label}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopByCategory;
