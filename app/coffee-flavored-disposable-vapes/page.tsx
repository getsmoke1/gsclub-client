import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/coffee-flavored-disposable-vapes`;

export const metadata: Metadata = {
  title: "Coffee Flavored Disposable Vapes | GetSmoke",
  description:
    "Shop coffee flavored disposable vapes at GetSmoke. Colombian Coffee, Italian Coffee, Coffee Ice and more. Top brands, fast US shipping. Adults 21+ only.",
  alternates: { canonical: PAGE_URL },
  keywords: ["coffee vape", "coffee flavored disposable vape", "coffee ice vape", "colombian coffee vape", "italian coffee vape", "coffee disposable"],
  openGraph: {
    title: "Coffee Flavored Disposable Vapes | GetSmoke",
    description: "Shop coffee flavored disposable vapes - Colombian Coffee, Coffee Ice, Italian Coffee and more.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "Coffee Flavored Vapes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Flavored Disposable Vapes | GetSmoke",
    description: "Shop coffee flavored disposable vapes. Fast US shipping, 21+ only.",
  },
};

export const dynamic = "force-dynamic";

async function getCoffeeProducts() {
  return prisma.product.findMany({
    where: {
      isArchived: false,
      stockStatus: { not: "OUTOFSTOCK" },
      name: { contains: "coffee", mode: "insensitive" },
      NOT: { name: { contains: "Pack Of", mode: "insensitive" } },
    },
    include: {
      brand: { select: { name: true, slug: true } },
      flavor: { select: { name: true } },
      images: { take: 1, orderBy: { position: "asc" } },
      productPuffs: { include: { puffs: { select: { name: true } } }, take: 1 },
    },
    orderBy: { currentPrice: "asc" },
    take: 48,
  });
}

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Coffee Flavored Disposable Vapes",
  description: "Shop coffee flavored disposable vapes at GetSmoke. Colombian Coffee, Italian Coffee, Coffee Ice and more.",
  url: PAGE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a coffee vape taste like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Coffee vapes typically replicate the taste of espresso, cold brew, or iced coffee. Colombian Coffee Ice flavors combine coffee with a cool menthol finish. Italian Coffee Ice adds a richer, darker roast profile. The best coffee vapes smell and taste remarkably similar to your morning cup.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best coffee flavored disposable vape?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most popular coffee disposable vapes at GetSmoke include Colombian Coffee Ice by Juicy Bar and HQD. These flavors consistently rank as top sellers among coffee enthusiasts. The Colombian Coffee Ice profile combines a medium roast coffee taste with a light icy finish.",
      },
    },
    {
      "@type": "Question",
      name: "Do coffee vapes contain actual coffee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Coffee vapes use food-grade flavor concentrates to replicate the taste and aroma of coffee. They do not contain actual coffee beans, caffeine, or coffee extract. The nicotine salt e-liquid is the only active ingredient beyond the flavoring.",
      },
    },
  ],
};

export default async function CoffeeVapesPage() {
  const products = await getCoffeeProducts();

  return (
    <>
      <Script id="collection-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} strategy="beforeInteractive" />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Coffee Flavored Disposable Vapes</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            For vapers who love coffee. From Colombian Coffee Ice to Italian Espresso, these
            disposable vapes deliver rich coffee flavor with smooth nicotine salt delivery. All
            devices are rechargeable with fast US shipping. Adults 21+ only.
          </p>
          <p className="text-xs text-gray-400 mt-2">{products.length} products</p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 mb-4">No coffee flavored products currently in stock.</p>
            <Link href="/vapes" className="text-orange-500 hover:underline">Browse all vapes</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {products.map((product) => {
              const imgUrl = product.images[0]?.url;
              const puffs = product.productPuffs[0]?.puffs?.name;
              const isPreOrder = product.stockStatus === "PREORDER";
              return (
                <div key={product.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="relative aspect-square bg-gray-50">
                      {imgUrl ? (
                        <Image src={r2src(imgUrl)} alt={product.name} fill className="object-contain p-2" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                      {isPreOrder && (
                        <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Pre-Order</div>
                      )}
                    </div>
                    <div className="px-3 pt-2 pb-1">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">{product.brand.name}</p>
                      <p className="text-sm font-semibold text-gray-900 leading-tight mt-0.5 line-clamp-2">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold">${product.currentPrice.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.currentPrice && (
                          <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      {puffs && <p className="text-[10px] text-gray-400 mt-0.5">{puffs} puffs</p>}
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

        <section className="border-t pt-8 mt-4 max-w-3xl">
          <h2 className="text-xl font-bold mb-3">About Coffee Flavored Vapes</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Coffee flavored disposable vapes have become one of the most popular flavor categories among
            adult vapers. The combination of rich, roasted coffee notes with smooth nicotine salt delivery
            creates a uniquely satisfying experience that many coffee drinkers gravitate toward.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            The most popular variants are <strong>Colombian Coffee Ice</strong> (bright coffee + menthol)
            and <strong>Italian Coffee Ice</strong> (dark roast espresso profile). Both are available in
            multiple brands and puff counts at GetSmoke.
          </p>
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
