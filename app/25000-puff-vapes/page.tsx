import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";
import Script from "next/script";

const PUFFS_25000_ID = "6a273f6318246c47491c5482";
const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/25000-puff-vapes`;

export const metadata: Metadata = {
  title: "25000 Puff Disposable Vapes | GetSmoke",
  description:
    "Shop 25,000 puff disposable vapes at GetSmoke. Featuring Geek Bar Pulse X, RAZ DC25000, Juicy Bar JB25000 and more. Free shipping over $89. Adults 21+ only.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "25000 puff vapes",
    "25k puff disposable vape",
    "best 25000 puff vape",
    "geek bar pulse x 25000",
    "raz dc25000",
    "juicy bar jb25000",
    "long lasting disposable vapes",
  ],
  openGraph: {
    title: "25000 Puff Disposable Vapes | GetSmoke",
    description: "Shop 25,000 puff rechargeable disposable vapes. Top brands, fast US shipping.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "25000 Puff Vapes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "25000 Puff Disposable Vapes | GetSmoke",
    description: "Shop 25,000 puff rechargeable disposable vapes. Top brands, fast US shipping.",
  },
};

export const dynamic = "force-dynamic";

async function getProducts() {
  return prisma.product.findMany({
    where: {
      stockStatus: { not: "OUTOFSTOCK" },
      isArchived: false,
      productType: "VAPES",
      productPuffs: { some: { puffs: { id: PUFFS_25000_ID } } },
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
  name: "25,000 Puff Disposable Vapes",
  description:
    "Shop 25,000 puff rechargeable disposable vapes including Geek Bar Pulse X, RAZ DC25000, and Juicy Bar JB25000 at GetSmoke.",
  url: PAGE_URL,
};

export default async function Puffs25000Page() {
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">25,000 Puff Disposable Vapes</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            25,000 puff disposable vapes are the sweet spot for high-puff performance. Models like
            the{" "}
            <Link
              href="/models/geek-bar-pulse-x-25000-puffs"
              className="text-orange-500 hover:underline"
            >
              Geek Bar Pulse X
            </Link>
            ,{" "}
            <Link
              href="/models/raz-dc25000-25000-puffs"
              className="text-orange-500 hover:underline"
            >
              RAZ DC25000
            </Link>
            , and{" "}
            <Link
              href="/models/juice-bar-jb25000-25000-puffs"
              className="text-orange-500 hover:underline"
            >
              Juicy Bar JB25000
            </Link>{" "}
            deliver 2-3 months of daily use per device. All are rechargeable with USB-C. Adults 21+
            only.
          </p>
          <p className="text-xs text-gray-400 mt-2">{products.length} products</p>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const imgUrl = product.images[0]?.url;
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
                      <p className="text-[10px] text-gray-400 mt-0.5">25,000 puffs</p>
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
          <h2 className="text-xl font-bold mb-4">25,000 Puff Vapes - FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How long does a 25,000 puff vape last?</h3>
              <p className="text-gray-600 text-sm mt-1">
                At 200-300 puffs per day, a 25,000 puff vape lasts approximately 2.5 to 4 months.
                The device will need to be recharged multiple times over its life.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Which 25,000 puff vape has the best flavor?</h3>
              <p className="text-gray-600 text-sm mt-1">
                RAZ DC25000 is widely praised for flavor accuracy. Geek Bar Pulse X excels for bold,
                intense flavors. Juicy Bar JB25000 offers the widest flavor variety. See our{" "}
                <Link
                  href="/blog/raz-vape-vs-juicy-bar-2026"
                  className="text-orange-500 hover:underline"
                >
                  RAZ vs Juicy Bar comparison
                </Link>{" "}
                for a full breakdown.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Do 25,000 puff vapes need to be charged?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. All 25,000 puff disposable vapes have rechargeable batteries. You will need to
                charge them via USB-C approximately every 2-5 days depending on usage.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
