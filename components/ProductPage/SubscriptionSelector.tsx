"use client";

import React, { useState } from "react";
import { SUBSCRIPTION_FREQUENCIES, calcSubscriptionPrice, FrequencyValue } from "@/lib/nmi";

interface Props {
  basePrice: number;
  onModeChange: (mode: "one-time" | "subscribe", frequency?: FrequencyValue, price?: number, discountPct?: number) => void;
}

export default function SubscriptionSelector({ basePrice, onModeChange }: Props) {
  const [mode, setMode] = useState<"one-time" | "subscribe">("one-time");
  const [frequency, setFrequency] = useState<FrequencyValue>("1_week");

  function handleModeChange(newMode: "one-time" | "subscribe") {
    setMode(newMode);
    if (newMode === "one-time") {
      onModeChange("one-time");
    } else {
      const freq = SUBSCRIPTION_FREQUENCIES.find(f => f.value === frequency)!;
      onModeChange("subscribe", frequency, calcSubscriptionPrice(basePrice, freq.discountPct), freq.discountPct);
    }
  }

  function handleFrequencyChange(val: FrequencyValue) {
    setFrequency(val);
    const freq = SUBSCRIPTION_FREQUENCIES.find(f => f.value === val)!;
    onModeChange("subscribe", val, calcSubscriptionPrice(basePrice, freq.discountPct), freq.discountPct);
  }

  return (
    <div className="mt-4 border border-gray-200 rounded-2xl overflow-hidden">
      {/* Description */}
      <div className="bg-gray-50 px-4 py-2.5 text-xs text-gray-600 leading-snug" style={{ padding: '12px 16px', backgroundColor: '#f9fafb', fontSize: '13px', lineHeight: '1.5' }}>
        <strong>How subscription works:</strong> Vapes will be automatically delivered at your door on your own schedule. You can cancel anytime after the second shipment.
      </div>

      {/* Toggle */}
      <div className="flex divide-x divide-gray-200" style={{ display: 'flex', borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={() => handleModeChange("one-time")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            mode === "one-time"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          style={{
            flex: 1,
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingLeft: '16px',
            paddingRight: '16px',
            fontSize: '14px',
            fontWeight: 500,
            background: mode === "one-time" ? '#000' : '#fff',
            color: mode === "one-time" ? '#fff' : '#374151',
            borderRight: '1px solid #e5e7eb',
          }}
        >
          Purchase one time
        </button>
        <button
          onClick={() => handleModeChange("subscribe")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            mode === "subscribe"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          style={{
            flex: 1,
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingLeft: '16px',
            paddingRight: '16px',
            fontSize: '14px',
            fontWeight: 500,
            background: mode === "subscribe" ? '#000' : '#fff',
            color: mode === "subscribe" ? '#fff' : '#374151',
          }}
        >
          Subscribe &amp; save up to{" "}
          <span style={{ color: mode === "subscribe" ? '#4ade80' : '#fe3500' }}>10%</span>
        </button>
      </div>

      {/* Frequency dropdown - shown only when subscribe selected */}
      {mode === "subscribe" && (
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <label className="block text-xs text-gray-500 mb-1.5 font-medium">Deliver:</label>
          <div className="relative">
            <select
              value={frequency}
              onChange={e => handleFrequencyChange(e.target.value as FrequencyValue)}
              className="w-full border-2 border-black rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none appearance-none bg-white pr-10 cursor-pointer"
            >
              {SUBSCRIPTION_FREQUENCIES.map(freq => (
                <option key={freq.value} value={freq.value}>
                  {freq.label} for ${calcSubscriptionPrice(basePrice, freq.discountPct).toFixed(2)} ({freq.discountPct}% off)
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
