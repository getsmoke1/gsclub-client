import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SECRET = process.env.WARMUP_SECRET ?? "";

const PAGES = [
  "/",
  "/vapes",
  "/new-in-stock",
  "/brands/geek-bar",
  "/brands/hqd",
  "/brands/lost-mary",
  "/brands/raz",
  "/brands/viho",
  "/brands/fume",
  "/brands/foger",
  "/brands/juicy-bar",
  "/models/geek-bar-pulse-2-25000-puffs",
  "/models/geek-bar-pulse-15000-puffs",
  "/models/geek-bar-pulse-x-25000-puffs",
  "/models/hqd-cuvie-glaze-15000-puffs",
  "/models/hqd-cuvie-bar-7000-puffs",
  "/models/hqd-cuvie-slick-6000-puffs",
  "/models/hqd-everest-25000-puffs",
  "/models/lost-mary-turbo-35000-puffs",
  "/models/lost-mary-mo20000-20000-puffs",
  "/models/raz-dc25000-25000-puffs",
  "/models/raz-vue-50k-50000-puffs",
  "/models/viho-supercharge-20000-puffs",
  "/models/viho-supercharge-pro-20000-puffs",
  "/models/fume-pro-30000-puffs",
  "/models/fume-hookah-20000-puffs",
  "/models/foger-bit-35000-puffs",
  "/models/juice-bar-jb25000-25000-puffs",
  "/models/beri-crush-50000-puffs",
  "/models/ebcreate-bc-pro-40000-puffs",
  "/models/fifty-bar-black-series-20000-puffs",
  "/models/adjust-mycool-40000-puffs",
  "/models/oxbar-astro-maze-50000-puffs",
  "/models/lost-mary-nera-fullview-70000-puffs",
  "/models/x-posed-35k-35000-puffs",
];

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-warmup-secret") ?? "";
  if (SECRET && secret !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const results: { page: string; status: string; ttfb: number }[] = [];

  await Promise.allSettled(
    PAGES.map(async (page) => {
      const start = Date.now();
      try {
        const res = await fetch(`${base}${page}`, {
          headers: { "x-warmup": "1" },
          signal: AbortSignal.timeout(8000),
        });
        results.push({ page, status: res.ok ? "ok" : `error-${res.status}`, ttfb: Date.now() - start });
      } catch {
        results.push({ page, status: "timeout", ttfb: Date.now() - start });
      }
    })
  );

  const ok = results.filter((r) => r.status === "ok").length;
  return NextResponse.json({ warmed: ok, total: results.length, results });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
