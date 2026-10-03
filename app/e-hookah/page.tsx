import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";

export const metadata: Metadata = {
  alternates: { canonical: 'https://getsmoke.com/e-hookah' },
  ...noIndex,
  title: "E-Hookah Vapes | GetSmoke",
  description: "Shop E-Hookah disposable devices at GetSmoke. Best selection of electronic hookah pens with authentic flavors. Fast US shipping, competitive prices. Ages 21+.",
};

export default function EHookahPage() {
  return <VapePage productType="HOOKAH" heading="E-Hookah Vapes" />;
}
