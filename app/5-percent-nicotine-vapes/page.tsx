import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";
import Script from "next/script";

const NICOTINE_5_ID = "6a273f5218246c47491c5464";
const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/5-percent-nicotine-vapes`;

export const metadata: Metadata = {
  title: "5% Nicotine Disposable Vapes | GetSmoke",
  description:
    "Shop the best 5% nicotine disposable vapes at GetSmoke. Top brands like Geek Bar, Juicy Bar, RAZ and Lost Mary with 5% (50mg) nicotine salt. Free shipping over $89. Adults 21+ only.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "5 percent nicotine vapes",
    "5% nicotine disposable vape",
    "50mg nicotine vape",
    "strongest disposable vapes",
    "high nicotine vapes",
    "5 nicotine salt vapes",
  ],
  openGraph: {
    title: "5% Nicotine Disposable Vapes | GetSmoke",
    description:
      "Shop the best 5% nicotine disposable vapes. Top brands, fast US shipping, 21+ only.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "5% Nicotine Vapes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "5% Nicotine Disposable Vapes | GetSmoke",
    description: "Shop the best 5% nicotine disposable vapes. Top brands, fast US shipping.",
  },
};

export const revalidate = 3600;

async function getProducts() {
  return prisma.product.findMany({
    where: {
      stockStatus: { not: "OUTOFSTOCK" },
      isArchived: false,
      productType: "VAPES",
      nicotineId: NICOTINE_5_ID,
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
  name: "5% Nicotine Disposable Vapes",
  description:
    "Shop the best 5% nicotine disposable vapes at GetSmoke. High-nicotine salt (50mg) disposable vapes from top brands.",
  url: PAGE_URL,
  mainEntity: {
    "@type": "ItemList",
    name: "5% Nicotine Disposable Vapes",
    url: PAGE_URL,
  },
};

export default async function Nicotine5PercentPage() {
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            5% Nicotine Disposable Vapes
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            The strongest nicotine strength available in disposable vapes. 5% (50mg) nicotine salt
            delivers a fast, satisfying hit - ideal for smokers switching to vaping or experienced
            vapers who prefer high nicotine. Shop top brands including{" "}
            <Link href="/brands/geek-bar" className="text-orange-500 hover:underline">
              Geek Bar
            </Link>
            ,{" "}
            <Link href="/brands/juicy-bar" className="text-orange-500 hover:underline">
              Juicy Bar
            </Link>
            ,{" "}
            <Link href="/brands/raz" className="text-orange-500 hover:underline">
              RAZ
            </Link>{" "}
            and{" "}
            <Link href="/brands/lost-mary" className="text-orange-500 hover:underline">
              Lost Mary
            </Link>
            . Free shipping on orders over $89. Adults 21+ only.
          </p>
          <p className="text-xs text-gray-400 mt-2">{products.length} products</p>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No products found.</p>
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

        {/* FAQ Section */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">5% Nicotine Vapes - FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">What does 5% nicotine mean in a vape?</h3>
              <p className="text-gray-600 text-sm mt-1">
                5% nicotine means the e-liquid contains 50mg of nicotine per milliliter (nicotine
                salt form). This is the highest common nicotine strength in disposable vapes and
                delivers a fast, cigarette-like satisfaction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Is 5% nicotine too strong for beginners?</h3>
              <p className="text-gray-600 text-sm mt-1">
                For non-smokers, 5% may be too strong. It is best suited for current smokers making
                the switch or experienced vapers. Beginners may want to start with 3% nicotine
                options.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Which brands offer the best 5% nicotine vapes?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Top-rated 5% nicotine disposable brands at GetSmoke include Geek Bar Pulse X, RAZ
                DC25000, Juicy Bar JB25000 PRO MAX, and Lost Mary MT35000. All deliver consistent
                nicotine delivery with excellent flavors.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
