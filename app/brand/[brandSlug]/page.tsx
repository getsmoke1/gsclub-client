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
  if (!brand) return { ...noIndex, title: "Brand Not Found" };
  return {
    ...noIndex,
    title: `${brand.name} Vapes | GetSmoke`,
    description: `Shop all ${brand.name} disposable vapes at GetSmoke. Best prices and fast US shipping.`,
  };
}

export default async function BrandSlugPage({ params }: Props) {
  const { brandSlug } = await params;
  const brand = await prisma.brand.findFirst({ where: { slug: brandSlug } });
  if (!brand) return notFound();
  return <BrandPage brandId={brand.id} brandName={brand.name} />;
}
