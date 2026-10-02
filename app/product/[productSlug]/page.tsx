/**
 * Product page - server-prefetches product directly from Prisma for:
 *  1. Real SEO metadata (title/desc from DB, not slug-derived)
 *  2. JSON-LD schema (Product + BreadcrumbList for Google rich snippets)
 *  3. SSR H1 in initial HTML (passed as initialProduct to client component)
 *
 * Uses direct Prisma (via getProductFromDB) - NOT fetch() to avoid CF SG block:
 * Vercel runs in Singapore (sin1); fetch() to https://getsmoke.com went through
 * Cloudflare which blocked Singapore IPs, causing all product pages to 404.
 */
import ProductPage from "@/components/ProductPage/ProductPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import { getProductFromDB } from "@/lib/getProductFromDB";
import { getFlavorProfile, generateFlavorFAQs } from "@/lib/flavorProfiles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ productSlug: string }>;
};

// Build Product JSON-LD schema
function buildProductSchema(product: Product, slug: string) {
  const reviews = (product.Review ?? []) as Array<{ rating: number }>;
  const ratingCount = reviews.length;
  const ratingValue =
    ratingCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount).toFixed(1)
      : null;

  // Build description from product attributes
  const puffCount = product.puffs?.[0]?.name ?? null;
  const nicotine = product.Nicotine?.name ?? null;
  const flavorName = product.flavor?.name ?? null;
  const descParts = [product.name];
  if (puffCount) descParts.push(`${puffCount} puffs`);
  if (nicotine) descParts.push(`${nicotine} nicotine`);
  if (flavorName) descParts.push(`${flavorName} flavor`);
  descParts.push("disposable vape by GetSmoke. Fast US shipping, 21+ only.");
  const productDescription = descParts.join(", ");

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.detailDescription || productDescription,
    url: `https://getsmoke.com/product/${slug}`,
    brand: {
      "@type": "Brand",
      name: product.brand?.name ?? "",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.currentPrice.toFixed(2),
      availability:
        product.stockStatus !== "OUTOFSTOCK"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://getsmoke.com/product/${slug}`,
      seller: { "@type": "Organization", name: "GetSmoke" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const img = product.images?.[0]?.url;
  if (img) schema.image = [img];

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

// Build BreadcrumbList JSON-LD schema
function buildBreadcrumbSchema(product: Product, slug: string) {
  const brandSlug = product.brand?.name
    ?.toLowerCase()
    .replace(/\s+/g, "-") ?? "";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getsmoke.com" },
      { "@type": "ListItem", position: 2, name: "Vapes", item: "https://getsmoke.com/vapes" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.brand?.name ?? "",
        item: `https://getsmoke.com/brands/${brandSlug}`,
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

// Build FAQPage JSON-LD schema from product attributes + flavor profile
function buildFAQSchema(product: Product) {
  const brandName = product.brand?.name ?? "this brand";
  const puffCount = product.puffs?.[0]?.name;
  const nicotine = product.Nicotine?.name ?? "5%";
  const price = `$${product.currentPrice.toFixed(2)}`;
  const inStock = product.stockStatus !== "OUTOFSTOCK";

  const baseQuestions = [
    {
      q: `How much does ${product.name} cost?`,
      a: `${product.name} costs ${price} at GetSmoke with free shipping on orders over $89.`,
    },
    {
      q: `Is ${product.name} in stock?`,
      a: inStock
        ? `Yes, ${product.name} is currently in stock and ready to ship.`
        : `${product.name} is currently out of stock. Check back soon or browse similar products.`,
    },
    {
      q: puffCount
        ? `How many puffs does ${product.name} have?`
        : `What is the puff count of ${product.name}?`,
      a: puffCount
        ? `${product.name} delivers approximately ${puffCount} puffs per device.`
        : `${product.name} is a disposable vape by ${brandName}. Check the product details for exact puff count.`,
    },
    {
      q: `What nicotine strength is ${product.name}?`,
      a: `${product.name} contains ${nicotine} nicotine. Adults 21+ only.`,
    },
    {
      q: `Who makes ${product.name}?`,
      a: `${product.name} is made by ${brandName}, available at GetSmoke with fast US shipping.`,
    },
  ];

  // Add flavor-specific FAQs when profile exists
  const flavorProfile = getFlavorProfile(product.name);
  const flavorFAQs = flavorProfile
    ? generateFlavorFAQs(product.name, brandName, flavorProfile)
    : [];

  const allQuestions = [...flavorFAQs, ...baseQuestions];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const canonicalUrl = `https://getsmoke.com/product/${productSlug}`;
  const product = await getProductFromDB(productSlug);

  if (!product) {
    // Product not found - noindex so Google doesn't crawl soft-404 pages
    return {
      title: "Product Not Found | GetSmoke",
      description: "This product is no longer available.",
      robots: { index: false, follow: false },
    };
  }

  const price = product.currentPrice.toFixed(2);
  const image = product.images?.[0]?.url;
  const inStock = product.stockStatus !== "OUTOFSTOCK";
  const title = `${product.name} | GetSmoke`;
  const puffCount = product.puffs?.[0]?.name ?? null;
  const brandName = product.brand?.name ?? null;
  const nicotine = product.Nicotine?.name ?? "5%";
  // Build a rich 150-160 char meta description
  let description = `Buy ${product.name} for $${price} at GetSmoke.`;
  if (puffCount) description += ` ${puffCount} puffs,`;
  description += ` ${nicotine} nicotine salt.`;
  if (brandName) description += ` Authentic ${brandName} disposable vape.`;
  description += ` ${inStock ? "In stock" : "Pre-order"} — fast US shipping. Ages 21+.`;
  // Trim to 160 chars max
  if (description.length > 160) description = description.slice(0, 157) + "...";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} | GetSmoke`,
      description,
      url: canonicalUrl,
      images: image ? [{ url: image, width: 800, height: 800, alt: product.name }] : [],
      type: "website",
    },
  };
}

const page = async ({ params }: Props) => {
  const { productSlug } = await params;
  const product = await getProductFromDB(productSlug);

  if (!product) {
    notFound();
  }

  const flavorProfile = getFlavorProfile(product.name);
  const brandName = product.brand?.name ?? "";

  return (
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQSchema(product)),
        }}
      />
      <ProductPage productSlug={productSlug} initialProduct={product} flavorProfile={flavorProfile} />

      {/* SSR Flavor Profile - visible to AI crawlers and search engines */}
      {flavorProfile && (
        <section
          aria-label="Flavor profile"
          style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 16px" }}
        >
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" }}>
            {product.name} - Flavor Profile
          </h2>
          <p style={{ lineHeight: 1.7, color: "#333", marginBottom: "20px" }}>
            {flavorProfile.taste}
          </p>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {flavorProfile.notes.map((note) => (
              <span
                key={note}
                style={{
                  background: "#f3f4f6",
                  borderRadius: "99px",
                  padding: "4px 14px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {note}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>
            Who Is This For?
          </h3>
          <p style={{ lineHeight: 1.7, color: "#444", marginBottom: "16px" }}>
            {flavorProfile.bestFor}
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>
            Best Enjoyed When
          </h3>
          <p style={{ lineHeight: 1.7, color: "#444", marginBottom: "16px" }}>
            {flavorProfile.mood}
          </p>

          {flavorProfile.similar.length > 0 && (
            <>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>
                Similar Flavors at GetSmoke
              </h3>
              <p style={{ lineHeight: 1.7, color: "#444" }}>
                If you enjoy {product.name}, explore other flavors at{" "}
                <a href="/vapes" style={{ color: "#1d4ed8" }}>GetSmoke.com</a>:{" "}
                {flavorProfile.similar.join(", ")}.{" "}
                Free shipping on orders over $89. Adults 21+ only.
              </p>
            </>
          )}

          {/* FAQ section for AI citations */}
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginTop: "32px", marginBottom: "16px" }}>
            Frequently Asked Questions - {product.name}
          </h2>
          {generateFlavorFAQs(product.name, brandName, flavorProfile).map(({ q, a }) => (
            <div key={q} style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "6px" }}>{q}</h3>
              <p style={{ lineHeight: 1.7, color: "#444" }}>{a}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default page;
