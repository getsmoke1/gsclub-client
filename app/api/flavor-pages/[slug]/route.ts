import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const page = await prisma.flavorBuyPage.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("FlavorBuyPage fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
