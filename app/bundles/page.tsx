import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export const revalidate = 300;

export const metadata: Metadata = {
  ...noIndex,
  title: "Bundle Deals | GetSmoke",
  description: "Shop all vape bundle deals at GetSmoke. Pack of 3, 5, and 10 at unbeatable prices.",
};

export default async function BundlesPage() {
  const rawProducts = await prisma.product.findMany({
    where: {
      isArchived: false,
      name: { contains: "pack", mode: "insensitive" },
    },
    include: {
      images: { take: 1 },
      brand: true,
      flavor: true,
      Nicotine: true,
      productPuffs: { include: { puffs: true } },
      productFlavors: { include: { flavor: true } },
    },
    take: 48,
    orderBy: { name: "asc" },
  });

  const initialProducts = rawProducts.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  })) as unknown as Product[];

  return <VapePage productType="VAPES" search="pack" initialProducts={initialProducts} />;
}
