import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/lib/prisma";
import {
  getNextBillingDate,
  calcSubscriptionPrice,
  SUBSCRIPTION_FREQUENCIES,
  FrequencyValue,
} from "@/lib/nmi";

export const dynamic = "force-dynamic";

// GET /api/subscriptions — list user's subscriptions
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
    include: { product: { include: { images: { take: 1 } } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ subscriptions });
}

// POST /api/subscriptions — create a new subscription
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { productId, frequency, quantity = 1 } = await req.json();

  if (!productId || !frequency) {
    return NextResponse.json({ error: "productId and frequency are required" }, { status: 400 });
  }

  const freq = SUBSCRIPTION_FREQUENCIES.find(f => f.value === frequency);
  if (!freq) return NextResponse.json({ error: "Invalid frequency" }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const price = calcSubscriptionPrice(product.currentPrice, freq.discountPct);
  const nextBillingDate = getNextBillingDate(frequency as FrequencyValue);

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      productId,
      frequency,
      discountPct: freq.discountPct,
      price,
      quantity,
      status: "active",
      nextBillingDate,
    },
  });

  return NextResponse.json({ subscription }, { status: 201 });
}
