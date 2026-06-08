// lib/canonical.ts
// Utility for generating canonical URLs and SEO metadata for GetSmoke

import type { Metadata } from "next";

export const SITE_URL = "https://getsmoke.com";

interface SeoData {
  title?: string | null;
  description?: string | null;
  keywords?: string[];
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
}

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildSeoMetadata(seoData: SeoData | null, canonicalPath: string): Metadata {
  const metadata: Metadata = {
    alternates: {
      canonical: getCanonicalUrl(canonicalPath),
    },
  };

  if (!seoData) return metadata;

  if (seoData.title) metadata.title = seoData.title;
  if (seoData.description) metadata.description = seoData.description;
  if (seoData.keywords?.length) metadata.keywords = seoData.keywords;

  const ogTitle = seoData.ogTitle || seoData.title;
  const ogDescription = seoData.ogDescription || seoData.description;
  const ogImage = seoData.ogImage;

  if (ogTitle || ogDescription || ogImage) {
    metadata.openGraph = {
      siteName: "GetSmoke",
      locale: "en_US",
      type: "website",
      url: getCanonicalUrl(canonicalPath),
      ...(ogTitle && { title: ogTitle }),
      ...(ogDescription && { description: ogDescription }),
      ...(ogImage && { images: [ogImage] }),
    };
  }

  if (ogTitle || ogDescription || ogImage) {
    metadata.twitter = {
      card: "summary_large_image",
      site: "@getsmoke",
      ...(ogTitle && { title: ogTitle }),
      ...(ogDescription && { description: ogDescription }),
      ...(ogImage && { images: [ogImage] }),
    };
  }

  return metadata;
}
