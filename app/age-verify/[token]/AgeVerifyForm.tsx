"use client";
import { useState, useRef } from "react";

export function AgeVerifyForm({ token }: { token: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    if (f.size > 10 * 1024 * 1024) { setError("File too large. Max 10MB."); return; }
    setFile(f);
    setError("");
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please select a photo."); return; }
    if (!consent) { setError("Please agree to the privacy policy."); return; }

    setLoading(true);
    setError("");

    const form = new FormData();
    form.append("file", file);
    form.append("token", token);
    form.append("consent", "true");

    const res = await fetch("/api/age-verify/upload", { method: "POST", body: form });
    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
    } else {
      setError(data.error || "Upload failed. Please try again.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: 52 }}>✅</div>
        <h2 style={{ margin: "12px 0 8px", fontSize: 20, fontWeight: 700, color: "#111" }}>Thank You!</h2>
        <p style={{ color: "#555", lineHeight: 1.6, fontSize: 15 }}>
          Your ID has been submitted successfully. We will review it and ship your order shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        style={{
          border: "2px dashed #ddd", borderRadius: 10, padding: preview ? 8 : "32px 16px",
          textAlign: "center", cursor: "pointer", marginBottom: 16,
          background: "#fafafa", transition: "border-color 0.2s",
        }}
      >
        {preview ? (
          <img src={preview} alt="preview" style={{ maxHeight: 200, maxWidth: "100%", borderRadius: 8 }} />
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
            <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#333" }}>Click or drag to upload your selfie with ID</p>
            <p style={{ margin: 0, fontSize: 12, color: "#999" }}>JPG, PNG or HEIC - max 10MB</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {preview && (
        <button
          type="button"
          onClick={() => { setFile(null); setPreview(null); }}
          style={{ fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer", marginBottom: 16, display: "block" }}
        >
          Remove photo
        </button>
      )}

      {/* Consent */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20, cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, cursor: "pointer" }}
        />
        <span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>
          I agree that GetSmoke (COSMOPROJECT LLC) may collect and process my personal identification data solely for age verification purposes, in accordance with the{" "}
          <a href="/privacy-policy" target="_blank" style={{ color: "#111", fontWeight: 600 }}>Privacy Policy</a>.
          This data will not be shared with third parties.
        </span>
      </label>

      {error && (
        <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12, background: "#fef2f2", padding: "8px 12px", borderRadius: 6 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%", padding: "14px", background: loading ? "#ccc" : "#f5c518",
          color: "#111", border: "none", borderRadius: 8, fontSize: 15,
          fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Uploading..." : "Submit ID for Verification"}
      </button>
    </form>
  );
}
