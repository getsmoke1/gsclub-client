import ProductPage from "@/components/ProductPage/ProductPage";
import { prisma } from "@/lib/prisma";
import React from "react";
import type { Metadata } from "next";
import { getSEOData } from "@/lib/seo";
import { noIndex } from "@/lib/noindex";
import { buildSeoMetadata, getCanonicalUrl } from "@/lib/canonical";

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const seoData = await getSEOData(`/product/${productSlug}`);
  const canonicalPath = `/product/${productSlug}`;

  // Get product data for fallback meta
  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    select: { name: true, detailDescription: true, images: true },
  }).catch(() => null);

  const meta = buildSeoMetadata(seoData, canonicalPath);

  // Fallback to product data if no SEO entry
  if (!seoData && product) {
    meta.title = `${product.name} | GetSmoke`;
    meta.description = product.detailDescription?.substring(0, 160) || `Buy ${product.name} at GetSmoke. Fast US shipping.`;
    if (product.images?.[0]) {
      meta.openGraph = {
        title: `${product.name} | GetSmoke`,
        description: meta.description,
        images: [product.images[0]],
        siteName: "GetSmoke",
        type: "website",
        url: getCanonicalUrl(canonicalPath),
      };
    }
  }

  return { ...noIndex, ...meta };
}

const page = async ({ params }: Props) => {
  const { productSlug } = await params;
  return <ProductPage productSlug={productSlug} />;
};

export default page;
