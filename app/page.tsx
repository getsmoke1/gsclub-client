export const dynamic = "force-dynamic";
import HomePage from "@/components/HomePage/HomePage";
import BrandCircles from "@/components/HomePage/BrandCircles";
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

  // Prefetch newest 4 products server-side — eliminates skeleton on NEWEST IN tab
  const rawNewest = await prisma.product.findMany({
    where: { isArchived: false },
    include: {
      images: { take: 1 },
      brand: true,
      flavor: true,
      Nicotine: true,
      productPuffs: { include: { puffs: true } },
      productFlavors: { include: { flavor: true } },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // Prefetch bundle deals (pack products)
  const rawBundles = await prisma.product.findMany({
    where: { productType: "VAPES", isArchived: false, name: { contains: "pack", mode: "insensitive" } },
    include: { images: { take: 1 }, brand: true },
    take: 20,
    orderBy: { name: "asc" },
  });

  const initialProducts = rawProducts.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  })) as unknown as Product[];

  const newestProducts = rawNewest.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  })) as unknown as Product[];

  const bundleProducts = rawBundles.map((p) => ({ ...p, puffs: [] }));

  return (
    <>
      <HomePage initialProducts={initialProducts} newestProducts={newestProducts} bundleProducts={bundleProducts} />
      <BrandCircles />
    </>
  );
}
