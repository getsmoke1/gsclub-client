import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
    { label: 'DISPOSABLES', href: '/vapes',      img: '/categories/disposables.webp', desktopOnly: false },
    { label: 'PODS',        href: '/pods',        img: '/categories/pods.webp',        desktopOnly: false, mobileOnly: true },
    { label: 'VAPE JUICE',  href: '/vape-juice',  img: '/categories/vape-juice.webp',  desktopOnly: false },
    { label: 'HOOKAH',      href: '/hookah',      img: '/categories/hookah.webp',      desktopOnly: false },
];

const ShopByCategory = () => {
    return (
        <section className="w-full bg-white pt-2 pb-4">
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded text-center text-xl font-normal mb-3">
                    SHOP BY <strong>CATEGORY</strong>
                </h2>
                {/* Mobile: 2×2 grid with all 4 categories */}
                <div className="grid grid-cols-2 gap-2 md:hidden">
                    {categories.map((cat) => (
                        <Link key={cat.label} href={cat.href} className="block group">
                            <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '100%' }}>
                                <Image
                                    src={cat.img}
                                    alt={cat.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="50vw"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute top-3 left-3">
                                    <span className="font-unbounded font-bold text-white text-xs leading-tight drop-shadow-lg">
                                        {cat.label}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Desktop: 3 categories in a horizontal row (no DELTA) */}
                <div className="hidden md:grid md:grid-cols-3 gap-4">
                    {categories.filter(c => !c.mobileOnly).map((cat) => (
                        <Link key={cat.label} href={cat.href} className="block group">
                            <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: '60%' }}>
                                <Image
                                    src={cat.img}
                                    alt={cat.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="33vw"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute top-4 left-4">
                                    <span className="font-unbounded font-bold text-white text-sm leading-tight drop-shadow-lg">
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
