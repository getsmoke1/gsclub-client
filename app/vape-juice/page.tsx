import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";

export const metadata: Metadata = {
  ...noIndex,
  title: "Vape Juice | GetSmoke",
  description: "Shop premium vape juice and e-liquids at GetSmoke. Ice Monster, Lost Art and more.",
};

export default function VapeJuicePage() {
  return <VapePage productType="VAPE_JUICE" />;
}
