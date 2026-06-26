// Auto-purge Cloudflare cache after each Vercel deployment
// Runs as part of postbuild via package.json

const CF_ZONE_ID = "d59ae6ea7697d0a3c6fa3afb68a10f0d";
const CF_TOKEN = process.env.CF_PURGE_TOKEN;

if (!CF_TOKEN) {
  console.log("[purge-cf] CF_PURGE_TOKEN not set - skipping cache purge");
  process.exit(0);
}

try {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purge_everything: true }),
    }
  );
  const data = await res.json();
  if (data.success) {
    console.log("[purge-cf] Cloudflare cache purged successfully after deploy");
  } else {
    console.warn("[purge-cf] CF purge failed:", JSON.stringify(data.errors));
  }
} catch (e) {
  console.warn("[purge-cf] CF purge error (non-fatal):", e.message);
}
