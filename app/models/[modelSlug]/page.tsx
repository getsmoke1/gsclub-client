import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModelBySlug } from "@/lib/models-config";
import GenericModelPage from "@/components/ModelPage/GenericModelPage";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
// Note: using plain <script> tags (not next/script) for JSON-LD so they render in initial HTML

const SITE_URL = "https://getsmoke.com";

// ISR: revalidate model pages every 6 hours (not full SSG - avoids 49 concurrent DB calls at build)
// ISR: cache for 6h, generate on first request (no build-time pre-render - avoids DATABASE_URL issue)
export const revalidate = 21600;
export const dynamicParams = true;

type Props = { params: Promise<{ modelSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) return {};
  const canonicalUrl = `${SITE_URL}/models/${modelSlug}`;
  // Build keyword-rich title and description using model-specific data
  const priceStr = model.price ? `$${model.price}` : "";
  const topFlavorStr = model.topFlavors && model.topFlavors.length > 0
    ? ` Shop top flavors: ${model.topFlavors.slice(0, 4).join(", ")}.`
    : "";
  const metaTitle = priceStr
    ? `${model.name} ${priceStr} | Buy Online | GetSmoke`
    : `${model.name} Disposable Vape | Buy Online | GetSmoke`;
  const metaDesc = model.seoDescription
    ? model.seoDescription
    : `Buy ${model.name} disposable vape online. ${model.puffs} puffs.${topFlavorStr} Free shipping over $89. Fast US delivery 3-7 days. 21+ only.`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: "GetSmoke",
      images: [{ url: model.heroImage || "/og-default.jpg", width: 1200, height: 630, alt: model.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [model.heroImage || "/og-default.jpg"],
    },
  };
}

// Fetch products for this model to build rich Schema
// Uses same query logic as /api/models/[modelSlug] route for consistency
async function getModelProducts(model: ReturnType<typeof getModelBySlug>) {
  if (!model) return [];
  try {
    const excludeFilters: Prisma.ProductWhereInput[] =
      (model.excludeQueries ?? []).map((q) => ({
        name: { contains: q, mode: "insensitive" as const },
      }));

    const products = await prisma.product.findMany({
      where: {
        name: { contains: model.dbSearchQuery, mode: "insensitive" },
        isArchived: false,
        ...(excludeFilters.length > 0 ? { NOT: excludeFilters } : {}),
      },
      select: {
        name: true,
        slug: true,
        stockStatus: true,
        flavor: { select: { name: true } },
        images: { take: 1, orderBy: { position: "asc" }, select: { url: true } },
      },
      take: 60,
      orderBy: { name: "asc" },
    });

    // Deduplicate by name and filter out packs (same as client-side logic)
    const seen = new Set<string>();
    return products.filter((p) => {
      if (seen.has(p.name)) return false;
      if (/pack\s*of/i.test(p.name)) return false;
      seen.add(p.name);
      return true;
    });
  } catch (err) {
    console.error("[getModelProducts] error:", err);
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
        sku: p.slug ?? undefined,
        description: `${p.flavor?.name ?? p.name} flavor ${model.name} disposable vape. ${model.puffs} puffs, ${model.nicotine} nicotine. Buy online at GetSmoke.`,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: model.price.toFixed(2),
          availability: p.stockStatus === "OUTOFSTOCK"
            ? "https://schema.org/OutOfStock"
            : p.stockStatus === "PREORDER"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
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

  // Build SSR text content for Googlebot (GenericModelPage is a client component and starts with loading state)
  const nicotineNote = model.nicotine === "0% Nicotine Free" ? "nicotine-free formula" : `${model.nicotine} nicotine salt`;
  const topFlavorStr = model.topFlavors && model.topFlavors.length > 0
    ? model.topFlavors.slice(0, 6).join(", ")
    : "Watermelon Ice, Blue Razz Ice, Strawberry Banana";
  const specParts = [
    model.battery ? `${model.battery} rechargeable battery` : null,
    model.eliquid ? `${model.eliquid} e-liquid capacity` : null,
    model.coil ? `${model.coil} coil` : null,
    model.display ? `${model.display} display` : null,
  ].filter(Boolean).join(", ");
  const flavorCount = products.length > 0 ? products.length : "multiple";
  const ssrDescription = [
    `The ${model.name} disposable vape is designed for vapers who demand long-lasting performance and rich flavor. With up to ${model.puffs} puffs per device, it delivers consistent vapor quality from the very first draw to the last, making it one of the most reliable choices in its class.`,
    `Each ${model.shortName} device is pre-filled with ${nicotineNote} e-liquid${specParts ? ` and features ${specParts}` : ""}. The rechargeable USB-C design ensures you never waste e-liquid. Draw-activated, no buttons needed.`,
    `Available in ${flavorCount} carefully crafted flavors, the ${model.shortName} covers every palate. Top-rated flavors include ${topFlavorStr} - each delivering a bold, true-to-name taste throughout the life of the device.`,
    `GetSmoke ships the ${model.name} across the entire United States with adult signature required delivery. Orders over $89 qualify for free shipping. All products are sourced from authorized US distributors. Adults 21 and older only.`,
  ];
  const faqItems = faqSchema.mainEntity as Array<{ "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }>;

  return (
    <>
      {/* Plain <script> tags render in initial HTML - next/script goes to RSC payload */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productGroupSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* SSR content section for Googlebot — GenericModelPage loads via useEffect/client fetch */}
      <section aria-label="About this product" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        <h1>{model.name} Disposable Vape</h1>
        {ssrDescription.map((p, i) => <p key={i}>{p}</p>)}
        <h2>{model.shortName} Specifications</h2>
        <ul>
          <li>Puff Count: Up to {model.puffs} puffs</li>
          <li>Nicotine Strength: {model.nicotine}</li>
          {model.battery && <li>Battery: {model.battery} rechargeable (USB-C)</li>}
          {model.eliquid && <li>E-Liquid Capacity: {model.eliquid}</li>}
          {model.coil && <li>Coil Type: {model.coil}</li>}
          <li>Available Flavors: {flavorCount} flavors</li>
          <li>Brand: {model.brand}</li>
          <li>Price: ${model.price.toFixed(2)}</li>
        </ul>
        {products.length > 0 && (
          <>
            <h2>Available Flavors</h2>
            <ul>
              {products.slice(0, 20).map(p => (
                <li key={p.slug}><a href={`/product/${p.slug}`}>{p.flavor?.name || p.name}</a></li>
              ))}
            </ul>
          </>
        )}
        <h2>Frequently Asked Questions</h2>
        {faqItems.map((item) => (
          <div key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.acceptedAnswer.text}</p>
          </div>
        ))}
      </section>
      <GenericModelPage modelSlug={modelSlug} />
    </>
  );
}
