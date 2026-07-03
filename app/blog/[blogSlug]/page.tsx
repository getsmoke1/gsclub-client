import BlogDetails from "@/components/Blog/BlogDetails";
import { noIndex } from "@/lib/noindex";
import { prisma } from "@/lib/prisma";
import { r2src } from "@/lib/r2-image";
// wp-images removed — images now on R2 via MongoDB
import { getSEOData } from "@/lib/seo";
import { Article } from "@/types/article";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
// Plain <script> tags used for JSON-LD (next/script puts schemas in RSC payload)

const SITE_URL = "https://getsmoke.com";

type Props = {
  params: Promise<{ blogSlug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug } = await params;

  try {
    // Fetch blog article data
    const article = await prisma.blogArticle.findUnique({
      where: { slug: blogSlug },
      select: {
        title: true,
        description: true,
        subtitle: true,
        images: { select: { url: true }, take: 1 },
      },
    });

    if (!article) {
      return {
        title: "Blog Article Not Found",
        description: "The requested blog article could not be found.",
      };
    }

    // Fetch SEO data for the specific slug
    const seoData = await getSEOData(`/blog/${blogSlug}`);

    const articleImageUrl = article.images?.[0]?.url
      ? r2src(article.images[0].url)
      : undefined;

    const metadata: Metadata = {
      ...noIndex,
      // Canonical URL for this blog post
      alternates: {
        canonical: `${SITE_URL}/blog/${blogSlug}`,
      },
    };

    // If SEO data exists for this specific slug, use it exclusively
    if (seoData) {
      // Use SEO data only, don't mix with article data
      if (seoData.title) {
        metadata.title = seoData.title;
      }

      if (seoData.description) {
        metadata.description = truncateDescription(seoData.description, 160);
      }

      // Keywords
      if (
        seoData.keywords &&
        Array.isArray(seoData.keywords) &&
        seoData.keywords.length > 0
      ) {
        metadata.keywords = seoData.keywords;
      }

      // OpenGraph
      const ogTitle = seoData.ogTitle || seoData.title || article.title;
      const ogDesc = seoData.ogDescription || seoData.description;
      const ogImg = seoData.ogImage || articleImageUrl;

      metadata.openGraph = {
        type: "article",
        title: ogTitle || undefined,
        description: ogDesc || undefined,
        url: `${SITE_URL}/blog/${blogSlug}`,
        siteName: "GetSmoke",
        images: ogImg ? [{ url: ogImg, width: 1200, height: 630, alt: ogTitle || "" }] : undefined,
      };

      metadata.twitter = {
        card: "summary_large_image",
        title: ogTitle || undefined,
        description: ogDesc || undefined,
        images: ogImg ? [ogImg] : undefined,
      };
    } else {
      // No SEO data exists, fallback to article data
      if (article.title) {
        metadata.title = article.title;
      }

      // Use article description or subtitle as fallback
      let plainDescription = "";
      if (article.description && article.description.length > 0) {
        plainDescription = stripHtmlTags(article.description);
      } else if (article.subtitle && article.subtitle.length > 0) {
        plainDescription = stripHtmlTags(article.subtitle);
      }

      if (plainDescription) {
        metadata.description = truncateDescription(plainDescription, 160);
      }

      // Always set OG + Twitter from article data when no custom SEO record
      metadata.openGraph = {
        type: "article",
        title: article.title || undefined,
        description: plainDescription
          ? truncateDescription(plainDescription, 160)
          : undefined,
        url: `${SITE_URL}/blog/${blogSlug}`,
        siteName: "GetSmoke",
        images: articleImageUrl
          ? [{ url: articleImageUrl, width: 1200, height: 630, alt: article.title || "" }]
          : [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "GetSmoke Blog" }],
      };

      metadata.twitter = {
        card: "summary_large_image",
        title: article.title || undefined,
        description: plainDescription
          ? truncateDescription(plainDescription, 160)
          : undefined,
        images: articleImageUrl
          ? [articleImageUrl]
          : [`${SITE_URL}/og-default.jpg`],
      };
    }

    return metadata;
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Blog Article Not Found",
      description: "An error occurred while loading the blog article.",
    };
  }
}

// Utility function to strip HTML tags
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim(); // Remove leading/trailing spaces
}

// Utility function to truncate description to SEO-friendly length
function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

const page = async ({ params }: Props) => {
  const { blogSlug } = await params;

  try {
    const article = await prisma.blogArticle.findUnique({
      where: {
        slug: blogSlug,
      },
      include: {
        images: true,
      },
    });

    if (!article) {
      return notFound();
    }

    const articleUrl = `${SITE_URL}/blog/${blogSlug}`;
    const imageUrl = article.images?.[0]?.url
      ? r2src(article.images[0].url)
      : `${SITE_URL}/og-default.jpg`;

    // Strip HTML for description in Schema
    const plainDescription = stripHtmlTags(
      article.description || article.subtitle || ""
    );

    // BlogPosting Schema for Google + AI bots
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: truncateDescription(plainDescription, 200),
      url: articleUrl,
      datePublished: (article as Article & { createdAt?: Date | string }).createdAt
        ? new Date((article as Article & { createdAt?: Date | string }).createdAt as string).toISOString()
        : new Date().toISOString(),
      dateModified: (article as Article & { updatedAt?: Date | string }).updatedAt
        ? new Date((article as Article & { updatedAt?: Date | string }).updatedAt as string).toISOString()
        : new Date().toISOString(),
      image: imageUrl,
      author: {
        "@type": "Person",
        name: "Angel Rose",
        url: `${SITE_URL}/author/angel-rose`,
      },
      publisher: {
        "@type": "Organization",
        name: "GetSmoke",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon-192.png`,
        },
        sameAs: ["https://www.instagram.com/getsmoke.shop/"],
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "article p:first-of-type", ".blog-intro"],
      },
    };

    // BreadcrumbList schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
      ],
    };

    // FAQPage schema — generated from article.faq field (stored in MongoDB)
    type FaqItem = { question: string; answer: string; order?: number };
    const faqItems: FaqItem[] = Array.isArray((article as Article & { faq?: FaqItem[] }).faq)
      ? ((article as Article & { faq?: FaqItem[] }).faq as FaqItem[])
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];

    const faqSchema = faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
        <div>
          <BlogDetails article={article as Article} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch blog article:", error);
    return notFound();
  }
};

export default page;
