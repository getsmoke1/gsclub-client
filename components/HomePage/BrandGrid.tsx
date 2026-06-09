"use client"
import React from 'react'
import Link from 'next/link'

const brands = [
    { name: 'Geek Bar', slug: 'geek-bar', color: '#003399' },
    { name: 'Lost Mary', slug: 'lost-mary', color: '#fe3500' },
    { name: 'RAZ', slug: 'raz', color: '#090808' },
    { name: 'VIHO', slug: 'viho', color: '#003399' },
    { name: 'HQD', slug: 'hqd', color: '#fe3500' },
    { name: 'FUME', slug: 'fume', color: '#090808' },
    { name: 'Juicy Bar', slug: 'juicy-bar', color: '#003399' },
    { name: 'Foger', slug: 'foger', color: '#fe3500' },
    { name: 'Adjust', slug: 'adjust', color: '#090808' },
    { name: 'Fifty Bar', slug: 'fifty-bar', color: '#003399' },
    { name: 'Tyson 2.0', slug: 'tyson-2-0', color: '#fe3500' },
    { name: 'Kado Bar', slug: 'kado-bar', color: '#090808' },
]

const BrandGrid = () => {
    return (
        <section className="w-11/12 mx-auto py-10">
            <h2 className="font-unbounded font-bold text-2xl text-center mb-8 uppercase">Shop by Brand</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {brands.map((brand) => (
                    <Link
                        key={brand.slug}
                        href={`/brand/${brand.slug}`}
                        className="flex items-center justify-center rounded-lg p-4 text-white font-unbounded font-bold text-sm text-center uppercase hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: brand.color, minHeight: '64px' }}
                    >
                        {brand.name}
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default BrandGrid
