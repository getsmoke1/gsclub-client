import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const SITE_URL = "https://getsmoke.com";

export const metadata: Metadata = {
  title: "Angel Rose - Vape Expert & Writer | GetSmoke",
  description:
    "Angel Rose is a vape industry writer and product expert at GetSmoke. She covers disposable vape reviews, brand comparisons, and nicotine guides for adult vapers.",
  alternates: { canonical: `${SITE_URL}/author/angel-rose` },
};

const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Angel Rose",
  url: `${SITE_URL}/author/angel-rose`,
  jobTitle: "Vape Industry Writer & Product Expert",
  worksFor: {
    "@type": "Organization",
    name: "GetSmoke",
    url: SITE_URL,
    sameAs: ["https://www.instagram.com/getsmoke.shop/"],
  },
  knowsAbout: [
    "Disposable vapes",
    "Nicotine products",
    "Vape brand comparisons",
    "E-cigarettes",
    "Vape flavor reviews",
  ],
};

export default async function AngelRosePage() {
  const articles = await prisma.blogArticle.findMany({
    where: { author: "Angel Rose" },
    select: { slug: true, title: true, createdAt: true, description: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <main className="w-11/12 max-w-3xl mx-auto py-12 font-unbounded text-black">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Angel Rose</h1>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
            Vape Industry Writer - Product Expert
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Angel Rose has written extensively about disposable vapes, nicotine
            products, and the e-cigarette industry. Her guides and brand
            comparisons help adult vapers find the right product for their
            needs. She covers everything from puff count breakdowns to
            head-to-head brand comparisons.
          </p>
        </div>

        {articles.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-6 border-b pb-3">
              Articles by Angel Rose
            </h2>
            <ul className="flex flex-col gap-5">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="text-base font-semibold hover:underline"
                  >
                    {a.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(a.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
