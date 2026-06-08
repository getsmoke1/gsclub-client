import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/blog");
  return { ...noIndex, ...buildSeoMetadata(seoData, "/blog") };
}


