import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";
import Script from "next/script";

const PUFFS_20000_ID = "6a273f6d18246c47491c5493";
const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/20000-puff-vapes`;

export const metadata: Metadata = {
  title: "20000 Puff Disposable Vapes | GetSmoke",
  description:
    "Shop 20,000 puff disposable vapes at GetSmoke. Long-lasting rechargeable disposables from top brands. Free shipping over $89. Adults 21+ only.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "20000 puff vapes",
    "20000 puff disposable vape",
    "20k puff vape",
    "long lasting disposable vape",
    "best 20000 puff vape",
    "high puff count vapes",
  ],
  openGraph: {
    title: "20000 Puff Disposable Vapes | GetSmoke",
    description: "Shop 20,000 puff rechargeable disposable vapes. Fast US shipping, 21+ only.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "20000 Puff Vapes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "20000 Puff Disposable Vapes | GetSmoke",
    description: "Shop 20,000 puff rechargeable disposable vapes. Fast US shipping.",
  },
};

export const revalidate = 3600;

async function getProducts() {
  return prisma.product.findMany({
    where: {
      stockStatus: { not: "OUTOFSTOCK" },
      isArchived: false,
      productType: "VAPES",
      productPuffs: { some: { puffs: { id: PUFFS_20000_ID } } },
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
  name: "20,000 Puff Disposable Vapes",
  description:
    "Shop 20,000 puff rechargeable disposable vapes at GetSmoke. Long-lasting high-puff vapes from top brands.",
  url: PAGE_URL,
};

export default async function Puffs20000Page() {
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">20,000 Puff Disposable Vapes</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            20,000 puff disposable vapes are built for vapers who want long-lasting performance
            without constantly buying replacements. All devices are rechargeable via USB-C and
            feature nicotine salt e-liquid for smooth, satisfying hits. Browse the full 20k puff
            selection below - or explore{" "}
            <Link href="/25000-puff-vapes" className="text-orange-500 hover:underline">
              25,000 puff vapes
            </Link>{" "}
            for even longer lasting options. Adults 21+ only.
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
                      <p className="text-[10px] text-gray-400 mt-0.5">20,000 puffs</p>
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
          <h2 className="text-xl font-bold mb-4">20,000 Puff Vapes - FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How long does a 20,000 puff vape last?</h3>
              <p className="text-gray-600 text-sm mt-1">
                For an average vaper taking 200-300 puffs per day, a 20,000 puff vape lasts
                approximately 2-3 months. Heavy vapers may get 4-6 weeks of use.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Are 20,000 puff vapes rechargeable?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. All 20,000+ puff disposable vapes at GetSmoke come with USB-C charging. The
                battery needs to be recharged multiple times before the e-liquid runs out.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">What is the best 20,000 puff disposable vape?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Top-rated 20,000 puff vapes include models from Geek Bar, Juicy Bar, and HQD. Check
                our full selection above or read our{" "}
                <Link href="/blog" className="text-orange-500 hover:underline">
                  vape comparison blog
                </Link>{" "}
                for detailed reviews.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
