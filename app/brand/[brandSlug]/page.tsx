import BrandPage from "@/components/Brand/BrandPage";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { noIndex } from "@/lib/noindex";

type Props = {
  params: Promise<{ brandSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = await prisma.brand.findFirst({ where: { slug: brandSlug } });
  if (!brand) return { title: "Brand Not Found" };
  return {
    ...noIndex,
    title: `${brand.name} Disposable Vapes | GetSmoke`,
    description: `Shop all ${brand.name} disposable vapes at GetSmoke. Best prices, fast shipping.`,
  };
}

const page = async ({ params }: Props) => {
  const { brandSlug } = await params;
  const brand = await prisma.brand.findFirst({ where: { slug: brandSlug } });
  if (!brand) notFound();
  return (
    <BrandPage
      brandId={brand.id}
      brandName={brand.name}
      brandSlug={brandSlug}
    />
  );
};

export default page;
