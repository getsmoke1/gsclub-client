import React from "react"
import Link from "next/link"
import Image from "next/image"

const featured = [
    { name: "RAZ",       slug: "raz",       logo: "/brand-logos/raz-clean.png"       },
    { name: "GEEK BAR",  slug: "geek-bar",  logo: "/brand-logos/geek-bar-clean.png"  },
    { name: "HQD",       slug: "hqd",       logo: "/brand-logos/hqd-clean.png"       },
    { name: "FUME",      slug: "fume",      logo: "/brand-logos/fume-clean.png"      },
    { name: "LOST MARY", slug: "lost-mary", logo: "/brand-logos/lost-mary-clean.png" },
    { name: "FOGER",     slug: "foger",     logo: "/brand-logos/foger-clean.png"     },
    { name: "FIFTY BAR", slug: "fifty-bar", logo: "/brand-logos/fifty-bar-clean.png" },
    { name: "EBCREATE",  slug: "ebcreate",  logo: "/brand-logos/ebcreate-clean.png"  },
]

const BrandCircles = () => {
    return (
        <section className="w-full bg-white pt-4 pb-6">
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded text-center text-xl font-normal mb-5">
                    SHOP BY <strong>BRAND</strong>
                </h2>

                {/* 2 columns × 4 rows = 8 logos, uniform size */}
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                    {featured.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/brand/${brand.slug}`}
                            className="flex items-center justify-center p-5 bg-white hover:bg-gray-50 transition-colors"
                            style={{ height: "100px" }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain p-2"
                                    sizes="45vw"
                                />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-6">
                    <Link
                        href="/brands"
                        className="inline-block border-2 border-black text-black font-unbounded font-bold text-xs px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors uppercase"
                    >
                        View All Brands
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BrandCircles
