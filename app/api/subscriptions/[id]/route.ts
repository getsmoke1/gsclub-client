import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/lib/prisma";
import { getNextBillingDate, SUBSCRIPTION_FREQUENCIES, FrequencyValue } from "@/lib/nmi";

export const dynamic = "force-dynamic";

// PATCH /api/subscriptions/[id] — pause, resume, cancel, change frequency
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const sub = await prisma.subscription.findFirst({ where: { id, userId: user.id } });
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { action, frequency } = await req.json();

  let updateData: Record<string, unknown> = {};

  if (action === "pause") {
    updateData = { status: "paused" };
  } else if (action === "resume") {
    updateData = { status: "active", nextBillingDate: getNextBillingDate(sub.frequency as FrequencyValue) };
  } else if (action === "cancel") {
    updateData = { status: "cancelled" };
  } else if (action === "change_frequency" && frequency) {
    const freq = SUBSCRIPTION_FREQUENCIES.find(f => f.value === frequency);
    if (!freq) return NextResponse.json({ error: "Invalid frequency" }, { status: 400 });
    updateData = {
      frequency,
      discountPct: freq.discountPct,
      nextBillingDate: getNextBillingDate(frequency as FrequencyValue),
    };
  }

  const updated = await prisma.subscription.update({ where: { id }, data: updateData });
  return NextResponse.json({ subscription: updated });
}
