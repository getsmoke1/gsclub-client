import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("brands");
  revalidateTag("products");
  revalidateTag("filter-options");
  return NextResponse.json({ revalidated: true, ts: Date.now() });
}
