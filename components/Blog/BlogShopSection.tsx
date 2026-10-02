"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { Product } from "@/types/product";

interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  currentPrice: number;
  stockStatus: string;
  packCount?: number | null;
  imageUrl?: string | null;
}

interface BlogShopSectionProps {
  products: ShopProduct[];
  title?: string;
  modelSlug?: string;
  modelName?: string;
}

const BlogShopSection = ({ products, title = "Shop Featured Products", modelSlug }: BlogShopSectionProps) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-black">{title}</h2>
        {modelSlug && (
          <Link
            href={`/models/${modelSlug}`}
            className="text-sm font-semibold text-purple-600 hover:underline"
          >
            View all flavors →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <Link href={`/product/${product.slug}`} className="block">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50">
                {product.imageUrl ? (
                  <Image
                    src={r2src(product.imageUrl)}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 16vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                )}
              </div>
              <p className="text-xs font-semibold text-gray-800 mt-2 leading-tight line-clamp-2">{product.name}</p>
              <p className="text-sm font-bold text-black">${product.currentPrice.toFixed(2)}</p>
            </Link>
            <AddToCartButton
              product={{
                ...product,
                id: product.id,
                currentPrice: product.currentPrice,
                stockStatus: product.stockStatus as Product["stockStatus"],
                packCount: product.packCount || null,
              } as Product}
              compact
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogShopSection;
