import CommingSoon from '@/components/CommingSoon/CommingSoon';
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/adults-goods");
  return { ...noIndex, ...buildSeoMetadata(seoData, "/adults-goods") };
}

const page = () => {
  return <CommingSoon />;
};

export default page;
