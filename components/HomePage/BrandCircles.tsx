"use client"
import React from "react"
import Link from "next/link"

const brands = [
    { name: "HQD", slug: "hqd" },
    { name: "Geek Bar", slug: "geek-bar" },
    { name: "RAZ", slug: "raz" },
    { name: "Juicy Bar", slug: "juicy-bar" },
    { name: "Lost Mary", slug: "lost-mary" },
    { name: "FUME", slug: "fume" },
    { name: "EBCreate", slug: "ebcreate" },
    { name: "VIHO", slug: "viho" },
    { name: "Fifty Bar", slug: "fifty-bar" },
    { name: "ELFTHC", slug: "elfthc" },
    { name: "Tyson", slug: "tyson" },
    { name: "Beri", slug: "beri" },
    { name: "Foger", slug: "foger" },
    { name: "OXBAR", slug: "oxbar" },
    { name: "Al Fakher", slug: "al-fakher" },
    { name: "Smok", slug: "smok" },
    { name: "torch", slug: "torch" },
    { name: "RIA", slug: "ria" },
    { name: "Kado Bar", slug: "kado-bar" },
    { name: "Blaze", slug: "blaze" },
    { name: "Cookies", slug: "cookies" },
]

const BrandCircles = () => {
    return (
        <section
            className="w-full py-10"
            style={{
                background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 40%, #0f1a2e 100%)",
                backgroundImage: `url(https://getsmoke.com/wp-content/uploads/2024/07/Bkg.png.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
            }}
        >
            <p className="text-center text-white font-unbounded font-bold text-sm uppercase tracking-widest mb-8">
                BRANDS
            </p>
            <div className="w-11/12 mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
                {brands.map((brand) => (
                    <Link
                        key={brand.slug}
                        href={`/brand/${brand.slug}`}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border-2 border-white/20">
                            <span className="font-unbounded font-bold text-black text-center leading-tight px-1"
                                style={{ fontSize: brand.name.length > 8 ? '7px' : brand.name.length > 6 ? '8px' : '9px' }}>
                                {brand.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default BrandCircles
