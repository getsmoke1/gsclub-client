"use client"
import React from "react"
import Link from "next/link"

const brands = [
    { name: "GEEK BAR", slug: "geek-bar" },
    { name: "HQD", slug: "hqd" },
    { name: "JUICY BAR", slug: "juicy-bar" },
    { name: "RAZ", slug: "raz" },
    { name: "fume", slug: "fume" },
    { name: "FIFTY BAR", slug: "fifty-bar" },
    { name: "LOST MARY", slug: "lost-mary" },
    { name: "VIHO", slug: "viho" },
    { name: "FOGER", slug: "foger" },
    { name: "ADJUST", slug: "adjust" },
]

const BrandCircles = () => {
    return (
        <section
            className="w-full py-12 px-4"
            style={{ background: "linear-gradient(135deg, #2d0838 0%, #1a0020 100%)" }}
        >
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded font-bold text-white text-xl md:text-2xl text-center mb-8 uppercase">
                    Shop by Brand
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
                    {brands.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/brand/${brand.slug}`}
                            className="flex items-center justify-center w-32 h-32 md:w-36 md:h-36 rounded-full bg-white cursor-pointer hover:scale-105 transition-transform"
                            style={{ border: "3px solid #fe3500", boxShadow: "0 0 0 3px #ffc42e" }}
                        >
                            <span className="font-unbounded font-black text-center text-xs md:text-sm px-2 leading-tight uppercase">
                                {brand.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BrandCircles
