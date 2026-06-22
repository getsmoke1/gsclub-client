import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { StockStatus } from "@prisma/client";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "getsmoke-admin-2024";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = req.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { stockStatus } = await req.json();

  if (!Object.values(StockStatus).includes(stockStatus)) {
    return NextResponse.json({ error: "Invalid stockStatus" }, { status: 400 });
  }

  const product = await prisma.product.update({
    where: { id },
    data: { stockStatus },
    select: { id: true, name: true, stockStatus: true },
  });

  return NextResponse.json(product);
}
