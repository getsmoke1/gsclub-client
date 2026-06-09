import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";

export const metadata: Metadata = {
  ...noIndex,
  title: "Hookah & E-Hookah | GetSmoke",
  description: "Shop hookah, e-hookah and shisha vapes at GetSmoke.",
};

export default function HookahPage() {
  return <VapePage productType="HOOKAH" />;
}
