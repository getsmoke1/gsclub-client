/**
 * Cached Prisma queries using Next.js unstable_cache.
 * After the first request, data is served from in-memory cache.
 * Eliminates the 1-2s Prisma/MongoDB latency on repeated requests.
 */
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// ─── Product page ────────────────────────────────────────────────────────────

export const getCachedProduct = unstable_cache(
  async (slug: string) => {
    return prisma.product.findFirst({
      where: { slug },
      include: {
        images: true,
        brand: true,
        flavor: true,
        Nicotine: true,
        Review: { orderBy: { createdAt: "desc" } },
        productPuffs: { include: { puffs: true } },
        productFlavors: { include: { flavor: true, product: { include: { images: { take: 1 } } } } },
      },
    });
  },
  ["product-by-slug"],
  { revalidate: 3600, tags: ["products"] }
);

// ─── Products listing ─────────────────────────────────────────────────────────

export const getCachedProducts = unstable_cache(
  async (productType: string, limit = 24) => {
    const { prefetchProducts } = await import("@/lib/prefetch-products");
    return prefetchProducts(productType, limit);
  },
  ["products-by-type"],
  { revalidate: 300, tags: ["products"] }
);

// ─── Brand page ───────────────────────────────────────────────────────────────

export const getCachedBrand = unstable_cache(
  async (slug: string) => {
    return prisma.brand.findFirst({
      where: { slug },
      include: {
        products: {
          where: { isArchived: false },
          include: { images: { take: 1 } },
          orderBy: { name: "asc" },
        },
      },
    });
  },
  ["brand-by-slug"],
  { revalidate: 3600, tags: ["brands"] }
);

// ─── Homepage ─────────────────────────────────────────────────────────────────

export const getCachedNewestProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: { isArchived: false },
      include: {
        images: { take: 1 },
        brand: true,
        flavor: true,
        Nicotine: true,
        productPuffs: { include: { puffs: true } },
        productFlavors: { include: { flavor: true, product: { include: { images: { take: 1 } } } } },
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  },
  ["newest-products"],
  { revalidate: 300, tags: ["products"] }
);
