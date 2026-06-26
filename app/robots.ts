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
        ],
      },
      // OpenAI GPTBot
      { userAgent: "GPTBot", allow: "/" },
      // Anthropic ClaudeBot
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      // Google AI (Gemini / AI Overviews)
      { userAgent: "Google-Extended", allow: "/" },
      // Perplexity AI
      { userAgent: "PerplexityBot", allow: "/" },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/" },
      // Common Crawl
      { userAgent: "CCBot", allow: "/" },
      // Cohere AI
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: [
      "https://getsmoke.com/sitemap.xml",
      "https://getsmoke.com/server-sitemap-products.xml",
      "https://getsmoke.com/server-sitemap-blog.xml",
    ],
    host: "https://getsmoke.com",
  };
}
