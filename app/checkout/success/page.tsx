"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useCart from "@/hooks/useCart";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function SuccessPage() {
  const { clearCart } = useCart();
  const [ageToken, setAgeToken] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clearCart(null);

    // Fire GA4 purchase event
    try {
      const raw = sessionStorage.getItem("gs_order");
      if (raw && typeof window.gtag === "function") {
        const order = JSON.parse(raw);
        window.gtag("event", "purchase", {
          transaction_id: order.transaction_id,
          value: order.value,
          currency: order.currency || "USD",
          items: order.items,
        });
        sessionStorage.removeItem("gs_order");
      }
    } catch { /* ignore */ }

    // Check for age verification token
    try {
      const token = sessionStorage.getItem("gs_age_token");
      if (token) setAgeToken(token);
    } catch { /* ignore */ }
  }, [clearCart]);

  async function handleIdSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !ageToken) return;
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("token", ageToken);
      formData.append("file", file);
      formData.append("consent", consent ? "true" : "false");
      const res = await fetch("/api/age-verify/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `Upload failed (${res.status})`);
      }
      setUploadSuccess(true);
      try { sessionStorage.removeItem("gs_age_token"); } catch { /* ignore */ }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Checkmark icon */}
        <div className="flex items-center justify-center mb-6">
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 20L17 27L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-gray-500 text-base mb-2">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <p className="text-gray-500 text-base mb-8">
          Your order is now being processed and will be shipped soon. You will receive a confirmation email shortly.
        </p>

        <div style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 32,
          textAlign: "left",
        }}>
          <p className="text-sm font-semibold text-gray-700 mb-1">What happens next?</p>
          <ul className="text-sm text-gray-500 space-y-1 mt-2">
            <li>✦ We will prepare your order within 1-2 business days</li>
            <li>✦ You will receive a tracking number once shipped</li>
            <li>✦ Estimated delivery: 3-7 business days</li>
            <li>✦ Questions? Contact us at <a href="mailto:info@getsmoke.com" className="text-red-500 underline">info@getsmoke.com</a></li>
          </ul>
        </div>

        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#FE3500",
            color: "#fff",
            borderRadius: 8,
            padding: "14px 40px",
            fontWeight: 600,
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </Link>

        {/* Age Verification Upload Section */}
        {ageToken && (
          <div style={{
            marginTop: 40,
            background: "#fff8f6",
            border: "1px solid #fcd5cc",
            borderRadius: 12,
            padding: "24px",
            textAlign: "left",
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#1a1a1a" }}>
              One More Step: Age Verification
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
              Please upload a photo of your government-issued ID to complete your order. Your order will be shipped once verified.
            </p>

            {uploadSuccess ? (
              <p style={{ color: "#16a34a", fontWeight: 600, fontSize: 15 }}>
                ✓ ID submitted successfully. We will process your verification within 24 hours.
              </p>
            ) : (
              <form onSubmit={handleIdSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Upload ID (image or PDF)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    style={{
                      display: "block",
                      width: "100%",
                      fontSize: 14,
                      color: "#374151",
                      cursor: "pointer",
                    }}
                  />
                </div>

                <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <input
                    type="checkbox"
                    id="age-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    style={{ marginTop: 3, flexShrink: 0, cursor: "pointer" }}
                  />
                  <label htmlFor="age-consent" style={{ fontSize: 14, color: "#374151", cursor: "pointer" }}>
                    I confirm I am 21 years of age or older
                  </label>
                </div>

                {uploadError && (
                  <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{uploadError}</p>
                )}

                <button
                  type="submit"
                  disabled={uploading || !file || !consent}
                  style={{
                    background: uploading || !file || !consent ? "#f87171" : "#FE3500",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "12px 32px",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: uploading || !file || !consent ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {uploading ? "Uploading..." : "Submit ID"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
