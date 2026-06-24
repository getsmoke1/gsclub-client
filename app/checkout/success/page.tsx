"use client";
import Link from "next/link";
import { useEffect } from "react";
import useCart from "@/hooks/useCart";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(null);
  }, [clearCart]);

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
      </div>
    </main>
  );
}
