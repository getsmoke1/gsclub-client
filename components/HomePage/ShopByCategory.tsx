"use client"
import React from 'react';
import Link from 'next/link';

const categories = [
    {
        label: 'DISPOSABLES',
        href: '/vapes',
        gradient: 'linear-gradient(135deg, #fe3500 0%, #ff6b35 100%)',
        img: '/categories/disposables.jpg',
    },
    {
        label: 'VAPE JUICE',
        href: '/vape-juice',
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        img: '/categories/vape-juice.jpg',
    },
    {
        label: 'HOOKAH',
        href: '/hookah',
        gradient: 'linear-gradient(135deg, #003399 0%, #0066cc 100%)',
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <Link key={cat.label} href={cat.href} className="block group">
                            <div
                                className="relative rounded-2xl overflow-hidden h-44 w-full"
                                style={{ background: cat.gradient }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-75 transition-opacity"
                                    style={{ backgroundImage: `url(${cat.img})` }}
                                />
                                <div className="absolute inset-0 flex items-end p-4">
                                    <span className="bg-white text-black font-unbounded font-bold text-xs px-3 py-1.5 rounded-md uppercase">
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
