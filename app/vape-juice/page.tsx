import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { prefetchProducts } from "@/lib/prefetch-products";

export const metadata: Metadata = {
  ...noIndex,
  title: "Vape Juice | GetSmoke",
  description: "Shop premium vape juice and e-liquids at GetSmoke.",
};

export default async function VapeJuicePage() {
  const initialProducts = await prefetchProducts("VAPE_JUICE", 24);
  return <VapePage productType="VAPE_JUICE" initialProducts={initialProducts} />;
}
