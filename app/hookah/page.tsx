export const dynamic = "force-dynamic";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { prefetchProducts } from "@/lib/prefetch-products";

export const metadata: Metadata = {
  title: "Hookah & E-Hookah | GetSmoke",
  description: "Shop hookah, e-hookah and shisha vapes at GetSmoke. Premium brands, fast US shipping, 21+ only.",
  alternates: { canonical: "https://getsmoke.com/hookah" },
  openGraph: { title: "Hookah & E-Hookah | GetSmoke", url: "https://getsmoke.com/hookah", siteName: "GetSmoke", images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Hookah & E-Hookah | GetSmoke" }] },
};

export default async function HookahPage() {
  const initialProducts = await prefetchProducts("HOOKAH", 24);
  return <VapePage productType="HOOKAH" initialProducts={initialProducts} heading="Hookah & E-Hookah Vapes" />;
}
