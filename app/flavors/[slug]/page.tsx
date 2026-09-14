import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = "https://getsmoke.com";

type Props = {
  params: Promise<{ slug: string }>;
};

interface FaqItem {
  q: string;
  a: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = await prisma.flavorBuyPage.findUnique({
    where: { slug },
    select: { title: true, metaDescription: true },
  });

  if (!page) {
    return { title: "Flavor Not Found" };
  }

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/flavors/${slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `${SITE_URL}/flavors/${slug}`,
      siteName: "GetSmoke",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

/** Fetch the first image URL for a product slug via Prisma. */
async function getProductImageUrl(productSlug: string): Promise<string> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
      select: {
        images: {
          orderBy: { position: "asc" },
          take: 1,
          select: { url: true },
        },
      },
    });
    const raw = product?.images?.[0]?.url;
    return r2src(raw);
  } catch {
    return "/placeholder-vape.jpg";
  }
}

export default async function FlavorPage({ params }: Props) {
  const { slug } = await params;

  const page = await prisma.flavorBuyPage.findUnique({
    where: { slug },
  });

  if (!page) {
    return notFound();
  }

  // Fetch real product image server-side (SSR)
  const productImageUrl = await getProductImageUrl(page.productSlug);

  const faqItems = (page.faq as unknown as FaqItem[]) ?? [];

  const brandDisplay = page.brandSlug
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: page.h1,
    description: page.metaDescription,
    url: `${SITE_URL}/flavors/${slug}`,
    image: productImageUrl.startsWith("/r2")
      ? `${SITE_URL}${productImageUrl}`
      : productImageUrl,
    brand: {
      "@type": "Brand",
      name: brandDisplay,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: page.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/product/${page.productSlug}`,
      seller: { "@type": "Organization", name: "GetSmoke" },
    },
  };

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {page.h1}
          </h1>
          <p className="text-gray-500 text-sm">
            {page.puffCount} Puffs &bull; 5% Nicotine &bull; Rechargeable
          </p>
        </section>

        {/* Product Card */}
        <section className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 items-center">
          <Link href={`/product/${page.productSlug}`} className="shrink-0">
            <Image
              src={productImageUrl}
              alt={`${page.flavorName} ${page.modelName}`}
              width={180}
              height={180}
              className="object-contain rounded-xl"
              priority
            />
          </Link>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {page.flavorName} {page.modelName}
            </h2>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              ${page.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mb-4">{page.puffCount} puffs</p>
            <a
              href={`${SITE_URL}/product/${page.productSlug}`}
              className="inline-block px-8 py-3 rounded-full font-semibold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FE3500" }}
            >
              Buy Now
            </a>
          </div>
        </section>

        {/* Long-form content */}
        <article
          className="prose prose-gray max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="border border-gray-200 rounded-xl p-4 group"
                >
                  <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                    {item.q}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9660;
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Flavors */}
        {page.relatedSlugs && page.relatedSlugs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Related Flavors
            </h2>
            <div className="flex flex-wrap gap-3">
              {page.relatedSlugs.map((relSlug) => (
                <Link
                  key={relSlug}
                  href={`/flavors/${relSlug}`}
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors"
                >
                  {relSlug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back CTA */}
        <div className="text-center">
          <Link
            href="/vapes"
            className="text-sm text-gray-500 hover:text-gray-800 underline"
          >
            Browse all vapes
          </Link>
        </div>
      </main>
    </>
  );
}
