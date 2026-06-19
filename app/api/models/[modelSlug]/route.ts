import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getModelBySlug } from "@/lib/models-config";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ modelSlug: string }> }
) {
  const { modelSlug } = await params;
  const model = getModelBySlug(modelSlug);
  if (!model) return NextResponse.json({ error: "Model not found" }, { status: 404 });

  const excludeFilters = (model.excludeQueries || []).map((q) => ({
    name: { contains: q, mode: "insensitive" as const },
  }));

  const products = await prisma.product.findMany({
    where: {
      name: { contains: model.dbSearchQuery, mode: "insensitive" },
      ...(excludeFilters.length > 0 ? { NOT: excludeFilters } : {}),
    },
    include: { images: { take: 1 }, flavor: true },
    orderBy: { name: "asc" },
    take: 50,
  });

  return NextResponse.json(
    { products, model },
    {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    }
  );
}
