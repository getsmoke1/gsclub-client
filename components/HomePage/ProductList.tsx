"use client";
import React, { useRef, useState, useCallback } from "react";
import { ShoppingBag, } from "lucide-react";
import Link from "next/link";
import { useFilter } from "@/hooks/useFilter";
import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import HorizontalProductShimmer from "./HorizontalProductShimmer";

interface ProductListProps {
    title?: string;
    viewAllLink?: string;
    showViewAll?: boolean;
    productType?: string; // New prop for product type filtering
}

const ProductList: React.FC<ProductListProps> = ({
    title = "JUST IN",
    viewAllLink = "/vapes",
    showViewAll = true,
    productType // New prop
}) => {
    const { brandId, flavorId, puffsId, nicotineId } = useFilter();
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const limit = 30; // Items per page for infinite loading

    // Function to fetch products with pagination
    const fetchProducts = async ({ pageParam = 1 }) => {
        const url = "/api/products?";
        const params = new URLSearchParams();
        if (brandId) params.append("brandId", brandId);
        if (flavorId) params.append("flavorId", flavorId);
        if (puffsId) params.append("puffsId", puffsId);
        if (nicotineId) params.append("nicotineId", nicotineId);
        if (productType) params.append("productType", productType); // Add productType filter
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
        queryKey: ["products", brandId, flavorId, puffsId, nicotineId, productType],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasNextPage ? pages.length + 1 : undefined;
        },
        initialPageParam: 1,
    });

    // Flatten all pages into a single array of products
    const products = data?.pages.flatMap((page) => page.products) || [];

    // Handle scroll and check for arrows visibility
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;

        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

        // Check if user scrolled near the end and load more
        if (scrollLeft >= scrollWidth - clientWidth - 100 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Scroll functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320, // Scroll by approximately one product width
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320, // Scroll by approximately one product width
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
        <section className="bg-white text-black font-unbounded w-11/12 mx-auto py-14">
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
                    {/* Left Arrow */}
                    {showLeftArrow && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#F4F4F4] border shadow-lg rounded-full p-2 w-10 h-10 hover:shadow-xl transition-shadow"
                            aria-label="Scroll left"
                        >
                            <Image src={"/images/arrow.png"} width={20} height={20} alt="left arrow" className="rotate-180" />
                        </button>
                    )}

                    {/* Right Arrow */}
                    {showRightArrow && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#F4F4F4] border shadow-lg rounded-full p-2 w-10 h-10 hover:shadow-xl transition-shadow"
                            aria-label="Scroll right"
                        >
                            <Image src={"/images/arrow.png"} width={20} height={20} alt="right arrow" className="rotate-0" />
                        </button>
                    )}

                    {/* Horizontal Scrolling Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-2 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {products.map((product: Product) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 w-[160px] md:w-[280px] cursor-pointer"
                                onClick={() => router.push(`/product/${product.slug}`)}
                            >
                                <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-purple-600 transition-colors flex flex-col h-full">
                                    <div className="aspect-square relative bg-gray-100 h-[160px] md:h-[280px]">
                                        {product.images.length > 0 ? (
                                            <Image
                                                src={product.images[0].url}
                                                alt={product.name}
                                                width={280}
                                                height={280}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <ShoppingBag className="h-10 w-10 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-3 pb-4 px-3 flex flex-col gap-1">
                                        {/* Brand name — small, centered */}
                                        <p className="text-xs text-center text-gray-500 font-semibold uppercase tracking-wide">
                                            {product.brand.name}
                                        </p>
                                        {/* Product name — bold */}
                                        <h3 className="font-bold text-sm text-center line-clamp-2 leading-tight">
                                            {product.name}
                                        </h3>
                                        {/* Stars */}
                                        <div className="flex justify-center gap-0.5 my-0.5">
                                            {[1,2,3,4,5].map(i => (
                                                <span key={i} className="text-yellow-400 text-xs">★</span>
                                            ))}
                                        </div>
                                        {/* Price */}
                                        <p className="text-center font-bold text-sm">
                                            ${product.currentPrice.toFixed(2)}
                                        </p>
                                        {/* Single purple button */}
                                        <button
                                            className="w-full mt-1 py-2.5 rounded-full text-white text-xs font-bold cursor-pointer"
                                            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #9b59b6 100%)" }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            view product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator when fetching more */}
                        {isFetchingNextPage && (
                            <div className="flex-shrink-0 w-[160px] md:w-[280px] flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};

export default ProductList;