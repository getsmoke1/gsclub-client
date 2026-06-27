import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pod Systems & Pod Kits | GetSmoke",
  description: "Shop pod systems, pod kits, and replacement pods at GetSmoke. Lost Mary, Foger, X-Posed, VIHO and more. Fast US shipping, 21+ only.",
  alternates: { canonical: "https://getsmoke.com/pods" },
  openGraph: {
    title: "Pod Systems & Pod Kits | GetSmoke",
    url: "https://getsmoke.com/pods",
    siteName: "GetSmoke",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Pod Systems & Pod Kits | GetSmoke" }],
  },
};

const getCachedPods = unstable_cache(
  async () => {
    const rawProducts = await prisma.product.findMany({
      where: { productType: "PODS", isArchived: false },
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
  ["pods-products"],
  { revalidate: 300 }
);

export default async function PodsPage() {
  const initialProducts = await getCachedPods();
  return (
    <VapePage
      productType="PODS"
      initialProducts={initialProducts}
      faqSlug="/pods"
      heading="Pod Systems & Pod Kits"
    />
  );
}
