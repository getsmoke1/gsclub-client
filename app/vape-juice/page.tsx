import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { prefetchProducts } from "@/lib/prefetch-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: 'https://getsmoke.com/vape-juice' },
  ...noIndex,
  title: "Vape Juice | GetSmoke",
  description: "Shop premium vape juice and e-liquids at GetSmoke. Wide selection of flavors, nicotine strengths, and salt nic options. Fast US shipping, ages 21+.",
};

export default async function VapeJuicePage() {
  const initialProducts = await prefetchProducts("VAPE_JUICE", 24);
  return <VapePage productType="VAPE_JUICE" initialProducts={initialProducts} heading="Vape Juice" />;
}
