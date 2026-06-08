import VapePage from "@/components/vapes/VapePage";
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/vapes");
  return { ...noIndex, ...buildSeoMetadata(seoData, "/vapes") };
}

const page = () => <VapePage />;
export default page;
