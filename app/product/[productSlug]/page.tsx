/**
 * Product page — static shell, data fetched client-side by React Query.
 * No Prisma on render path → page shell arrives instantly from CDN/edge.
 * React Query caches data between navigations → back/forward is instant.
 */
import ProductPage from "@/components/ProductPage/ProductPage";
import React from "react";
import type { Metadata } from "next";
import { noIndex } from "@/lib/noindex";

// Dynamic params allowed, but page renders instantly as shell (no DB call)
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ productSlug: string }>;
};

// Minimal metadata — no Prisma call, no delay
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const name = productSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    ...noIndex,
    title: `${name} | GetSmoke`,
    description: `Buy ${name} at GetSmoke. Fast US shipping.`,
  };
}

// Static shell — ProductPage client component handles all data fetching
const page = async ({ params }: Props) => {
  const { productSlug } = await params;
  return <ProductPage productSlug={productSlug} />;
};

export default page;
