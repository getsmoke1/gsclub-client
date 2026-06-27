import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { getCachedProducts } from "@/lib/cached-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Vapes | GetSmoke",
  description: "Shop all disposable vapes, e-cigarettes, and hookah at GetSmoke. Best brands, fast US shipping, 21+ only.",
  alternates: { canonical: "https://getsmoke.com/vapes" },
  openGraph: { title: "Shop All Vapes | GetSmoke", url: "https://getsmoke.com/vapes", siteName: "GetSmoke", images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Shop All Vapes | GetSmoke" }] },
};

export default async function VapesPage() {
  const initialProducts = await getCachedProducts("VAPES", 24);
  return <VapePage productType="VAPES" initialProducts={initialProducts} heading="Shop All Disposable Vapes" />;
}
