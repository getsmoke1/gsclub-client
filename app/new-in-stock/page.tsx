import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "New In Stock - Latest Disposable Vapes | GetSmoke",
  description: "Shop the newest disposable vapes just added to GetSmoke. Fresh arrivals including Juicy Bar, Geek Bar, HQD and more. Free shipping over $89.",
  alternates: { canonical: "https://getsmoke.com/new-in-stock" },
  openGraph: {
    title: "New In Stock - Latest Disposable Vapes | GetSmoke",
    description: "Shop the newest disposable vapes just added to GetSmoke.",
    url: "https://getsmoke.com/new-in-stock",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

export const revalidate = 3600;

async function getNewProducts() {
  return prisma.product.findMany({
    where: {
      stockStatus: { not: "OUTOFSTOCK" },
      // Exclude packs
      NOT: { name: { contains: "Pack Of", mode: "insensitive" } },
    },
    include: {
      brand: { select: { name: true, slug: true } },
      flavor: { select: { name: true } },
      Nicotine: { select: { name: true } },
      images: { take: 1, orderBy: { position: "asc" } },
      productPuffs: { include: { puffs: { select: { name: true } } }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
    take: 48,
  });
}

export default async function NewInStockPage() {
  const products = await getNewProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New In Stock</h1>
        <p className="text-gray-500">Latest arrivals - fresh vapes just added to our store</p>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No new products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => {
            const imgUrl = product.images[0]?.url;
            const puffs = product.productPuffs[0]?.puffs?.name;
            const isPreOrder = product.stockStatus === "PREORDER";

            return (
              <div key={product.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="relative aspect-square bg-gray-50">
                    {imgUrl ? (
                      <Image
                        src={r2src(imgUrl)}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        loading="eager"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                    {isPreOrder && (
                      <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Pre-Order
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </div>
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
    </main>
  );
}
