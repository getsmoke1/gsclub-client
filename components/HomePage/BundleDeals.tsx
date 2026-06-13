"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  currentPrice: number;
  originalPrice?: number;
  images: { url: string }[];
  brand: { name: string };
  packCount?: number | null;
}

const BundleDeals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showLeft, setShowLeft] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showRight, setShowRight] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products?search=pack&limit=20&page=1")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  // Extract pack number from product name e.g. "pack of 3" → "PACK OF 3"
  const getPackLabel = (name: string) => {
    const match = name.match(/pack of (\d+)/i);
    return match ? `PACK OF ${match[1]}` : "BUNDLE";
  };

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-unbounded text-xl md:text-2xl font-bold uppercase tracking-wide">
          BUNDLE DEALS{" "}
          <span className="font-light text-gray-500">| Stock Up on Vapes</span>
        </h2>
      </div>

      {/* 2-col grid — matches Figma */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border-2 border-black rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-[160px] bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-8 bg-gray-200 rounded-full" />
                  </div>
                </div>
              ))
            : products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/product/${product.slug}`)}
                >
                  <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-purple-600 transition-colors flex flex-col h-full">
                    {/* Image + badge */}
                    <div className="relative bg-gray-100" style={{ paddingBottom: '100%' }}>
                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ShoppingBag className="h-10 w-10 text-gray-300" />
                        </div>
                      )}
                      {/* Pack badge */}
                      <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {getPackLabel(product.name)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col gap-1 flex-grow justify-between">
                      <div>
                        <p className="font-bold text-sm text-center">{product.brand.name}</p>
                        <p className="text-xs text-center text-gray-600 line-clamp-2">{product.name}</p>
                        <p className="text-center font-bold text-sm mt-1" style={{ color: "#7c3aed" }}>
                          ${product.currentPrice.toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="w-full py-2 rounded-full text-white text-xs font-bold mt-2"
                        style={{ background: "linear-gradient(135deg, #7c3aed 0%, #9b59b6 100%)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        view product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
      </div>

      {/* View all */}
      <div className="text-center mt-6">
        <Link
          href="/vapes?search=pack"
          className="inline-block bg-black text-white font-unbounded font-bold text-sm px-8 py-3 rounded-full hover:bg-gray-900 transition-colors uppercase"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default BundleDeals;
