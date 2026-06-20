"use client";
import React, { useRef, useCallback } from "react";
import { ShoppingBag, } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/Cart/AddToCartButton";
// useFilter intentionally NOT used here — homepage always shows unfiltered products
import { Product } from "@/types/product";
import Image from "next/image";
import GenericModelCard from "@/components/ModelPage/GenericModelCard";
import { MODELS } from "@/lib/models-config";

import { useInfiniteQuery } from "@tanstack/react-query";
import HorizontalProductShimmer from "./HorizontalProductShimmer";

interface ProductListProps {
    title?: string;
    viewAllLink?: string;
    showViewAll?: boolean;
    productType?: string;
    search?: string;
    sortBy?: string;
    initialProducts?: Product[];
    compactCart?: boolean; // true = button only (homepage), false = qty+button (listings)
    featuredModelSlugs?: string[]; // model listing cards to show at top of grid
}

const ProductList: React.FC<ProductListProps> = ({
    title = "JUST IN",
    viewAllLink = "/vapes",
    showViewAll = true,
    productType,
    search,
    sortBy,
    initialProducts,
    compactCart = false,
    featuredModelSlugs
}) => {
    // Homepage: no filters applied regardless of global filter state
    const brandId = undefined, flavorId = undefined, puffsId = undefined, nicotineId = undefined;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const limit = 30; // Items per page for infinite loading

    // Function to fetch products with pagination
    const fetchProducts = async ({ pageParam = 1 }) => {
        const url = "/api/products?";
        const params = new URLSearchParams();
        if (brandId) params.append("brandId", brandId);
        if (flavorId) params.append("flavorId", flavorId);
        if (puffsId) params.append("puffsId", puffsId);
        if (nicotineId) params.append("nicotineId", nicotineId);
        if (productType) params.append("productType", productType);
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        params.append("page", pageParam.toString());
        params.append("limit", limit.toString());

        const response = await fetch(url + params.toString());
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
    };

    // Infinite Query hook - updated queryKey to include productType
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["products", brandId, flavorId, puffsId, nicotineId, productType, search, sortBy],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasNextPage ? pages.length + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        initialData: initialProducts?.length
            ? {
                pages: [{ products: initialProducts, hasNextPage: true, page: 1, pageSize: initialProducts.length, totalCount: initialProducts.length, totalPages: 99 }],
                pageParams: [1],
              }
            : undefined,
        initialDataUpdatedAt: initialProducts?.length ? Date.now() : undefined,
    });

    // Flatten all pages into a single array of products
    const products = data?.pages.flatMap((page) => page.products) || [];

    // Handle scroll — kept for potential future use
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        if (scrollLeft >= scrollWidth - clientWidth - 100 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320,
                behavior: "smooth",
            });
        }
    };

    // Initial scroll check
    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            handleScroll(); // Initial check
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll, products.length]);

    if (isLoading) {
        return (
            <div className="w-11/12 mx-auto py-14 font-unbounded">
                <div className="flex gap-2 items-end mb-6">
                    <h2 className="font-bold text-2xl">{title}</h2>
                    {showViewAll && (
                        <p>
                            <Link href={viewAllLink} className="hover:underline font-light">
                                View all
                            </Link>
                        </p>
                    )}
                </div>
                <HorizontalProductShimmer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-red-500 bg-red-100 p-4 rounded-md">
                    <p className="font-semibold">Error loading products</p>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-white text-black font-unbounded w-full">
            {/* Header */}
            <div className="flex gap-2 items-end mb-6">
                <h2 className="font-bold text-2xl">{title}</h2>
                {showViewAll && (
                    <p>
                        <Link href={viewAllLink} className="hover:underline font-light">
                            View all
                        </Link>
                    </p>
                )}
            </div>

            {/* Products Container */}
            {products.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">
                        {brandId || flavorId || puffsId || nicotineId || productType
                            ? "No products match your filters"
                            : "No products available at the moment"}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Try adjusting your filters or check back later
                    </p>
                </div>
            ) : (
                <div className="relative">
                    {/* 2-column grid on mobile, 4-column on desktop — Figma layout */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                        {featuredModelSlugs && featuredModelSlugs.map(slug => {
                            const m = MODELS.find(x => x.slug === slug);
                            return m ? <GenericModelCard key={slug} model={m} /> : null;
                        })}
                        {!featuredModelSlugs && products.slice(0, 4).map((product: Product) => (
                            <div key={product.id} className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col h-full bg-white">
                                <Link href={`/product/${product.slug}`} className="block">
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
                                    <div className="p-2 md:p-3">
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
                                        <p className="text-center text-xs mt-1">Pack Of 10</p>
                                    </div>
                                </Link>
                                <div className="mt-auto px-2 md:px-3 pb-2 md:pb-3 flex flex-col gap-2">
                                    <Link href={`/product/${product.slug}`} className="text-center text-xs underline">View Product</Link>
                                    <AddToCartButton product={product as never} compact={compactCart} />
                                    <p className="text-center text-[9px] text-gray-400 mt-1 leading-tight">21+ only · Nicotine is addictive</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            )}


        </section>
    );
};

export default ProductList;