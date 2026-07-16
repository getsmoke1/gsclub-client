import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModelBySlug } from "@/lib/models-config";
import GenericModelPage from "@/components/ModelPage/GenericModelPage";
import { prisma } from "@/lib/prisma";
// Note: using plain <script> tags (not next/script) for JSON-LD so they render in initial HTML

const SITE_URL = "https://getsmoke.com";

// ISR: revalidate model pages every 6 hours (not full SSG - avoids 49 concurrent DB calls at build)
// ISR: cache for 6h, generate on first request (no build-time pre-render — avoids DATABASE_URL issue)
export const revalidate = 21600;
export const dynamicParams = true;

type Props = { params: Promise<{ modelSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) return {};
  const canonicalUrl = `${SITE_URL}/models/${modelSlug}`;
  return {
    title: `${model.name} Disposable Vape | Buy Online | GetSmoke`,
    description: `Buy ${model.name} disposable vape online. ${model.puffs} puffs. Multiple flavors available. Free shipping on orders over $89. Fast delivery 3-7 days across the USA. 21+ only.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${model.name} Disposable Vape | GetSmoke`,
      description: `Buy ${model.name} online. ${model.puffs} puffs, multiple flavors. Fast US shipping, 21+ only.`,
      url: canonicalUrl,
      siteName: "GetSmoke",
      images: [{ url: model.heroImage || "/og-default.jpg", width: 1200, height: 630, alt: model.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} Disposable Vape | GetSmoke`,
      description: `Buy ${model.name} online. ${model.puffs} puffs, multiple flavors. Fast US shipping, 21+ only.`,
      images: [model.heroImage || "/og-default.jpg"],
    },
  };
}

// Fetch products for this model to build rich Schema
async function getModelProducts(model: ReturnType<typeof getModelBySlug>) {
  if (!model) return [];
  try {
    const excludeFilter = model.excludeQueries?.map(q => ({ name: { contains: q, mode: "insensitive" as const } })) ?? [];
    return prisma.product.findMany({
      where: {
        name: { contains: model.dbSearchQuery, mode: "insensitive" },
        isArchived: false,
        stockStatus: { not: "OUTOFSTOCK" },
        NOT: [
          { name: { contains: "pack of", mode: "insensitive" } },
          ...excludeFilter,
        ],
      },
      include: {
        flavor: { select: { name: true } },
        images: { take: 1, orderBy: { position: "asc" } },
      },
      take: 60,
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function ModelPage({ params }: Props) {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) notFound();

  const canonicalUrl = `${SITE_URL}/models/${modelSlug}`;
  const products = await getModelProducts(model);

  // --- BreadcrumbList Schema ---
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Vapes", item: `${SITE_URL}/vapes` },
      { "@type": "ListItem", position: 3, name: model.brand, item: `${SITE_URL}/brands/${model.brandSlug}` },
      { "@type": "ListItem", position: 4, name: model.name, item: canonicalUrl },
    ],
  };

  // --- ProductGroup Schema with flavor variants ---
  const productGroupSchema = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: `${model.name} Disposable Vape`,
    description: `${model.name} disposable vape with ${model.puffs} puffs, ${model.nicotine} nicotine. Available in ${products.length > 0 ? products.length + " flavors" : "multiple flavors"} at GetSmoke.`,
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: model.brand,
    },
    productGroupID: modelSlug,
    variesBy: ["https://schema.org/flavor"],
    ...(products.length > 0 ? {
      hasVariant: products.slice(0, 20).map(p => ({
        "@type": "Product",
        name: p.name,
        url: `${SITE_URL}/product/${p.slug ?? ""}`,
        image: p.images?.[0]?.url || undefined,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: model.price.toFixed(2),
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/product/${p.slug ?? ""}`,
          seller: { "@type": "Organization", name: "GetSmoke" },
        },
      })),
    } : {}),
  };

  // --- FAQPage Schema ---
  const isRechargeable = parseInt(model.puffs.replace(/[^0-9]/g, "")) >= 5000;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many puffs does ${model.name} have?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${model.name} delivers approximately ${model.puffs} puffs per device. Actual puff count may vary based on puff duration and frequency of use.`,
        },
      },
      {
        "@type": "Question",
        name: `What nicotine strength is ${model.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${model.name} contains ${model.nicotine} nicotine salt. This is ${model.nicotine.includes("0%") ? "a nicotine-free formulation" : "a nicotine salt formulation that delivers smooth, fast-acting nicotine satisfaction"}.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does ${model.name} cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${model.name} starts at $${model.price.toFixed(2)} per device at GetSmoke. Free shipping on orders over $89. Bulk pack pricing is available for larger quantities.`,
        },
      },
      ...(isRechargeable ? [{
        "@type": "Question",
        name: `Is ${model.name} rechargeable?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${model.name} is rechargeable via USB-C. The battery must be recharged multiple times before the e-liquid runs out. This ensures you use every last drop of e-liquid.`,
        },
      }] : []),
      ...(products.length > 0 ? [{
        "@type": "Question",
        name: `How many flavors does ${model.name} come in?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${model.name} is available in ${products.length} flavors at GetSmoke, including ${products.slice(0, 5).map(p => p.flavor?.name || p.name).join(", ")}${products.length > 5 ? " and more" : ""}.`,
        },
      }] : []),
      {
        "@type": "Question",
        name: `Where can I buy ${model.name} online?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can buy ${model.name} at GetSmoke (getsmoke.com). We ship across the US with free shipping on orders over $89. Adults 21+ only.`,
        },
      },
    ],
  };

  return (
    <>
      {/* Plain <script> tags render in initial HTML — next/script goes to RSC payload */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productGroupSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* SSR H1 for crawlers */}
      <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        {model.name} Disposable Vape
      </h1>
      <GenericModelPage modelSlug={modelSlug} />
    </>
  );
}
