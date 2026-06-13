"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"

// Brands with logo images downloaded to /public/brand-logos/
const brands = [
    { name: "RAZ", slug: "raz", logo: "/brand-logos/raz.png" },
    { name: "EBCREATE", slug: "ebcreate", logo: "/brand-logos/ebcreate.png" },
    { name: "Beri", slug: "beri", logo: "/brand-logos/beri.png" },
    { name: "ELFTHC", slug: "elfthc", logo: null },
    { name: "X-POSED", slug: "x-posed", logo: "/brand-logos/x-posed.png" },
    { name: "Juicy Bar", slug: "juicy-bar", logo: "/brand-logos/juicy-bar.png" },
    { name: "RIA", slug: "ria", logo: "/brand-logos/ria.png" },
    { name: "Foger", slug: "foger", logo: "/brand-logos/foger.png" },
    { name: "Lost Mary", slug: "lost-mary", logo: "/brand-logos/lost-mary.png" },
    { name: "HQD", slug: "hqd", logo: "/brand-logos/hqd.png" },
    { name: "Geek Bar", slug: "geek-bar", logo: "/brand-logos/geek-bar.png" },
    { name: "Fifty Bar", slug: "fifty-bar", logo: "/brand-logos/fifty-bar.png" },
    { name: "FUME", slug: "fume", logo: "/brand-logos/fume.png" },
    { name: "OXBAR", slug: "oxbar", logo: "/brand-logos/oxbar.png" },
    { name: "Fasta", slug: "fasta", logo: "/brand-logos/fasta.png" },
    { name: "Flum", slug: "flum-pebble", logo: "/brand-logos/flum.png" },
    { name: "VIHO", slug: "viho", logo: "/brand-logos/viho.png" },
    { name: "KadoBar", slug: "kado-bar", logo: "/brand-logos/kado-bar.png" },
    { name: "SMOK", slug: "smok", logo: "/brand-logos/smok.png" },
    { name: "Adjust", slug: "adjust", logo: "/brand-logos/adjust.png" },
    { name: "Al Fakher", slug: "al-fakher", logo: null },
    { name: "PillowTalk", slug: "pillow-talk", logo: "/brand-logos/pillow-talk.png" },
]

const BrandCircles = () => {
    return (
        <section className="w-full bg-white py-10">
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded text-center text-2xl font-normal mb-8">
                    SHOP BY <strong>BRAND</strong>
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                    {brands.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/brand/${brand.slug}`}
                            className="flex items-center justify-center group"
                        >
                            <div className="w-full flex items-center justify-center h-16 md:h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                                {brand.logo ? (
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        width={120}
                                        height={60}
                                        className="object-contain max-h-14 md:max-h-16 w-auto"
                                        sizes="120px"
                                    />
                                ) : (
                                    <span className="font-unbounded font-bold text-black text-center text-sm leading-tight px-1">
                                        {brand.name}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/brands"
                        className="inline-block border-2 border-black text-black font-unbounded font-bold text-sm px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors uppercase"
                    >
                        View All Brands
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BrandCircles
