import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vape Brands | GetSmoke",
  description: "Shop all vape brands at GetSmoke - Geek Bar, RAZ, HQD, Lost Mary, Juicy Bar, FUME and more.",
  alternates: { canonical: "https://getsmoke.com/brands" },
};

export const dynamic = "force-dynamic";

// Brands whose logos should render larger in the grid
const LARGE_LOGO_SLUGS = new Set([
  "adjust", "beri", "fifty-bar", "fumytech", "juicy-bar",
  "kado-bar", "lost-art", "lost-mary", "oxbar", "viho", "x-posed", "ovns",
]);

// Map brand slugs to local logo files
const BRAND_LOGOS: Record<string, string> = {
  // Named clean/norm versions (no orange arc)
  "geek-bar":   "/brand-logos/geek-bar-norm.png",
  "raz":        "/brand-logos/raz-norm.png",
  "hqd":        "/brand-logos/hqd-norm.png",
  "lost-mary":  "/brand-logos/lost-mary-norm.png",
  "fume":       "/brand-logos/fume-norm.png",
  "foger":      "/brand-logos/foger-norm.png",
  "fifty-bar":  "/brand-logos/fifty-bar-norm.png",
  "ebcreate":   "/brand-logos/ebcreate-norm.png",
  "juicy-bar":  "/brand-logos/juicy-bar-clean.png",
  "viho":       "/brand-logos/viho-clean.png",
  "kado-bar":   "/brand-logos/kado-bar-clean.png",
  "flum-pebble":"/brand-logos/blogo-25.png",
  "oxbar":      "/brand-logos/oxbar-clean.png",
  "x-posed":    "/brand-logos/x-posed-clean.png",
  "adjust":     "/brand-logos/adjust-clean.png",
  "beri":       "/brand-logos/beri-clean.png",
  // Previously text-only — now have logos
  "tyson-2-0":  "/brand-logos/blogo-22.png",
  "olit":       "/brand-logos/blogo-18.png",
  "rama":       "/brand-logos/blogo-30.png",
  "lost-art":   "/brand-logos/brand-logo-8.png",
  "fumytech":   "/brand-logos/fumytech-norm.png",
  "cookies":    "/brand-logos/blogo-28.png",
  "coconara":   "/brand-logos/coconara-norm.png",
  "al-fakher":  "/brand-logos/blogo-20.png",
  "ovns":       "/brand-logos/ovns-norm.png",
};

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  // Filter brands with products
  const activeBrands = brands.filter(b => b._count.products > 0 && b.slug !== "other");

  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 font-unbounded">
      <h1 className="font-bold text-2xl md:text-3xl mb-2">Brands</h1>
      <p className="text-gray-500 text-sm mb-8">Shop by your favourite brand</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeBrands.map((brand) => {
          const logo = brand.slug ? BRAND_LOGOS[brand.slug] : undefined;
          return (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group border-2 border-black rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-[#fe3500] hover:shadow-md transition-all bg-white aspect-square md:aspect-auto md:min-h-[140px]"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={brand.name}
                  width={brand.slug && LARGE_LOGO_SLUGS.has(brand.slug) ? 220 : 120}
                  height={brand.slug && LARGE_LOGO_SLUGS.has(brand.slug) ? 110 : 60}
                  className={`object-contain w-auto ${brand.slug && LARGE_LOGO_SLUGS.has(brand.slug) ? "max-h-[110px]" : "max-h-[60px]"}`}
                />
              ) : (
                <span className="font-bold text-base text-center">{brand.name}</span>
              )}
              {logo && (
                <span className="text-xs text-gray-400 font-normal group-hover:text-[#fe3500] transition-colors">
                  {brand._count.products} products
                </span>
              )}
              {!logo && (
                <span className="text-xs text-gray-400 font-normal">
                  {brand._count.products} products
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
