// lib/canonical.ts
// Utility for generating canonical URLs and SEO metadata for GetSmoke

export const SITE_URL = "https://getsmoke.com";

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildSeoMetadata(seoData: any, canonicalPath: string) {
  const metadata: any = {
    alternates: {
      canonical: getCanonicalUrl(canonicalPath),
    },
  };

  if (!seoData) return metadata;

  if (seoData.title) metadata.title = seoData.title;
  if (seoData.description) metadata.description = seoData.description;
  if (seoData.keywords?.length > 0) metadata.keywords = seoData.keywords;

  const ogTitle = seoData.ogTitle || seoData.title;
  const ogDescription = seoData.ogDescription || seoData.description;
  const ogImage = seoData.ogImage;

  if (ogTitle || ogDescription || ogImage) {
    metadata.openGraph = {
      siteName: "GetSmoke",
      locale: "en_US",
      type: "website",
      url: getCanonicalUrl(canonicalPath),
    };
    if (ogTitle) metadata.openGraph.title = ogTitle;
    if (ogDescription) metadata.openGraph.description = ogDescription;
    if (ogImage) metadata.openGraph.images = [ogImage];
  }

  if (ogTitle || ogDescription || ogImage) {
    metadata.twitter = { card: "summary_large_image", site: "@getsmoke" };
    if (ogTitle) metadata.twitter.title = ogTitle;
    if (ogDescription) metadata.twitter.description = ogDescription;
    if (ogImage) metadata.twitter.images = [ogImage];
  }

  return metadata;
}
