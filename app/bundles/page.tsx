import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Bundle Deals | GetSmoke",
  description: "Shop all vape bundle deals at GetSmoke. Pack of 3, 5, and 10 at unbeatable prices.",
  alternates: { canonical: "https://getsmoke.com/bundles" },
  openGraph: { title: "Bundle Deals | GetSmoke", url: "https://getsmoke.com/bundles", siteName: "GetSmoke", images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Bundle Deals | GetSmoke" }] },
};

const getCachedBundles = unstable_cache(
  async () => {
    const rawProducts = await prisma.product.findMany({
      where: { isArchived: false, name: { contains: "pack", mode: "insensitive" } },
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
    return rawProducts.map((p) => ({
      ...p,
      puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
    })) as unknown as Product[];
  },
  ["bundles"],
  { revalidate: 300, tags: ["products"] }
);

export default async function BundlesPage() {
  const initialProducts = await getCachedBundles();
  return <VapePage productType="VAPES" search="pack" nameOnly={true} initialProducts={initialProducts} faqSlug="/bundles" heading="Bundle Deals - Buy Vapes in Bulk" />;
}
