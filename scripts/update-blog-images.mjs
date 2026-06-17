import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const WP_BASE = "https://getsmoke.com/wp-json/wp/v2";

async function getFeaturedImageUrl(mediaId) {
  if (!mediaId) return null;
  try {
    const res = await fetch(`${WP_BASE}/media/${mediaId}?_fields=source_url,media_details`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.media_details?.sizes?.large?.source_url
      || data?.media_details?.sizes?.medium_large?.source_url
      || data?.source_url || null;
  } catch { return null; }
}

async function updateImages(slug, type) {
  try {
    const res = await fetch(`${WP_BASE}/${type}?slug=${slug}&_fields=featured_media`);
    if (!res.ok) return false;
    const data = await res.json();
    if (!data.length) return false;

    const mediaId = data[0].featured_media;
    const imgUrl = await getFeaturedImageUrl(mediaId);
    if (!imgUrl) { console.log(`  ⚠️  No image: ${slug}`); return true; }

    const article = await prisma.blogArticle.findUnique({ where: { slug }, include: { images: true } });
    if (!article) { console.log(`  ⚠️  Not in DB: ${slug}`); return false; }

    // Delete existing images for this article
    if (article.images.length > 0) {
      await prisma.image.deleteMany({ where: { blogArticleId: article.id } });
    }

    // Create new image record
    await prisma.image.create({
      data: { url: imgUrl, position: 0, blogArticleId: article.id },
    });

    console.log(`  ✅ ${slug} → ${imgUrl.split('/').pop()}`);
    return true;
  } catch (e) { console.log(`  ❌ ${slug}: ${e.message.split('\n')[0]}`); return false; }
}

const ALL_SLUGS = [
  { slug: "geek-bar-pulse-vs-pulse-x-2026", type: "posts" },
  { slug: "lost-mary-mt15000-vs-mt35000-turbo-2026", type: "posts" },
  { slug: "juicy-bar-jb7500-vs-jb25000-2026", type: "posts" },
  { slug: "hqd-cuvie-plus-vs-bar-vs-glaze-2026", type: "posts" },
  { slug: "best-vape-for-beginners-2026", type: "pages" },
  { slug: "best-disposable-vapes-under-20-2026", type: "pages" },
  { slug: "best-vapes-for-travel-2026", type: "pages" },
  { slug: "best-refillable-pod-vapes-2026", type: "pages" },
  { slug: "best-nicotine-free-vapes-2026", type: "pages" },
  { slug: "best-compact-discreet-vapes-2026", type: "pages" },
  { slug: "best-vapes-online-2026", type: "pages" },
  { slug: "cheapest-disposable-vapes-online-2026", type: "pages" },
  { slug: "best-vape-brands-2026", type: "pages" },
  { slug: "how-to-buy-disposable-vapes-online-safely-2026", type: "pages" },
  { slug: "vape-delivery-miami", type: "pages" },
  { slug: "vape-delivery-atlanta", type: "pages" },
  { slug: "vape-delivery-phoenix", type: "pages" },
  { slug: "vape-delivery-chicago", type: "pages" },
  { slug: "vape-delivery-las-vegas-nevada", type: "pages" },
  { slug: "vape-laws-los-angeles", type: "pages" },
  { slug: "vape-laws-san-diego", type: "pages" },
  { slug: "vape-laws-philadelphia", type: "pages" },
];

async function main() {
  console.log("=== Updating blog images from WordPress ===\n");
  for (const { slug, type } of ALL_SLUGS) {
    let ok = await updateImages(slug, type);
    if (!ok) ok = await updateImages(slug, type === "pages" ? "posts" : "pages");
    await new Promise(r => setTimeout(r, 400));
  }
  console.log("\n✅ Done.");
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
