import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store (per Edge instance)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string, windowMs: number, max: number, banMs: number): boolean {
  const now = Date.now();
  const key = ip;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }
  if (entry.count >= max) {
    rateLimitStore.set(key, { count: entry.count + 1, resetAt: now + banMs });
    return false; // blocked
  }
  entry.count += 1;
  return true; // allowed
}

function tooManyResponse(retryAfter = 60): NextResponse {
  return new NextResponse(
    JSON.stringify({ error: "Too many requests. Please slow down." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    }
  );
}

// Known bot/spam referrers to block
const BLOCKED_REFERRERS = [
  "trafficheap.cc",
  "trafficheap.net",
  "semalt.com",
  "buttons-for-website.com",
  "blackhatworth.com",
];

export function middleware(req: NextRequest) {
  const ip = getClientIP(req);
  const path = req.nextUrl.pathname;
  const method = req.method;

  // Block known bot referrers
  const referer = req.headers.get("referer") || "";
  if (BLOCKED_REFERRERS.some((bot) => referer.includes(bot))) {
    return new NextResponse(null, { status: 403 });
  }

  // 1. Checkout: 3 attempts/min, ban 5 min
  if (path === "/api/checkout" && method === "POST") {
    if (!rateLimit(ip + ":checkout", 60_000, 3, 300_000)) {
      return tooManyResponse(300);
    }
  }

  // 2. Products API: prevent DB dumping — max 30 req/min per IP
  if (path.startsWith("/api/products")) {
    if (!rateLimit(ip + ":products", 60_000, 30, 60_000)) {
      return tooManyResponse(60);
    }
  }

  // 3. Orders API: max 20 req/min (admin/user fetching)
  if (path.startsWith("/api/orders")) {
    if (!rateLimit(ip + ":orders", 60_000, 20, 120_000)) {
      return tooManyResponse(120);
    }
  }

  // 4. Blog API: max 30 req/min
  if (path.startsWith("/api/blog")) {
    if (!rateLimit(ip + ":blog", 60_000, 30, 60_000)) {
      return tooManyResponse(60);
    }
  }

  // 5. Auth/account endpoints: strict — 10 req/min
  if (path.startsWith("/api/auth") || path.startsWith("/api/user")) {
    if (!rateLimit(ip + ":auth", 60_000, 10, 300_000)) {
      return tooManyResponse(300);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/checkout",
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/blog/:path*",
    "/api/auth/:path*",
    "/api/user/:path*",
  ],
};
