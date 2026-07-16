import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const token = formData.get("token") as string;
    const file = formData.get("file") as File | null;
    const consent = formData.get("consent") === "true";

    if (!token || !file) {
      return NextResponse.json({ error: "Missing token or file." }, { status: 400 });
    }

    const record = await prisma.ageVerification.findUnique({ where: { token } });
    if (!record) {
      return NextResponse.json({ error: "Invalid verification link." }, { status: 404 });
    }
    if (record.status !== "pending") {
      return NextResponse.json({ error: "Already submitted." }, { status: 400 });
    }

    // Convert file to base64 for storage
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type || "image/jpeg";
    const imageDataUrl = `data:${mimeType};base64,${base64}`;

    await prisma.ageVerification.update({
      where: { token },
      data: {
        idImageKey: imageDataUrl,
        consentGiven: consent,
        status: "pending", // remains pending until admin verifies
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[AGE_VERIFY_UPLOAD]", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
