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
      isArchived: false,
      ...(excludeFilters.length > 0 ? { NOT: excludeFilters } : {}),
    },
    select: { id: true, name: true, stockStatus: true, images: { take: 1, select: { url: true } }, flavor: { select: { name: true } } },
    orderBy: { name: "asc" },
    take: 50,
  });

  // Deduplicate by name (keep first occurrence)
  const seen = new Set<string>();
  const uniqueProducts = products.filter(p => {
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });

  return NextResponse.json(
    { products: uniqueProducts, model },
    {
      headers: { "Cache-Control": "public, max-age=0, must-revalidate" },
    }
  );
}
