"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_KEY = "gs_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if not already accepted/declined
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-700 px-4 py-4 md:py-5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1 text-xs text-gray-300 leading-relaxed">
          <p>
            <strong className="text-white">Privacy Notice:</strong> We use cookies for site functionality and analytics.
            If you are a <strong className="text-white">California resident</strong>, under the CCPA you have the right to opt out of the sale of your personal information.
            We do not sell your data. By continuing, you consent to our{" "}
            <Link href="/privacy-policy" className="text-purple-400 underline">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="text-purple-400 underline">Terms and Conditions</Link>.
            {" "}This site is for adults <strong className="text-white">21+ only</strong>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-xs font-bold rounded-full border border-gray-600 text-gray-400 hover:border-gray-400 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-xs font-bold rounded-full text-black transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
