import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/hookah");
  return { ...noIndex, ...buildSeoMetadata(seoData, "/hookah") };
}

export default function HookahPage() {
  return <VapePage productType="HOOKAH" title="Hookah" />;
}
