"use client";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

const fetchProduct = async (productSlug: string): Promise<Product> => {
  const response = await fetch(`/api/products/${productSlug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

export const useProduct = (productSlug: string, initialData?: Product) => {
  return useQuery<Product>({
    queryKey: ["product", productSlug],
    queryFn: () => fetchProduct(productSlug),
    enabled: !!productSlug,
    initialData,
    staleTime: 10 * 60 * 1000, // 10 min — product data is stable, cache across navigations
    gcTime: 30 * 60 * 1000,   // 30 min — keep in memory even when navigating away
  });
};
