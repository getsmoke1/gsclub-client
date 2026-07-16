const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const BRAND_SLUG_MAP = {
  'viho':'viho','geek-bar':'geek-bar','juicy-bar':'juicy-bar','juicy-bar-jb7500':'juicy-bar',
  'raz':'raz','lost-mary':'lost-mary','hqd':'hqd','fume':'fume','flum-pebble':'flum-pebble',
  'tyson':'tyson-2-0','lost-mary-vape':'lost-mary','foger-vape':'foger','fume-vape':'fume',
};
const BRAND_PAGE_MAP = {
  'raz-vape':'/brands/raz','raz-vapes':'/brands/raz','raz':'/brands/raz',
  'geek-bar-vape':'/brands/geek-bar','geekbar-vapes':'/brands/geek-bar','geekbar':'/brands/geek-bar','geek-bar':'/brands/geek-bar',
  'lost-mary-vape':'/brands/lost-mary','lost-mary':'/brands/lost-mary',
  'juicy-bar-vape':'/brands/juicy-bar','juicy-bar':'/brands/juicy-bar',
  'hqd-vape':'/brands/hqd','hqd':'/brands/hqd',
  'fume-vape':'/brands/fume','flum-pebble-vape':'/brands/flum-pebble',
  'tyson':'/brands/tyson-2-0','newest-vapes':'/vapes','shop':'/vapes',
};

function transformUrl(href, blogSlugSet) {
  let url;
  try { url = new URL(href); } catch { return null; }
  if (!url.hostname.includes('getsmoke.com')) return null;
  const path = url.pathname.replace(/\/+$/,'');
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) return '/';
  const [first, second=''] = parts;
  if (first==='product-tag') return `/brands/${BRAND_SLUG_MAP[second]||second}`;
  if (first==='product-category') {
    if (['vapes','disposable-vapes'].includes(second)) return '/vapes';
    if (['hookah'].includes(second)) return '/hookah';
    if (['vape-juice'].includes(second)) return '/vape-juice';
    return `/brands/${BRAND_SLUG_MAP[second]||second}`;
  }
  if (first==='category') { const s=second.replace(/-vape[s]?$/,''); return `/brands/${BRAND_SLUG_MAP[s]||BRAND_SLUG_MAP[second]||s}`; }
  if (first==='shop') return '/vapes';
  if (first==='brands') { const s=second.replace(/-vape[s]?$/,''); return `/brands/${BRAND_SLUG_MAP[s]||BRAND_SLUG_MAP[second]||second}`; }
  if (first==='product') return `/product/${second}`;
  if (first==='blog') return second?`/blog/${second}`:'/blog';
  if (first==='subscriptions') return '/my-account/subscriptions';
  if (first==='contact') return '/contact';
  if (BRAND_PAGE_MAP[first]) return BRAND_PAGE_MAP[first];
  if (blogSlugSet.has(first)) return `/blog/${first}`;
  return `/${first}${second?'/'+second:''}`;
}

async function sleep(ms) { return new Promise(r=>setTimeout(r,ms)); }

async function withRetry(fn, maxRetries=5) {
  for (let i=0; i<maxRetries; i++) {
    try { return await fn(); } catch(e) {
      if ((e.code==='P2034'||e.message?.includes('write conflict')) && i<maxRetries-1) {
        await sleep(1000*(i+1)); continue;
      }
      throw e;
    }
  }
}

async function main() {
  const arts = await p.blogArticle.findMany({ select: { id:true, description:true } });
  const blogSlugs = await p.blogArticle.findMany({ select: { slug:true } });
  const blogSlugSet = new Set(blogSlugs.map(a=>a.slug));
  
  let updated=0, linksFixed=0, errors=0;
  
  for (let i=0; i<arts.length; i++) {
    const art = arts[i];
    if (!art.description) continue;
    let desc = art.description; let changed = false;
    desc = desc.replace(/href="(https?:\/\/(?:www\.)?getsmoke\.com[^"]*)"/g, (match, href) => {
      const newPath = transformUrl(href, blogSlugSet);
      if (!newPath) return match;
      const newHref = `href="${newPath}"`;
      if (newHref!==match) { linksFixed++; changed=true; }
      return newHref;
    });
    if (changed) {
      try {
        await withRetry(() => p.blogArticle.update({ where:{id:art.id}, data:{description:desc} }));
        updated++;
      } catch(e) {
        console.error('Failed article', art.id, e.message);
        errors++;
      }
    }
    // Rate limit: 200ms between writes
    if (changed) await sleep(200);
    if (i%25===0) console.log(`Progress: ${i}/${arts.length} | updated: ${updated} | fixed: ${linksFixed}`);
  }
  
  console.log('DONE. Articles updated:', updated, '| Links fixed:', linksFixed, '| Errors:', errors);
  await p.$disconnect();
}
main().catch(e=>{console.error(e); process.exit(1);});
