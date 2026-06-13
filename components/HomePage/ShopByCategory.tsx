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
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                    {categories.map((cat) => (
                        <Link key={cat.label} href={cat.href} className="block group">
                            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                {/* Background image */}
                                <Image
                                    src={cat.img}
                                    alt={cat.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 33vw, 30vw"
                                />
                                {/* Dark gradient overlay bottom-to-top */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 65%)'
                                    }}
                                />
                                {/* Label at bottom-left */}
                                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">
                                    <span className="font-unbounded font-bold text-white uppercase text-xs md:text-sm leading-tight">
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
