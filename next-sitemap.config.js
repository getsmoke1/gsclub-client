/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://getsmoke.com",
  // siteUrl: "http://localhost:3000/",
  generateRobotsTxt: true,
  exclude: [
    "/api/*",
    "/admin",
    "/admin/*",
    "/my-account",
    "/my-account/*",
    "/cart",
    "/cart/*",
    "/checkout",
    "/checkout/*",
    "/email-preview",
    "/email-preview/*",
    "/login",
    "/login/*",
    "/signup",
    "/signup/*",
    "/reset-password",
    "/reset-password/*",
    "/forgot-password",
    "/forgot-password/*",
    "/_next/*",
    "/robots.txt",
    "/in-progress",
    "/juicy-bar-jb25000",
    "/juicy-bar-jb5000",
    "/juicy-bar-jb7500",
    "/adults-goods",
    "/supplements",
  ],
  generateIndexSitemap: true,
  sitemapSize: 7000,

  // Static pages
  additionalPaths: async (config) => {
    const result = [];

    // Add your static pages here
    const staticPages = [
      { loc: "/", priority: 1.0, changefreq: "daily" },
      { loc: "/about", priority: 0.8, changefreq: "monthly" },
      { loc: "/contact", priority: 0.8, changefreq: "monthly" },
      { loc: "/privacy-policy", priority: 0.5, changefreq: "yearly" },
      { loc: "/return-policy", priority: 0.5, changefreq: "yearly" },
      { loc: "/shipping-policy", priority: 0.5, changefreq: "yearly" },
      { loc: "/terms-conditions", priority: 0.5, changefreq: "yearly" },
      { loc: "/blog", priority: 0.5, changefreq: "daily" },
      { loc: "/accessories", priority: 0.5, changefreq: "daily" },
      { loc: "/hookah", priority: 0.5, changefreq: "daily" },
      { loc: "/vapes", priority: 0.5, changefreq: "daily" },
      // Collection pages (nicotine / puffs / flavor)
      { loc: "/5-percent-nicotine-vapes", priority: 0.8, changefreq: "weekly" },
      { loc: "/nicotine-free-vapes", priority: 0.8, changefreq: "weekly" },
      { loc: "/20000-puff-vapes", priority: 0.8, changefreq: "weekly" },
      { loc: "/25000-puff-vapes", priority: 0.8, changefreq: "weekly" },
      { loc: "/coffee-flavored-disposable-vapes", priority: 0.8, changefreq: "weekly" },
      { loc: "/new-in-stock", priority: 0.7, changefreq: "daily" },
      // Definition / AI answer pages
      { loc: "/what-is-a-disposable-vape", priority: 0.8, changefreq: "monthly" },
      { loc: "/what-is-nicotine-salt", priority: 0.8, changefreq: "monthly" },
      // How-To pages
      { loc: "/how-to-use-geek-bar-pulse-x", priority: 0.8, changefreq: "monthly" },
      { loc: "/how-to-charge-raz-vape", priority: 0.8, changefreq: "monthly" },
    ];

    staticPages.forEach((page) => {
      result.push({
        loc: page.loc,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: [
          "/admin/*",
          "/api/*",
          "/dashboard/*",
          "/_next/*",
          "/my-account/*",
          "/cart/*",
          "/checkout/*",
          "/email-preview/*",
          "/login/*",
          "/signup/*",
          "/reset-password/*",
          "/forgot-password/*",
        ],
      },
    ],
    additionalSitemaps: [
      "https://getsmoke.com/server-sitemap-products.xml",
      "https://getsmoke.com/server-sitemap-blog.xml",
    ],
  },
};
