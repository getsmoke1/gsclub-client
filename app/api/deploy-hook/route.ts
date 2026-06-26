import { NextResponse } from "next/server";

const CF_ZONE_ID = "d59ae6ea7697d0a3c6fa3afb68a10f0d";
const CF_TOKEN = process.env.CF_PURGE_TOKEN;

export async function POST(req: Request) {
  // Verify secret to prevent abuse
  const secret = req.headers.get("x-deploy-secret");
  if (secret !== process.env.DEPLOY_HOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!CF_TOKEN) {
    return NextResponse.json({ error: "CF_PURGE_TOKEN not set" }, { status: 500 });
  }

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
  return NextResponse.json({ purged: data.success, ts: new Date().toISOString() });
}
