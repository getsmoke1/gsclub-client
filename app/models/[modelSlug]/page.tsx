import { Metadata } from "next";
import { notFound } from "next/navigation";
import { noIndex } from "@/lib/noindex";
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
  return {
    ...noIndex,
    title: `${model.name} Disposable Vape | Buy Online | GetSmoke`,
    description: `Buy ${model.name} disposable vape online. Multiple flavors available. Free shipping on orders over $79. Fast delivery 3-7 days across the USA.`,
  };
}

export default async function ModelPage({ params }: Props) {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) notFound();
  return <GenericModelPage modelSlug={modelSlug} />;
}
