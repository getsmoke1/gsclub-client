import HomePage from "@/components/HomePage/HomePage";
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/");
  return { ...noIndex, ...buildSeoMetadata(seoData, "/") };
}

export default async function Home() {
  // Prefetch first 30 products server-side — eliminates loading skeleton on homepage
  const rawProducts = await prisma.product.findMany({
    where: {
      productType: "VAPES",
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
    take: 30,
    orderBy: { name: "asc" },
  });

  // Transform to match API shape (productPuffs → puffs)
  const initialProducts = rawProducts.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  })) as unknown as Product[];

  return <HomePage initialProducts={initialProducts} />;
}
