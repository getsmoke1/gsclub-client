import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AgeVerifyForm } from "./AgeVerifyForm";
export const dynamic = "force-dynamic";

export default async function AgeVerifyPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const record = await prisma.ageVerification.findUnique({
    where: { token },
  });

  if (!record) return notFound();

  const alreadyDone = record.status !== "pending";

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", maxWidth: 520, width: "100%", boxShadow: "0 2px 16px rgba(0,0,0,0.10)" }}>

        {/* Header */}
        <div style={{ background: "#0d1117", padding: "22px 32px", textAlign: "center" }}>
          <img src="/images/logo.png" alt="GetSmoke" style={{ height: 36, filter: "brightness(0) invert(1)" }} />
        </div>
        <div style={{ background: "#f5c518", height: 4 }} />

        {/* Body */}
        <div style={{ padding: "32px 32px 24px" }}>
          {alreadyDone ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48 }}>{record.status === "verified" ? "✅" : "📋"}</div>
              <h2 style={{ margin: "12px 0 8px", fontSize: 20, fontWeight: 700 }}>
                {record.status === "verified" ? "Already Verified!" : "Submission Received"}
              </h2>
              <p style={{ color: "#555", lineHeight: 1.6 }}>
                {record.status === "verified"
                  ? "Your age has been verified. Thank you!"
                  : "We already received your submission and are reviewing it."}
              </p>
            </div>
          ) : (
            <>
              <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#111" }}>Age Verification</h1>
              <p style={{ margin: "0 0 4px", fontSize: 14, color: "#666" }}>Order <strong>#{record.orderNumber}</strong> - {record.name}</p>
              <p style={{ margin: "0 0 24px", fontSize: 14, color: "#888", lineHeight: 1.6 }}>
                Please upload a photo of yourself holding your government-issued ID (driver&apos;s license or state ID). Your face and the ID must both be clearly visible.
              </p>
              <AgeVerifyForm token={token} />
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ background: "#f9f9f9", borderTop: "1px solid #eee", padding: "16px 32px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>
            Questions? <a href="mailto:info@getsmoke.com" style={{ color: "#555" }}>info@getsmoke.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
