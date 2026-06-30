export const revalidate = 3600;
export const dynamicParams = true;

import { prisma } from "@/lib/prisma";
import { getCachedBrand } from "@/lib/cached-queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BRAND_SEO } from "@/lib/brand-seo-content";
import { BrandFaq } from "@/components/BrandPage/BrandFaq";
import BrandProductCard from "@/components/BrandPage/BrandProductCard";
import HqdGoModelCard from "@/components/ModelPage/HqdGoModelCard";
import GenericModelCard from "@/components/ModelPage/GenericModelCard";
import { getModelsByBrand } from "@/lib/models-config";

type Props = { params: Promise<{ brandSlug: string }> };

// Pre-render all brand pages as static HTML at build time
export async function generateStaticParams() {
  // Graceful fallback: if DB unavailable at build time, pages generate on first request via ISR
  try {
    const brands = await prisma.brand.findMany({ select: { slug: true } });
    return brands
      .filter((b) => !!b.slug)
      .map((b) => ({ brandSlug: b.slug as string }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  const seo = BRAND_SEO[brandSlug];
  const brand = await prisma.brand.findFirst({ where: { slug: brandSlug } });
  if (!brand) return { title: "Brand Not Found" };

  const title = seo?.metaTitle ?? `${brand.name} Vapes | GetSmoke`;
  const description =
    seo?.metaDescription ??
    `Shop all ${brand.name} disposable vapes at GetSmoke. Best prices, fast shipping.`;

  return {
    title,
    description,
    alternates: { canonical: `https://getsmoke.com/brands/${brandSlug}` },
    openGraph: {
      title,
      description,
      url: `https://getsmoke.com/brands/${brandSlug}`,
      siteName: "GetSmoke",
      type: "website",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params;

  const brand = await getCachedBrand(brandSlug);

  if (!brand) return notFound();

  const seo = brand.slug ? BRAND_SEO[brand.slug] : undefined;
  const brandModels = brand.slug ? getModelsByBrand(brand.slug) : [];

  // First product image for hero
  const heroImageUrl =
    brand.products[0]?.images[0]?.url ?? null;

  // JSON-LD FAQPage schema
  const faqSchema = seo?.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const h1 = seo?.h1 ?? `${brand.name} Vapes`;
  const advantageTitle =
    seo?.advantageTitle ?? `Understanding the ${brand.name} Advantage`;
  const features = seo?.features ?? [
    {
      title: "Design & Portability",
      description: `${brand.name} devices are built for everyday carry with a compact, ergonomic form factor that fits any lifestyle.`,
    },
    {
      title: "Flavor Profiles",
      description: `${brand.name} offers a diverse range of bold, satisfying flavors crafted for every type of vaper.`,
    },
    {
      title: "Coil Technology",
      description: `Advanced coil systems deliver consistent vapor and rich flavor from first draw to last.`,
    },
    {
      title: "Power & Longevity",
      description: `High-capacity rechargeable batteries ensure your ${brand.name} device never runs out of power before the e-liquid is done.`,
    },
  ];

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getsmoke.com" },
      { "@type": "ListItem", position: 2, name: "Brands", item: "https://getsmoke.com/brands" },
      { "@type": "ListItem", position: 3, name: brand.name, item: `https://getsmoke.com/brands/${brand.slug}` },
    ],
  };

  // ItemList schema — top products for this brand
  const itemListSchema = brand.products.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.name} Disposable Vapes`,
    url: `https://getsmoke.com/brands/${brand.slug}`,
    numberOfItems: brand.products.length,
    itemListElement: brand.products.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `https://getsmoke.com/product/${p.slug}`,
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <main className="font-unbounded pb-16">
        {/* Breadcrumb */}
        <nav className="w-11/12 mx-auto pt-6 pb-2 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/brands" className="hover:underline">
            Brands
          </Link>
          <span>/</span>
          <span className="text-gray-800">{brand.name}</span>
        </nav>

        {/* Black hero section */}
        <section className="bg-black text-white text-center py-16 px-6 mt-4">
          <h1 className="font-unbounded font-bold text-3xl md:text-4xl lg:text-5xl mb-8">
            {h1}
          </h1>
          <div className="max-w-3xl mx-auto space-y-4">
            {(
              seo?.introParagraphs ?? [
                `Discover the best ${brand.name} disposable vapes at GetSmoke. Every device is crafted for consistent performance and bold flavor that satisfies from first draw to last.`,
                `${brand.name} has earned a loyal following by delivering premium vaping experiences at accessible prices. Explore the full lineup and find your perfect all-day vape.`,
                `At GetSmoke, we carry the complete ${brand.name} collection with competitive pricing and subscription savings of up to 10%. Never run out of your favorite flavor again.`,
              ]
            ).map((para, i) => (
              <p key={i} className="text-gray-200 text-sm md:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Hero product image */}
        {heroImageUrl && (
          <div className="flex justify-center my-10 px-4">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image
                src={heroImageUrl}
                alt={`${brand.name} vape`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <section className="w-11/12 mx-auto mt-6">
          <h2 className="font-unbounded font-bold text-2xl md:text-3xl mb-8 text-center">
            {brand.name} Vape
          </h2>
          {brand.products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No products available for this brand yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {brand.slug === "hqd" && <HqdGoModelCard />}
              {brandModels.map(model => (
                <GenericModelCard key={model.slug} model={model} />
              ))}
              {brand.products.map((product) => (
                <BrandProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Advantage / Features section */}
        <section className="w-11/12 mx-auto mt-16">
          <h2 className="font-unbounded font-bold text-2xl md:text-3xl mb-10 text-center">
            {advantageTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-6 text-center bg-white shadow-sm"
              >
                <h3 className="font-unbounded font-bold text-sm md:text-base mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="w-11/12 mx-auto mt-16 text-center">
          <h2 className="font-unbounded font-bold text-2xl md:text-3xl mb-6">
            {seo?.ctaTitle ?? "Elevate Your Daily Routine"}
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {seo?.ctaText ??
              `Explore the full ${brand.name} lineup at GetSmoke and find your perfect everyday vape. Competitive pricing, fast shipping, and subscription savings of up to 10%.`}
          </p>
          <Link
            href="/vapes"
            className="inline-block py-3 px-8 rounded-full text-white font-bold text-sm"
            style={{
              background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)",
            }}
          >
            Shop All Vapes
          </Link>
        </section>

        {/* Closing section */}
        <section className="w-11/12 mx-auto mt-16 text-center max-w-3xl mx-auto">
          <h2 className="font-unbounded font-bold text-2xl md:text-3xl mb-6">
            {seo?.closingTitle ?? "Where Passion Meets Performance"}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {seo?.closingText ??
              `${brand.name} continues to set the standard for quality, flavor, and reliability in the disposable vape market. Discover the full lineup at GetSmoke and experience the difference.`}
          </p>
        </section>

        {/* FAQ section */}
        <div className="mt-16">
          <BrandFaq
            title={seo?.faqTitle ?? `${brand.name} Vapes FAQs`}
            faqs={
              seo?.faqs ?? [
                {
                  question: `What products does ${brand.name} offer?`,
                  answer: `${brand.name} offers a range of premium disposable vapes available at GetSmoke. Browse our full collection for the latest models and flavors.`,
                },
                {
                  question: `Are ${brand.name} vapes rechargeable?`,
                  answer: `Many ${brand.name} devices include USB-C recharging. Check individual product listings for specific details.`,
                },
                {
                  question: `What nicotine strength does ${brand.name} use?`,
                  answer: `Most ${brand.name} devices use 5% (50mg) nicotine salt for a smooth, satisfying draw.`,
                },
                {
                  question: `How many puffs does a ${brand.name} vape deliver?`,
                  answer: `${brand.name} offers devices across a range of puff counts. See individual product listings for exact specifications.`,
                },
                {
                  question: `Where can I buy authentic ${brand.name} vapes?`,
                  answer: `GetSmoke is an authorized ${brand.name} retailer. All our products are genuine and ship fast across the USA.`,
                },
              ]
            }
          />
        </div>
      </main>
    </>
  );
}
