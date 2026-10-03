import Blog from "@/components/Blog/Blog";
import { prisma } from "@/lib/prisma";
import React from "react";
import type { Metadata } from "next";
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";

export const dynamic = "force-dynamic"; // always fetch fresh from DB — blog list updates frequently

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSEOData("/blog");
    const meta = buildSeoMetadata(seoData, "/blog");
    if (meta.openGraph && !meta.openGraph.images) {
      meta.openGraph.images = [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "GetSmoke Vape Blog" }];
    }
    return meta;
  } catch {
    return { title: "Blog | GetSmoke", description: "Browse 300+ expert vape articles at GetSmoke: reviews, comparisons, guides, and tips on the best disposable vapes. Geek Bar, RAZ, HQD and more. 21+ only." };
  }
}

const page = async () => {
  try {
    // All images now served from R2 via MongoDB - no WP API calls
    const articles = await prisma.blogArticle.findMany({
      include: { images: { take: 1, orderBy: { position: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    return <div><Blog articles={articles} /></div>;
  } catch (error) {
    console.error("Failed to fetch blog articles:", error);
    return <div className="p-8 text-center"><p>Failed to load blog articles. Please try again later.</p></div>;
  }
};

export default page;
