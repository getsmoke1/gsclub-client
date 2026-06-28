import { Metadata } from "next";
import VapePage from "@/components/vapes/VapePage";
import { getCachedProducts } from "@/lib/cached-queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SITE_URL = "https://getsmoke.com";
const PER_PAGE = 24;

type Props = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1") || 1);
  const isFirstPage = pageNum === 1;

  const title = isFirstPage
    ? "Shop All Vapes | GetSmoke"
    : `Shop All Vapes - Page ${pageNum} | GetSmoke`;
  const canonical = isFirstPage
    ? `${SITE_URL}/vapes`
    : `${SITE_URL}/vapes?page=${pageNum}`;

  return {
    title,
    description: "Shop all disposable vapes, e-cigarettes, and hookah at GetSmoke. Best brands, fast US shipping, 21+ only.",
    alternates: {
      canonical,
      ...(pageNum > 1 && { prev: pageNum === 2 ? `${SITE_URL}/vapes` : `${SITE_URL}/vapes?page=${pageNum - 1}` }),
    },
    openGraph: {
      title,
      url: canonical,
      siteName: "GetSmoke",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Shop All Vapes | GetSmoke" }],
    },
  };
}

export default async function VapesPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1") || 1);

  // Fetch products for current page via API (server-side for SEO)
  const res = await fetch(
    `${SITE_URL}/api/products?productType=VAPES&limit=${PER_PAGE}&page=${pageNum}`,
    { cache: "no-store" }
  ).catch(() => null);
  const data = res?.ok ? await res.json() : null;
  const initialProducts = data?.products ?? await getCachedProducts("VAPES", PER_PAGE);
  const totalPages = data?.totalPages ?? 10;

  return (
    <>
      <VapePage
        productType="VAPES"
        initialProducts={initialProducts}
        heading={pageNum === 1 ? "Shop All Disposable Vapes" : `Shop All Disposable Vapes — Page ${pageNum}`}
      />
      {/* SEO pagination — crawlable numbered links */}
      {totalPages > 1 && (
        <nav aria-label="Page navigation" className="flex justify-center gap-2 py-8 flex-wrap">
          {pageNum > 1 && (
            <Link
              href={pageNum === 2 ? "/vapes" : `/vapes?page=${pageNum - 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
            >
              ← Previous
            </Link>
          )}
          {Array.from({ length: Math.min(totalPages, 15) }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/vapes" : `/vapes?page=${p}`}
              className={`px-4 py-2 rounded-lg border text-sm ${
                p === pageNum
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              aria-current={p === pageNum ? "page" : undefined}
            >
              {p}
            </Link>
          ))}
          {pageNum < totalPages && (
            <Link
              href={`/vapes?page=${pageNum + 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
            >
              Next →
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
