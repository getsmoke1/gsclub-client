import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all, block private routes
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/dashboard/",
          "/_next/",
          "/my-account/",
          "/cart/",
          "/checkout/",
          "/email-preview/",
          "/login/",
          "/signup/",
          "/reset-password/",
          "/forgot-password/",
          "/age-verify/", // personal verification pages - noindex
        ],
      },
      // Block aggressive scrapers with no SEO value
      { userAgent: "Bytespider", disallow: "/" },       // ByteDance scraper
      { userAgent: "AhrefsBot", disallow: "/" },        // Ahrefs (blocks server)
      { userAgent: "SemrushBot", disallow: "/" },       // Semrush (blocks server)
      { userAgent: "DotBot", disallow: "/" },           // Moz scraper
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic
      { userAgent: "ClaudeBot", allow: "/" },           // correct name (was Claude-Web)
      { userAgent: "anthropic-ai", allow: "/" },
      // Google AI (Gemini / AI Overviews / SGE)
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      // Apple Intelligence
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      // Perplexity AI
      { userAgent: "PerplexityBot", allow: "/" },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      // You.com
      { userAgent: "YouBot", allow: "/" },
      // Common Crawl (used by many AI models for training)
      { userAgent: "CCBot", allow: "/" },
      // Cohere AI
      { userAgent: "cohere-ai", allow: "/" },
      // AI2 (Allen Institute)
      { userAgent: "AI2Bot", allow: "/" },
      // Diffbot (used for AI knowledge bases)
      { userAgent: "Diffbot", allow: "/" },
    ],
    sitemap: [
      "https://getsmoke.com/sitemap.xml",
      "https://getsmoke.com/server-sitemap-products.xml",
      "https://getsmoke.com/server-sitemap-blog.xml",
    ],
    host: "https://getsmoke.com",
  };
}
