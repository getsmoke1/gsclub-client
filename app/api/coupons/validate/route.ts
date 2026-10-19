import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: "Code is required" }, { status: 400 });

    const coupon = await prisma.coupon.findFirst({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon) return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    if (!coupon.isActive) return NextResponse.json({ error: "This coupon has been deactivated" }, { status: 400 });

    // Check max usages
    if (coupon.maxUsages !== null && coupon.maxUsages !== undefined && coupon.usageCount >= coupon.maxUsages) {
      return NextResponse.json({ error: "This coupon has reached its usage limit" }, { status: 400 });
    }

    // Check expiry
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ error: "This coupon has expired" }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountAmount: coupon.discountAmount,
      couponId: coupon.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
