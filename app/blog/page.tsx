import Blog from "@/components/Blog/Blog";
import { prisma } from "@/lib/prisma";
import { getWpFeaturedImages } from "@/lib/wp-images";
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
    const articles = await prisma.blogArticle.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } });

    // Enrich with WP featured images for posts without images
    const slugsNeedingImages = articles
      .filter(a => !a.images?.length || !a.images[0]?.url)
      .map(a => a.slug);

    const wpImages = slugsNeedingImages.length > 0
      ? await getWpFeaturedImages(slugsNeedingImages)
      : {};

    // Save WP images to MongoDB so future loads don't hit WP API
    await Promise.all(
      Object.entries(wpImages)
        .filter(([, url]) => url)
        .map(async ([slug, url]) => {
          const article = articles.find(a => a.slug === slug);
          if (!article) return;
          try {
            await prisma.image.create({
              data: { url: url as string, blogArticleId: article.id, position: 0 },
            });
          } catch {} // ignore duplicate errors
        })
    );

    // Merge WP images into articles
    const enriched = articles.map(a => ({
      ...a,
      images: a.images?.length && a.images[0]?.url
        ? a.images
        : wpImages[a.slug] ? [{ url: wpImages[a.slug] as string, id: "", productId: null, blogArticleId: a.id, createdAt: new Date(), updatedAt: new Date(), position: null }] : [],
    }));

    return <div><Blog articles={enriched} /></div>;
  } catch (error) {
    console.error("Failed to fetch blog articles:", error);
    return <div className="p-8 text-center"><p>Failed to load blog articles. Please try again later.</p></div>;
  }
};

export default page;
