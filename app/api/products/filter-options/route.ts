import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

export interface FilterOptions {
  brands: { id: string; name: string }[];
  flavors: { id: string; name: string }[];
  puffs: { id: string; name: string }[];
  nicotineLevels: { id: string; name: string }[];
}

async function fetchFilterOptions(
  productType: string | null,
  brandId: string | null,
  flavorId: string | null,
  puffsId: string | null,
  nicotineId: string | null
): Promise<FilterOptions> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productFilter: any = { isArchived: false };
  if (productType) productFilter.productType = productType;
  if (brandId) productFilter.brandId = brandId;
  if (flavorId) {
    productFilter.OR = [
      { flavorId: flavorId },
      { productFlavors: { some: { flavorId: flavorId } } },
    ];
  }
  if (puffsId) productFilter.productPuffs = { some: { puffsId: puffsId } };
  if (nicotineId) productFilter.nicotineId = nicotineId;

  const matchingProducts = await prisma.product.findMany({
    where: productFilter,
    select: { id: true },
  });
  const productIds = matchingProducts.map((p) => p.id);

  const [brands, flavors, puffs, nicotineLevels] = await Promise.all([
    prisma.brand.findMany({
      where: { products: { some: { id: { in: productIds } } } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.flavor.findMany({
      where: {
        OR: [
          { products: { some: { id: { in: productIds } } } },
          { ProductFlavors: { some: { productId: { in: productIds } } } },
        ],
      },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.puffs.findMany({
      where: { productPuffs: { some: { productId: { in: productIds } } } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.nicotine.findMany({
      where: { products: { some: { id: { in: productIds } } } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return { brands, flavors, puffs, nicotineLevels };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get("brandId");
    const flavorId = searchParams.get("flavorId");
    const puffsId = searchParams.get("puffsId");
    const nicotineId = searchParams.get("nicotineId");
    const productType = searchParams.get("productType");

    // Cache key based on filters - cache for 5 min, stale for 10 min
    const cacheKey = `filter-opts-${productType}-${brandId}-${flavorId}-${puffsId}-${nicotineId}`;
    const cachedFetch = unstable_cache(
      () => fetchFilterOptions(productType, brandId, flavorId, puffsId, nicotineId),
      [cacheKey],
      { revalidate: 300, tags: ["filter-options"] }
    );

    const response = await cachedFetch();

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("[FILTER_OPTIONS_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch filter options" },
      { status: 500 }
    );
  }
}
