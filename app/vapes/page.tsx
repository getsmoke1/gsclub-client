import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { prefetchProducts } from "@/lib/prefetch-products";

export const metadata: Metadata = {
  ...noIndex,
  title: "Shop All Vapes | GetSmoke",
  description: "Shop all disposable vapes at GetSmoke.",
};

export default async function VapesPage() {
  const initialProducts = await prefetchProducts("VAPES", 24);
  return <VapePage productType="VAPES" initialProducts={initialProducts} />;
}
