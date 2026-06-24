import { NextRequest, NextResponse } from "next/server";

// TEMPORARY DEBUG ENDPOINT - remove after testing
export async function POST(request: NextRequest) {
  const { token, amount } = await request.json();
  
  const securityKey = process.env.NMI_SECURITY_KEY;
  if (!securityKey) return NextResponse.json({ error: "No security key" }, { status: 500 });

  const nmiData: Record<string, string> = {
    security_key: securityKey,
    payment_token: token,
    amount: amount || "1.01",
    type: "sale",
    email: "test@test.com",
  };

  const response = await fetch("https://secure.nmi.com/api/transact.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(nmiData).toString(),
  });

  const text = await response.text();
  const result: Record<string, string> = {};
  text.split("&").forEach(pair => {
    const [k, v] = pair.split("=");
    result[k] = decodeURIComponent(v || "");
  });

  return NextResponse.json({ raw: text, parsed: result });
}
