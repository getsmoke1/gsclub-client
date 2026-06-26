export const dynamic = "force-dynamic";
import HomePage from "@/components/HomePage/HomePage";
import BrandCircles from "@/components/HomePage/BrandCircles";
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/");
  return { ...buildSeoMetadata(seoData, "/") };
}

export default async function Home() {
  // Prefetch first 30 products server-side — eliminates loading skeleton on homepage
  const rawProducts = await prisma.product.findMany({
    where: {
      productType: "VAPES",
      isArchived: false,
      name: { contains: "pack", mode: "insensitive" },
    },
    include: {
      images: { take: 1 },
      brand: true,
      flavor: true,
      Nicotine: true,
      productPuffs: { include: { puffs: true } },
      productFlavors: { include: { flavor: true } },
    },
    take: 30,
    orderBy: { name: "asc" },
  });

  // Prefetch newest 4 products server-side — eliminates skeleton on NEWEST IN tab
  const rawNewest = await prisma.product.findMany({
    where: { isArchived: false },
    include: {
      images: { take: 1 },
      brand: true,
      flavor: true,
      Nicotine: true,
      productPuffs: { include: { puffs: true } },
      productFlavors: { include: { flavor: true } },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // Prefetch bundle deals (pack products)
  const rawBundles = await prisma.product.findMany({
    where: { productType: "VAPES", isArchived: false, name: { contains: "pack", mode: "insensitive" } },
    include: { images: { take: 1 }, brand: true },
    take: 20,
    orderBy: { name: "asc" },
  });

  const initialProducts = rawProducts.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  })) as unknown as Product[];

  const newestProducts = rawNewest.map((p) => ({
    ...p,
    puffs: p.productPuffs.map((pp) => ({ ...pp.puffs, puffDesc: pp.puffDesc })),
  })) as unknown as Product[];

  const bundleProducts = rawBundles.map((p) => ({ ...p, puffs: [] }));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GetSmoke",
    url: "https://getsmoke.com",
    logo: "https://getsmoke.com/icon-192.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@getsmoke.com",
      contactType: "customer support",
      areaServed: "US",
    },
    sameAs: [],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GetSmoke",
    url: "https://getsmoke.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://getsmoke.com/vapes?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "GetSmoke - Best Disposable Vapes Online",
    "url": "https://getsmoke.com",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".speakable-hero", "meta[name='description']"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      {/* SEO H1 — visually hidden, present in DOM for crawlers */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        GetSmoke - Premium Disposable Vapes & E-Cigarettes Online
      </h1>
      <HomePage
        initialProducts={initialProducts}
        newestProducts={newestProducts}
        bundleProducts={bundleProducts}
        brandCircles={<BrandCircles />}
      />
    </>
  );
}
