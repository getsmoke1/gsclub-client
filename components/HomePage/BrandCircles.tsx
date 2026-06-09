"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const BrandCircles = () => {
    return (
        <section className="w-full">
            {/* Brand banner image from getsmoke.com — exact mirror */}
            <div className="relative w-full">
                <Image
                    src="https://getsmoke.com/wp-content/uploads/2024/06/Brands-2.png"
                    alt="Shop by Brand - Geek Bar, HQD, Juicy Bar, RAZ, FUME and more"
                    width={1920}
                    height={473}
                    className="w-full h-auto"
                    unoptimized
                />
                {/* Invisible clickable areas over brand circles */}
                <div className="absolute inset-0 flex items-center justify-around px-4">
                    {[
                        { slug: "geek-bar", label: "Geek Bar" },
                        { slug: "hqd", label: "HQD" },
                        { slug: "juicy-bar", label: "Juicy Bar" },
                        { slug: "raz", label: "RAZ" },
                        { slug: "fume", label: "FUME" },
                        { slug: "fifty-bar", label: "Fifty Bar" },
                    ].map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/brand/${brand.slug}`}
                            className="flex-1 h-full cursor-pointer"
                            aria-label={`Shop ${brand.label}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BrandCircles
