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

interface BundleDealsProps {
  initialProducts?: Product[];
}

const BundleDeals: React.FC<BundleDealsProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts?.length);
  const scrollRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showLeft, setShowLeft] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showRight, setShowRight] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (initialProducts?.length) return; // skip fetch if server-prefetched
    fetch("/api/products?search=pack&limit=20&page=1")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                  <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col h-full bg-white">
                    {/* Image */}
                    <div className="relative bg-gray-50" style={{ paddingTop: '100%' }}>
                      <div className="absolute inset-0">
                        {product.images.length > 0 ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ShoppingBag className="h-10 w-10 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-2 md:p-3 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="text-center text-sm font-bold text-black">
                          ${product.currentPrice.toFixed(2)}
                          <span className="block text-xs text-gray-500 font-normal">
                            — or subscribe to save up to 10%
                          </span>
                        </div>
                        <h3 className="font-bold text-xs md:text-sm text-center mt-1">
                          {product.brand.name}
                        </h3>
                        <h3 className="font-bold text-xs md:text-sm text-center line-clamp-2 mt-0.5 leading-4">
                          {product.name}
                        </h3>
                        <p className="text-center text-xs mt-1">{getPackLabel(product.name)}</p>
                      </div>
                      <div className="mt-3 flex flex-col gap-2 px-1">
                        <span className="text-center text-xs underline cursor-pointer">View Product</span>
                        <button
                          className="w-full py-2.5 rounded-full text-white text-sm font-bold cursor-pointer"
                          style={{ background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          select options
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
      </div>

      {/* View all */}
      <div className="text-center mt-6">
        <Link
          href="/bundles"
          className="inline-block bg-black text-white font-unbounded font-bold text-sm px-8 py-3 rounded-full hover:bg-gray-900 transition-colors uppercase"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default BundleDeals;
