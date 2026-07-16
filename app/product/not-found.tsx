import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Not Found | GetSmoke",
  robots: { index: false },
};

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-unbounded">
      <p className="text-5xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-xs">
        This product is no longer available or the link may be outdated.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/vapes"
          className="px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:opacity-80 transition"
        >
          Browse Disposables
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-full border-2 border-black text-black text-sm font-bold hover:bg-gray-100 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
