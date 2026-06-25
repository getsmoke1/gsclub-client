import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModelBySlug, MODELS } from "@/lib/models-config";
import GenericModelPage from "@/components/ModelPage/GenericModelPage";

type Props = { params: Promise<{ modelSlug: string }> };

export async function generateStaticParams() {
  return MODELS.map(m => ({ modelSlug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) return {};
  const canonicalUrl = `https://getsmoke.com/models/${modelSlug}`;
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
  };
}

export default async function ModelPage({ params }: Props) {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://getsmoke.com" },
      { "@type": "ListItem", position: 2, name: "Vapes", item: "https://getsmoke.com/vapes" },
      { "@type": "ListItem", position: 3, name: model.brand, item: `https://getsmoke.com/brands/${model.brandSlug}` },
      { "@type": "ListItem", position: 4, name: model.name, item: `https://getsmoke.com/models/${modelSlug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* SSR H1 for crawlers — client component renders its own visible H1 after JS loads */}
      <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        {model.name} Disposable Vape
      </h1>
      <GenericModelPage modelSlug={modelSlug} />
    </>
  );
}
