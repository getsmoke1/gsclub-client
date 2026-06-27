/**
 * Product page — server-prefetches product for:
 *  1. Real SEO metadata (title/desc from DB, not slug-derived)
 *  2. JSON-LD schema (Product + AggregateRating for Google rich snippets)
 *  3. SSR H1 in initial HTML (passed as initialProduct to client component)
 *
 * React.cache() deduplicates the DB call — one query serves all three needs.
 */
import ProductPage from "@/components/ProductPage/ProductPage";
import React, { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ productSlug: string }>;
};

// React.cache() — deduplicated per request: generateMetadata + Page share one DB call
const getProductForPage = cache(async (slug: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        Review: true,
        images: { orderBy: { position: "asc" } },
        brand: true,
        flavor: true,
        Nicotine: true,
        productPuffs: { include: { puffs: true }, orderBy: { createdAt: "asc" } },
        productFlavors: { include: { flavor: true } },
        ProductContentSection: true,
      },
    });
    return product as Product | null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductForPage(productSlug);
  const canonicalUrl = `https://getsmoke.com/product/${productSlug}`;

  if (!product) {
    // Fallback: derive name from slug
    const name = productSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `${name} | GetSmoke`,
      description: `Buy ${name} at GetSmoke. Fast US shipping, 21+ only.`,
      alternates: { canonical: canonicalUrl },
    };
  }

  // product.name already contains brand + flavor (e.g. "Colombian Coffee Ice Juicy Bar JB5000")
  // Don't prepend brand or append flavor - avoids duplicate like "Juicy Bar Colombian Coffee Ice Juicy Bar JB5000 - Colombian Coffee Ice"
  const displayName = product.name;
  const price = product.currentPrice.toFixed(2);
  const image = product.images?.[0]?.url;
  const inStock = product.stockStatus !== "OUTOFSTOCK";

  const title = `${displayName} | GetSmoke`;
  const description = `Buy ${displayName} for $${price} at GetSmoke. ${inStock ? "In stock" : "Pre-order"}, fast US shipping. 21+ only.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${displayName} | GetSmoke`,
      description,
      url: canonicalUrl,
      siteName: "GetSmoke",
      type: "website",
      ...(image ? { images: [{ url: image, width: 800, height: 800, alt: displayName }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} | GetSmoke`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

// Build Product JSON-LD schema for Google rich snippets
function buildProductSchema(product: Product, slug: string) {
  // product.name already has brand + flavor baked in - use directly
  const fullName = product.name;
  const image = product.images?.[0]?.url;
  const inStock = product.stockStatus !== "OUTOFSTOCK";

  const reviews = product.Review ?? [];
  const ratingCount = reviews.length;
  const ratingValue =
    ratingCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount).toFixed(1)
      : null;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: fullName,
    url: `https://getsmoke.com/product/${slug}`,
    brand: {
      "@type": "Brand",
      name: product.brand.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.currentPrice.toFixed(2),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://getsmoke.com/product/${slug}`,
      seller: {
        "@type": "Organization",
        name: "GetSmoke",
      },
    },
  };

  if (image) schema.image = [image];

  if (ratingCount > 0 && ratingValue) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: ratingCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

// Build BreadcrumbList JSON-LD
function buildBreadcrumbSchema(product: Product, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getsmoke.com" },
      { "@type": "ListItem", position: 2, name: "Vapes", item: "https://getsmoke.com/vapes" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.brand.name,
        item: `https://getsmoke.com/brands/${product.brand.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://getsmoke.com/product/${slug}`,
      },
    ],
  };
}

const page = async ({ params }: Props) => {
  const { productSlug } = await params;
  const product = await getProductForPage(productSlug);

  // Product not found → proper 404 (HTTP 404 status, no indexing)
  if (!product) {
    notFound();
  }

  return (
    <>
      {product && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildProductSchema(product, productSlug)),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildBreadcrumbSchema(product, productSlug)),
            }}
          />
        </>
      )}
      <ProductPage productSlug={productSlug} initialProduct={product ?? undefined} />
    </>
  );
};

export default page;
