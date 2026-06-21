import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { newsletterConfirmTemplate } from "@/emails/newsletterTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Save to DB (upsert so duplicates don't error)
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Send confirmation to subscriber
    await sendEmail(email, "You're subscribed to GetSmoke news!", newsletterConfirmTemplate(email));

    // Notify info@getsmoke.com
    await sendEmail(
      "info@getsmoke.com",
      "New Newsletter Subscriber",
      `<p>New subscriber: <strong>${email}</strong></p>`
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
