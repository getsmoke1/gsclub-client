import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { prefetchProducts } from "@/lib/prefetch-products";

export const metadata: Metadata = {
  ...noIndex,
  title: "Hookah & E-Hookah | GetSmoke",
  description: "Shop hookah, e-hookah and shisha vapes at GetSmoke.",
};

export default async function HookahPage() {
  const initialProducts = await prefetchProducts("HOOKAH", 24);
  return <VapePage productType="HOOKAH" initialProducts={initialProducts} />;
}
