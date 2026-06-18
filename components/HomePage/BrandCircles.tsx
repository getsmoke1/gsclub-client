import React from "react"
import Link from "next/link"
import Image from "next/image"

/* Mobile: 8 featured brands (unchanged) */
const featured = [
    { name: "RAZ",       slug: "raz",       logo: "/brand-logos/raz-norm.png"       },
    { name: "GEEK BAR",  slug: "geek-bar",  logo: "/brand-logos/geek-bar-norm.png"  },
    { name: "HQD",       slug: "hqd",       logo: "/brand-logos/hqd-norm.png"       },
    { name: "FUME",      slug: "fume",      logo: "/brand-logos/fume-norm.png"      },
    { name: "LOST MARY", slug: "lost-mary", logo: "/brand-logos/lost-mary-norm.png" },
    { name: "FOGER",     slug: "foger",     logo: "/brand-logos/foger-norm.png"     },
    { name: "FIFTY BAR", slug: "fifty-bar", logo: "/brand-logos/fifty-bar-norm.png" },
    { name: "EBCREATE",  slug: "ebcreate",  logo: "/brand-logos/ebcreate-norm.png"  },
]

/* Desktop: all brands (Figma layout - 4 rows × 8 cols = 32 brands) */
/* large: true = use bigger image padding so small logos fill more of the cell */
const allBrands = [
    { name: "RAZ",           slug: "raz",           logo: "/brand-logos/raz-norm.png"        },
    { name: "JUICY BAR",     slug: "juicy-bar",     logo: "/brand-logos/juicy-bar-clean.png", large: true },
    { name: "GEEK BAR",      slug: "geek-bar",      logo: "/brand-logos/geek-bar-norm.png"   },
    { name: "HQD",           slug: "hqd",           logo: "/brand-logos/hqd-norm.png"        },
    { name: "fume",          slug: "fume",          logo: "/brand-logos/fume-norm.png"       },
    { name: "LostArt",       slug: "lost-art",      logo: "/brand-logos/brand-logo-8.png"   },
    { name: "TYSON",         slug: "tyson-2-0",     logo: "/brand-logos/blogo-22.png"        },

    { name: "FLUM",          slug: "flum-pebble",   logo: "/brand-logos/blogo-25.png"        },
    { name: "LOST MARY",     slug: "lost-mary",     logo: "/brand-logos/lost-mary-norm.png"  },
    { name: "FIFTY BAR",     slug: "fifty-bar",     logo: "/brand-logos/fifty-bar-norm.png", large: true },
    { name: "Cookies",       slug: "cookies",       logo: "/brand-logos/blogo-28.png"        },
    { name: "EBCREATE",      slug: "ebcreate",      logo: "/brand-logos/ebcreate-norm.png"   },
    { name: "X-POSED",       slug: "x-posed",       logo: "/brand-logos/x-posed-clean.png",  large: true },

    { name: "FOGER",         slug: "foger",         logo: "/brand-logos/foger-norm.png",     large: true },
    { name: "COCONARA",      slug: "coconara",      logo: "/brand-logos/coconara-norm.png"   },
    { name: "BERi",          slug: "beri",          logo: "/brand-logos/beri-clean.png",     large: true },
    { name: "OXBAR",         slug: "oxbar",         logo: "/brand-logos/oxbar-clean.png",    large: true },
    { name: "OLIT",          slug: "olit",          logo: "/brand-logos/blogo-18.png"        },
    { name: "KADOBAR",       slug: "kado-bar",      logo: "/brand-logos/kado-bar-clean.png", large: true },
    { name: "AL FAKHER",     slug: "al-fakher",     logo: "/brand-logos/blogo-20.png"        },
    { name: "VIHO",          slug: "viho",          logo: "/brand-logos/viho-clean.png",     large: true },
    { name: "adjust",        slug: "adjust",        logo: "/brand-logos/adjust-clean.png",   large: true },
    { name: "RAMA",          slug: "rama",          logo: "/brand-logos/blogo-30.png"        },
    { name: "FUMYTECH",      slug: "fumytech",      logo: "/brand-logos/fumytech-norm.png",  large: true },
]

const BrandCircles = () => {
    return (
        <section className="w-full bg-white pt-4 pb-6">
            <div className="w-11/12 mx-auto">
                <h2 className="font-unbounded text-center text-xl font-normal mb-5">
                    SHOP BY <strong>BRAND</strong>
                </h2>

                {/* Mobile: 2 columns × 4 rows, 8 featured brands with cell borders */}
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden md:hidden">
                    {featured.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/brands/${brand.slug}`}
                            className="flex items-center justify-center p-4 bg-white hover:bg-gray-50 transition-colors"
                            style={{ height: "120px" }}
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

                {/* Desktop: 8 columns, curated brands, clickable */}
                <div className="hidden md:grid md:grid-cols-8 gap-y-4 gap-x-2">
                    {allBrands.map((brand, idx) => (
                        <Link
                            key={`${brand.slug}-${idx}`}
                            href={`/brands/${brand.slug}`}
                            className="flex items-center justify-center bg-white hover:bg-gray-50 rounded-xl transition-colors cursor-pointer overflow-hidden"
                            style={{ height: "90px", width: "100%", minWidth: 0 }}
                        >
                            {brand.logo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        padding: (brand as {large?: boolean}).large ? "4px" : "14px",
                                        display: "block",
                                    }}
                                />
                            ) : (
                                <span className="font-unbounded font-bold text-xs text-black text-center leading-tight px-1">
                                    {brand.name}
                                </span>
                            )}
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
// cache bust Fri Jun 19 03:55:30 +08 2026
