import VapePage from "@/components/vapes/VapePage";
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/vapes");
  return { ...noIndex, ...buildSeoMetadata(seoData, "/vapes") };
}

export default function VapesPage() {
  return (
    <main>
      <div className="w-11/12 mx-auto pt-8 pb-4">
        <h1 className="font-unbounded font-bold text-2xl md:text-3xl uppercase">
          All Disposable <span style={{ color: "#fe3500" }}>Vapes</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Shop our full collection of disposable vapes at GetSmoke
        </p>
      </div>
      <VapePage productType="VAPES" />
    </main>
  );
}
