import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  try {
    const pages = await prisma.flavorBuyPage.findMany({
      where: { isActive: true },
      select: { slug: true, title: true, createdAt: true },
      orderBy: { slug: "asc" },
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `
  <url>
    <loc>https://getsmoke.com/flavors/${escapeXml(p.slug)}</loc>
    <lastmod>${p.createdAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating flavors sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
