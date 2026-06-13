import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    { label: 'DISPOSABLES', href: '/vapes',     img: '/categories/disposables.webp' },
    { label: 'DELTA',        href: '/delta',     img: '/categories/delta.webp'       },
    { label: 'VAPE JUICE',   href: '/vape-juice', img: '/categories/vape-juice.webp' },
    { label: 'HOOKAH',       href: '/hookah',    img: '/categories/hookah.webp'      },
];

const ShopByCategory = () => {
    return (
        <section className="w-full bg-white pt-2 pb-4">
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded text-center text-xl font-normal mb-3">
                    SHOP BY <strong>CATEGORY</strong>
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                        <Link key={cat.label} href={cat.href} className="block group">
                            <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '100%' }}>
                                <Image
                                    src={cat.img}
                                    alt={cat.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/30" />
                                {/* Label top-left, Unbounded bold */}
                                <div className="absolute top-3 left-3">
                                    <span className="font-unbounded font-bold text-white text-xs leading-tight drop-shadow-lg">
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
