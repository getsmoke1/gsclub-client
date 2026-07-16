import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit store (per Edge instance)
// Key: IP, Value: { count, resetAt }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;       // max 3 checkout attempts per minute per IP
const BAN_DURATION_MS = 5 * 60 * 1000; // block for 5 minutes after limit hit

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function middleware(req: NextRequest) {
  // Only rate-limit POST /api/checkout
  if (req.nextUrl.pathname !== "/api/checkout" || req.method !== "POST") {
    return NextResponse.next();
  }

  const ip = getClientIP(req);
  const now = Date.now();

  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (entry.count >= MAX_REQUESTS) {
    // Rate limit exceeded — extend ban window on each retry
    rateLimitStore.set(ip, { count: entry.count + 1, resetAt: now + BAN_DURATION_MS });
    return new NextResponse(
      JSON.stringify({
        error: "Too many payment attempts. Please wait a few minutes and try again.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "300",
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/checkout"],
};
