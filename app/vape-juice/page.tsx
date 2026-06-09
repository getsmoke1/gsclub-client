import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";

export const metadata: Metadata = {
  ...noIndex,
  title: "Vape Juice & E-Liquids | GetSmoke",
  description: "Shop vape juice and e-liquids at GetSmoke.",
};

export default function VapeJuicePage() {
  return <VapePage productType="VAPES" />;
}
