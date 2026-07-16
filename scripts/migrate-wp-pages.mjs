/**
 * migrate-wp-pages.mjs
 * Fetches missing WP posts + pages from getsmoke.com and imports into MongoDB blogArticle collection.
 * Usage: node scripts/migrate-wp-pages.mjs
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const WP_BASE = "https://getsmoke.com/wp-json/wp/v2";

// Slugs of WP POSTS missing from MongoDB
const MISSING_POSTS = [
  "geek-bar-pulse-vs-pulse-x-2026",
  "lost-mary-mt15000-vs-mt35000-turbo-2026",
  "juicy-bar-jb7500-vs-jb25000-2026",
  "hqd-cuvie-plus-vs-bar-vs-glaze-2026",
];

// Slugs of WP PAGES missing from MongoDB
const MISSING_PAGES = [
  // Use-case landing pages
  "best-vape-for-beginners-2026",
  "best-disposable-vapes-under-20-2026",
  "best-vapes-for-travel-2026",
  "best-refillable-pod-vapes-2026",
  "best-nicotine-free-vapes-2026",
  "best-compact-discreet-vapes-2026",
  // High-SEO national pages
  "best-vapes-online-2026",
  "cheapest-disposable-vapes-online-2026",
  "best-vape-brands-2026",
  "how-to-buy-disposable-vapes-online-safely-2026",
  // Non-Texas city delivery
  "vape-delivery-miami",
  "vape-delivery-atlanta",
  "vape-delivery-phoenix",
  "vape-delivery-chicago",
  "vape-delivery-las-vegas-nevada",
  // Vape laws
  "vape-laws-los-angeles",
  "vape-laws-san-diego",
  "vape-laws-philadelphia",
  // Texas cities
  "vape-delivery-dallas",
  "vape-delivery-austin",
  "vape-delivery-san-antonio",
  "vape-delivery-fort-worth",
  "vape-delivery-plano",
  "vape-delivery-houston",
];

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWpEndpoint(endpoint, slug) {
  const url = `${WP_BASE}/${endpoint}?slug=${slug}&_fields=title,content,excerpt,date,featured_media,yoast_head_json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

async function getYoastDescription(item) {
  try {
    return item?.yoast_head_json?.description || "";
  } catch {
    return "";
  }
}

async function importItem(slug, type) {
  const item = await fetchWpEndpoint(type, slug);
  if (!item) {
    console.log(`  ⚠️  Not found as ${type}: ${slug}`);
    return false;
  }

  const title = stripHtml(item.title?.rendered || slug);
  const content = item.content?.rendered || "";
  const excerpt = stripHtml(item.excerpt?.rendered || "");
  const metaDesc = await getYoastDescription(item);
  const subtitle = metaDesc || excerpt || "";
  const createdAt = item.date ? new Date(item.date) : new Date();

  // Check if already exists
  const existing = await prisma.blogArticle.findUnique({ where: { slug } });
  if (existing) {
    console.log(`  ✓ Already in DB: ${slug}`);
    return true;
  }

  await prisma.blogArticle.create({
    data: {
      slug,
      title,
      subtitle,
      description: content,
      createdAt,
    },
  });
  console.log(`  ✅ Imported: ${slug} (${title.substring(0, 60)})`);
  return true;
}

async function main() {
  console.log("=== GetSmoke WP → MongoDB Migration ===\n");

  console.log(`Importing ${MISSING_POSTS.length} WP posts...`);
  for (const slug of MISSING_POSTS) {
    let ok = await importItem(slug, "posts");
    if (!ok) await importItem(slug, "pages");
  }

  console.log(`\nImporting ${MISSING_PAGES.length} WP pages...`);
  for (const slug of MISSING_PAGES) {
    let ok = await importItem(slug, "pages");
    if (!ok) await importItem(slug, "posts");
  }

  console.log("\n✅ Migration complete.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
