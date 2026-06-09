import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";

export const metadata: Metadata = {
  ...noIndex,
  title: "E-Hookah Vapes | GetSmoke",
  description: "Shop E-Hookah disposable devices at GetSmoke. Best selection of shisha-style vapes.",
};

export default function EHookahPage() {
  return <VapePage productType="HOOKAH" />;
}
