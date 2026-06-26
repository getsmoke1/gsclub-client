"use client";
import React, { useRef, useEffect } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import ProductShimmer from "./ProductShimmer";
import { useFilter } from "@/hooks/useFilter";
import GenericModelCard from "@/components/ModelPage/GenericModelCard";
import { MODELS } from "@/lib/models-config";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import AddToCartButton from "@/components/Cart/AddToCartButton";

type ProductsProps = {
  productType?: string;
  search?: string; // e.g. "pack" to filter bundle products
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialProducts?: any[];
};

const Products = ({ productType, search, initialProducts }: ProductsProps) => {
  const { brandId, flavorId, puffsId, nicotineId, clearFilters } = useFilter();

  // Clear filters when productType changes (navigating between sections)
  const prevProductTypeRef = useRef(productType);
  useEffect(() => {
    if (prevProductTypeRef.current !== productType) {
      clearFilters();
      prevProductTypeRef.current = productType;
    }
  }, [productType, clearFilters]);

  const limit = 24; // Items per page

  // Ref for scrolling to top of component on filter change
  const componentRef = useRef<HTMLElement>(null);

  // Sentinel ref for IntersectionObserver
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track previous filter values to detect when filters actually change
  const prevFiltersRef = useRef({ brandId, flavorId, puffsId, nicotineId });

  // Function to fetch products
  const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const url = "/api/products?";
    const params = new URLSearchParams();
    if (brandId) params.append("brandId", brandId);
    if (flavorId) params.append("flavorId", flavorId);
    if (puffsId) params.append("puffsId", puffsId);
    if (nicotineId) params.append("nicotineId", nicotineId);
    if (productType) params.append("productType", productType);
    if (search) params.append("search", search);
    params.append("page", pageParam.toString());
    params.append("limit", limit.toString());

    const response = await fetch(url + params.toString());
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  };

  // TanStack Query infinite hook
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", productType, search, brandId, flavorId, puffsId, nicotineId],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.totalPages ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    // Only use initialData when no filters are active (otherwise stale server data overrides filter results)
    initialData: (initialProducts?.length && !brandId && !flavorId && !puffsId && !nicotineId)
      ? {
          pages: [{ products: initialProducts, hasNextPage: initialProducts.length >= 24, page: 1, pageSize: 24, totalCount: initialProducts.length, totalPages: Math.ceil(initialProducts.length / 24) + 1 }],
          pageParams: [1],
        }
      : undefined,
    initialDataUpdatedAt: (initialProducts?.length && !brandId && !flavorId && !puffsId && !nicotineId) ? Date.now() : undefined,
  });

  // Flatten all pages into a single array, then interleave by brand (round-robin)
  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  const products = React.useMemo(() => {
    const arr = [...allProducts];
    // Group by brandId
    const byBrand: Record<string, typeof arr> = {};
    for (const p of arr) {
      const key = (p as { brandId?: string }).brandId || "unknown";
      if (!byBrand[key]) byBrand[key] = [];
      byBrand[key].push(p);
    }
    // Round-robin: pick one from each brand in turn
    const groups = Object.values(byBrand);
    const result: typeof arr = [];
    const maxLen = Math.max(0, ...groups.map((g) => g.length));
    for (let i = 0; i < maxLen; i++) {
      for (const g of groups) {
        if (g[i]) result.push(g[i]);
      }
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Scroll to top of component when filters change
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const currentFilters = { brandId, flavorId, puffsId, nicotineId };

    const filtersChanged =
      prevFilters.brandId !== currentFilters.brandId ||
      prevFilters.flavorId !== currentFilters.flavorId ||
      prevFilters.puffsId !== currentFilters.puffsId ||
      prevFilters.nicotineId !== currentFilters.nicotineId;

    if (filtersChanged) {
      if (componentRef.current) {
        componentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    prevFiltersRef.current = currentFilters;
  }, [brandId, flavorId, puffsId, nicotineId]);

  // IntersectionObserver - stable ref pattern to avoid infinite observer recreation
  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingRef = useRef(isFetchingNextPage);
  const fetchNextPageRef = useRef(fetchNextPage);
  hasNextPageRef.current = hasNextPage;
  isFetchingRef.current = isFetchingNextPage;
  fetchNextPageRef.current = fetchNextPage;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPageRef.current && !isFetchingRef.current) {
          fetchNextPageRef.current();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []); // empty deps - observer created once, reads current values via refs

  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto">
        <ProductShimmer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 bg-red-100 p-4 rounded-md">
          <p className="font-semibold">Error loading products</p>
          <p>{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  // Show featured model cards only on first load, no filters active, productType === "VAPES"
  const showFeaturedModels =
    !brandId && !flavorId && !puffsId && !nicotineId && productType === "VAPES";

  return (
    <section
      ref={componentRef}
      className="bg-white text-black font-unbounded w-11/12 mx-auto pb-16"
    >
      {products.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            {brandId || flavorId || puffsId || nicotineId
              ? "No products match your filters"
              : "No products available at the moment"}
          </h3>
          <p className="text-sm text-gray-500">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 xl:gap-10">
            {/* Featured model listing cards - all 54 models, shown only when no filters active and productType === "VAPES" */}
            {showFeaturedModels && (
              <>
                {MODELS.map((model) => (
                  <GenericModelCard key={model.slug} model={model} />
                ))}
              </>
            )}

            {products.map((product: Product) => (
              <div
                key={product.id}
                className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col h-full bg-white"
              >
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="relative bg-gray-50" style={{ paddingTop: "100%" }}>
                    <div className="absolute inset-0">
                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="object-cover w-full h-full"
                          loading="eager"
                          style={{ height: "100%", width: "100%" }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ShoppingBag className="h-10 w-10 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-2 md:p-3">
                    <div className="text-center text-sm font-bold text-black">
                      ${product.currentPrice.toFixed(2)}
                      {product.originalPrice && product.originalPrice > product.currentPrice && (
                        <span className="block text-xs text-gray-500 font-normal">
                          or subscribe to save up to 10%
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xs md:text-sm text-center mt-1">
                      {product.brand.name}
                    </h3>
                    <h3 className="font-bold text-xs md:text-sm text-center line-clamp-2 mt-0.5 leading-4">
                      {product.name}
                    </h3>
                    {product.packCount > 1 && (
                      <p className="text-center text-xs mt-1">Pack Of {product.packCount}</p>
                    )}
                  </div>
                </Link>
                <div className="mt-auto px-2 md:px-3 pb-2 md:pb-3 flex flex-col gap-2" style={{ paddingLeft: '12px', paddingRight: '12px', paddingBottom: '12px' }}>
                  <Link href={`/product/${product.slug}`} className="text-center text-xs underline">
                    View Product
                  </Link>
                  <AddToCartButton product={product as never} compact={true} />
                  <p className="text-center text-[9px] text-gray-400 mt-1 leading-tight">
                    21+ only - Nicotine is addictive
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sentinel for IntersectionObserver */}
          <div ref={sentinelRef} className="h-4 w-full" />

          {/* Loading spinner when fetching next page */}
          {isFetchingNextPage && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          )}

          {/* End of results indicator */}
          {!hasNextPage && products.length > 0 && (
            <div className="flex justify-center py-8">
              <p className="text-sm text-gray-400">All products loaded</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Products;
