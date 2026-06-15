import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";

export async function prefetchProducts(productType: string, limit = 24) {
  const type = productType as ProductType;

  // Fetch ALL products for this type so interleaving works across all brands
  const rawProducts = await prisma.product.findMany({
    where: { productType: type, isArchived: false },
    include: {
      images: { take: 1 },
      brand: true,
      flavor: true,
      Nicotine: true,
      productPuffs: { include: { puffs: true } },
      productFlavors: { include: { flavor: true } },
    },
    orderBy: { name: "asc" },
  });

  // Round-robin by brand (same logic as API)
  const byBrand: Record<string, typeof rawProducts> = {};
  for (const p of rawProducts) {
    const key = p.brandId || "unknown";
    if (!byBrand[key]) byBrand[key] = [];
    byBrand[key].push(p);
  }
  const groups = Object.values(byBrand);
  const interleaved: typeof rawProducts = [];
  const maxLen = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < maxLen; i++) {
    for (const g of groups) {
      if (g[i]) interleaved.push(g[i]);
    }
  }

  const sliced = interleaved.slice(0, limit);

  return sliced.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  }));
}
