import Blog from "@/components/Blog/Blog";
import { prisma } from "@/lib/prisma";
import React from "react";
import type { Metadata } from "next";
import { getSEOData } from "@/lib/seo";
import { buildSeoMetadata } from "@/lib/canonical";
import { noIndex } from "@/lib/noindex";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSEOData("/blog");
    return { ...noIndex, ...buildSeoMetadata(seoData, "/blog") };
  } catch {
    return { title: "Blog | GetSmoke", description: "Explore our latest vape articles." };
  }
}

const page = async () => {
  try {
    // All images now served from R2 via MongoDB — no WP API calls
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
