import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { noIndex } from "@/lib/noindex";
import { getCachedProducts } from "@/lib/cached-queries";

export const revalidate = 300;

export const metadata: Metadata = {
  ...noIndex,
  title: "Shop All Vapes | GetSmoke",
  description: "Shop all disposable vapes at GetSmoke.",
};

export default async function VapesPage() {
  const initialProducts = await getCachedProducts("VAPES", 24);
  return <VapePage productType="VAPES" initialProducts={initialProducts} />;
}
