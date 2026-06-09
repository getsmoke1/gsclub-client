"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import ProductShimmer from "./ProductShimmer";
import { useFilter } from "@/hooks/useFilter";
import { Product } from "@/types/product";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";

type ProductsProps = {
  productType?: string;
};

const Products = ({ productType }: ProductsProps) => {
  const { brandId, flavorId, puffsId, nicotineId } = useFilter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams?.get("page") ?? 1);
  const limit = 24; // Items per page

  // Track previous filter values to detect when filters actually change
  const prevFiltersRef = React.useRef({
    brandId,
    flavorId,
    puffsId,
    nicotineId,
  });

  // Ref for scrolling to top of component
  const componentRef = React.useRef<HTMLElement>(null);

  // Function to fetch products
  const fetchProducts = async () => {
    const url = "/api/products?";
    const params = new URLSearchParams();
    if (brandId) params.append("brandId", brandId);
    if (flavorId) params.append("flavorId", flavorId);
    if (puffsId) params.append("puffsId", puffsId);
    if (nicotineId) params.append("nicotineId", nicotineId);
    if (productType) params.append("productType", productType);
    params.append("page", currentPage.toString());
    params.append("limit", limit.toString());

    const response = await fetch(url + params.toString());
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  };

  // TanStack Query hook
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", brandId, flavorId, puffsId, nicotineId, currentPage],
    queryFn: fetchProducts,
  });

  // Reset to page 1 only when filters actually change (not when page changes)
  React.useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const currentFilters = { brandId, flavorId, puffsId, nicotineId };

    // Check if any filter has actually changed
    const filtersChanged =
      prevFilters.brandId !== currentFilters.brandId ||
      prevFilters.flavorId !== currentFilters.flavorId ||
      prevFilters.puffsId !== currentFilters.puffsId ||
      prevFilters.nicotineId !== currentFilters.nicotineId;

    if (filtersChanged && currentPage !== 1) {
      // Fix: Handle null searchParams
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    }

    // Update the ref with current filter values
    prevFiltersRef.current = currentFilters;
  }, [
    brandId,
    flavorId,
    puffsId,
    nicotineId,
    currentPage,
    pathname,
    router,
    searchParams,
  ]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    // Fix: Handle null searchParams
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Scroll to top when page changes
  React.useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && !componentRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  if (isLoading && currentPage === 1) {
    return (
      <div className="w-11/12 mx-auto">
        <ProductShimmer />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 bg-red-100 p-4 rounded-md">
          <p className="font-semibold">Error loading products</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

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
          {isLoading ? (
            <ProductShimmer />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 xl:gap-10">
              {products.map((product: Product) => (
                <div
                  onClick={() => {
                    router.push(`/product/${product.slug}`);
                  }}
                  key={product.id}
                  className="cursor-pointer"
                >
                  <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full bg-white">
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
                    <div className="p-2 md:p-3 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-center text-sm font-bold" style={{ color: "#fe3500" }}>
                          <span>${product.currentPrice.toFixed(2)}</span>
                          {product.originalPrice && product.originalPrice > product.currentPrice && (
                            <span className="ml-2 text-xs text-gray-400 line-through font-normal">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                          {product.brand.name}
                        </p>
                        <h3 className="font-semibold text-xs md:text-sm text-center line-clamp-2 mt-0.5 leading-4">
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                          <button
                            className="w-full py-2 rounded-full text-white text-xs font-bold uppercase cursor-pointer"
                            style={{ background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)" }}
                          >
                            Add to Cart
                          </button>
                          <p className="text-center text-xs text-gray-500">subscribe to save up to 10%</p>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      size={"sm"}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {/* Always show first page */}
                  <PaginationItem>
                    <PaginationLink
                      size={"sm"}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(1);
                      }}
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {/* Show ellipsis if current page is far from start */}
                  {currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Show pages around current page */}
                  {Array.from(
                    { length: Math.min(3, totalPages - 2) },
                    (_, i) => {
                      let pageNum;
                      if (currentPage <= 3) {
                        pageNum = i + 2;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 3 + i;
                      } else {
                        pageNum = currentPage - 1 + i;
                      }

                      if (pageNum > 1 && pageNum < totalPages) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              size={"sm"}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(pageNum);
                              }}
                              isActive={pageNum === currentPage}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}

                  {/* Show ellipsis if current page is far from end */}
                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {/* Always show last page if there's more than one page */}
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        size={"sm"}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(totalPages);
                        }}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      size={"sm"}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Products;