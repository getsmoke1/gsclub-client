import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { getCachedProducts } from "@/lib/cached-queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop All Vapes | GetSmoke",
  description: "Shop all disposable vapes, e-cigarettes, and hookah at GetSmoke. Best brands, fast US shipping, 21+ only.",
  alternates: { canonical: "https://getsmoke.com/vapes" },
  openGraph: { title: "Shop All Vapes | GetSmoke", url: "https://getsmoke.com/vapes", siteName: "GetSmoke" },
};

export default async function VapesPage() {
  const initialProducts = await getCachedProducts("VAPES", 24);
  return <VapePage productType="VAPES" initialProducts={initialProducts} />;
}
