import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/verify-turnstile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, subject, inquiry, turnstileToken } = body;
    if (!email || !subject || !inquiry) {
      return NextResponse.json(
        { error: "Email, subject, and inquiry are required" },
        { status: 400 }
      );
    }
    const valid = await verifyTurnstile(turnstileToken);
    if (!valid) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        email,
        subject,
        inquiry,
      },
    });

    // Forward to info@getsmoke.com
    await sendEmail(
      "info@getsmoke.com",
      `Contact Form: ${subject}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#222;">New Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border:1px solid #eee;margin:16px 0;" />
        <p style="white-space:pre-wrap;color:#333;">${inquiry}</p>
        <hr style="border:1px solid #eee;margin:16px 0;" />
        <p style="font-size:12px;color:#888;">GetSmoke Contact Form - ${new Date().toLocaleString()}</p>
      </div>`
    );

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    return NextResponse.json(
      { error: "Failed to create enquiry" },
      { status: 500 }
    );
  }
}
