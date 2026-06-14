import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vape Brands | GetSmoke",
  description: "Shop all vape brands at GetSmoke - Geek Bar, RAZ, HQD, Lost Mary, Juicy Bar, FUME and more.",
};

export const dynamic = "force-dynamic";

// Map brand slugs to local logo files
const BRAND_LOGOS: Record<string, string> = {
  "geek-bar":   "/brand-logos/geek-bar-norm.png",
  "raz":        "/brand-logos/raz-norm.png",
  "hqd":        "/brand-logos/hqd-norm.png",
  "lost-mary":  "/brand-logos/lost-mary-norm.png",
  "fume":       "/brand-logos/fume-norm.png",
  "foger":      "/brand-logos/foger-norm.png",
  "fifty-bar":  "/brand-logos/fifty-bar-norm.png",
  "ebcreate":   "/brand-logos/ebcreate-norm.png",
  "juicy-bar":  "/brand-logos/juicy-bar.png",
  "viho":       "/brand-logos/viho.png",
  "kado-bar":   "/brand-logos/kado-bar.png",
  "flum-pebble":"/brand-logos/flum.png",
  "oxbar":      "/brand-logos/oxbar.png",
  "x-posed":    "/brand-logos/x-posed.png",
  "adjust":     "/brand-logos/adjust.png",
  "beri":       "/brand-logos/beri.png",
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
              className="group border-2 border-black rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-[#fe3500] hover:shadow-md transition-all bg-white min-h-[140px]"
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-[60px] w-auto"
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
