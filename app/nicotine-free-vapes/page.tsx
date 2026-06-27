import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";
import Script from "next/script";

const NICOTINE_0_ID = "6a27423c9dde15843c7ba233";
const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/nicotine-free-vapes`;

export const metadata: Metadata = {
  title: "Nicotine Free Disposable Vapes (0%) | GetSmoke",
  description:
    "Shop 0% nicotine disposable vapes at GetSmoke. All the flavor and vapor with zero nicotine. Top brands, rechargeable devices, fast US shipping. Adults 21+ only.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "nicotine free vapes",
    "0 nicotine disposable vape",
    "0% nicotine vape",
    "vape without nicotine",
    "nicotine free disposable",
    "zero nicotine vape",
  ],
  openGraph: {
    title: "Nicotine Free Disposable Vapes (0%) | GetSmoke",
    description:
      "Shop 0% nicotine disposable vapes. All the flavor, zero nicotine. Fast US shipping.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "Nicotine Free Vapes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicotine Free Disposable Vapes (0%) | GetSmoke",
    description: "Shop 0% nicotine disposable vapes. All the flavor, zero nicotine.",
  },
};

export const dynamic = "force-dynamic";

async function getProducts() {
  return prisma.product.findMany({
    where: {
      stockStatus: { not: "OUTOFSTOCK" },
      isArchived: false,
      productType: "VAPES",
      nicotineId: NICOTINE_0_ID,
      NOT: { name: { contains: "Pack Of", mode: "insensitive" } },
    },
    include: {
      brand: { select: { name: true, slug: true } },
      flavor: { select: { name: true } },
      images: { take: 1, orderBy: { position: "asc" } },
      productPuffs: { include: { puffs: { select: { name: true } } }, take: 1 },
    },
    orderBy: { currentPrice: "asc" },
    take: 96,
  });
}

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Nicotine Free Disposable Vapes",
  description:
    "Shop 0% nicotine disposable vapes at GetSmoke. All the flavor and vapor with zero nicotine.",
  url: PAGE_URL,
};

export default async function NicotineFreePage() {
  const products = await getProducts();

  return (
    <>
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        strategy="beforeInteractive"
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Nicotine Free Disposable Vapes</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            0% nicotine disposable vapes deliver the full flavor and vapor experience without any
            nicotine. Ideal for vapers who have successfully quit nicotine and still enjoy the
            ritual, or those who simply want a nicotine-free alternative. All devices produce real
            vapor from propylene glycol and vegetable glycerin base with food-grade flavorings.
            Adults 21+ only.
          </p>
          {products.length > 0 && (
            <p className="text-xs text-gray-400 mt-2">{products.length} products</p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 mb-4">
              Currently no nicotine-free products in stock. Check back soon.
            </p>
            <Link href="/vapes" className="text-orange-500 hover:underline">
              Browse all disposable vapes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const imgUrl = product.images[0]?.url;
              const puffs = product.productPuffs[0]?.puffs?.name;
              const isPreOrder = product.stockStatus === "PREORDER";

              return (
                <div
                  key={product.id}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="relative aspect-square bg-gray-50">
                      {imgUrl ? (
                        <Image
                          src={r2src(imgUrl)}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                      {isPreOrder && (
                        <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Pre-Order
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        0% NIC
                      </div>
                    </div>
                    <div className="px-3 pt-2 pb-1">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        {product.brand.name}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 leading-tight mt-0.5 line-clamp-2">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold">
                          ${product.currentPrice.toFixed(2)}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice > product.currentPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                      {puffs && (
                        <p className="text-[10px] text-gray-400 mt-0.5">{puffs} puffs</p>
                      )}
                    </div>
                  </Link>
                  <div className="px-3 pb-3">
                    <AddToCartButton product={product as unknown as Product} compact />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Nicotine Free Vapes - FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Are nicotine-free vapes safe?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Nicotine-free vapes eliminate nicotine dependency risk, but inhalation of any vapor
                is not without risk. 0% nicotine vapes are intended for adults 21 and older only and
                are not recommended for those who do not currently vape or smoke.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Do nicotine-free vapes still produce vapor?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. 0% nicotine vapes produce the same amount of vapor as their nicotine-containing
                counterparts. The e-liquid still contains PG, VG, and flavorings - nicotine is
                simply not added.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can nicotine-free vapes help you quit nicotine?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Some vapers use 0% nicotine devices as a final step in reducing nicotine intake
                after stepping down from 5% to 3% to 0%. This approach is a personal choice and
                not medical advice.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
