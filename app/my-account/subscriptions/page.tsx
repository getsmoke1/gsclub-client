"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SUBSCRIPTION_FREQUENCIES } from "@/lib/nmi";

interface Subscription {
  id: string;
  status: string;
  frequency: string;
  discountPct: number;
  price: number;
  quantity: number;
  nextBillingDate: string;
  product: {
    name: string;
    images: { url: string }[];
  };
}

const FREQ_LABELS: Record<string, string> = {
  "1_week": "Every week",
  "2_week": "Every 2 weeks",
  "4_week": "Every 4 weeks",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/subscriptions");
    const data = await res.json();
    setSubscriptions(data.subscriptions || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAction(id: string, action: string, frequency?: string) {
    setActionLoading(id + action);
    await fetch(`/api/subscriptions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, frequency }),
    });
    await load();
    setActionLoading(null);
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">Loading subscriptions...</div>
    );
  }

  if (!subscriptions.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 text-sm">You have no active subscriptions.</p>
        <a href="/vapes" className="mt-4 inline-block text-sm font-medium underline">
          Browse products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">My Subscriptions</h1>
      <div className="space-y-4">
        {subscriptions.map(sub => {
          const img = sub.product.images[0]?.url;
          const isActive = sub.status === "active";
          const isPaused = sub.status === "paused";
          const nextDate = new Date(sub.nextBillingDate).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
          });

          return (
            <div key={sub.id} className="border border-gray-200 rounded-2xl p-4">
              <div className="flex gap-4">
                {/* Product image */}
                {img && (
                  <div className="w-16 h-16 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Image src={img} alt={sub.product.name} fill className="object-cover" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{sub.product.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {FREQ_LABELS[sub.frequency] || sub.frequency} - ${sub.price.toFixed(2)}/each ({sub.discountPct}% off)
                  </p>
                  {(isActive || isPaused) && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Next delivery: {nextDate}
                    </p>
                  )}
                  <span className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[sub.status] || ""}`}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Change frequency */}
              {(isActive || isPaused) && (
                <div className="mt-3">
                  <label className="text-xs text-gray-500 block mb-1">Change frequency:</label>
                  <select
                    defaultValue={sub.frequency}
                    onChange={e => handleAction(sub.id, "change_frequency", e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 w-full focus:outline-none"
                  >
                    {SUBSCRIPTION_FREQUENCIES.map(f => (
                      <option key={f.value} value={f.value}>{f.label} ({f.discountPct}% off)</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-3 flex gap-2">
                {isActive && (
                  <button
                    onClick={() => handleAction(sub.id, "pause")}
                    disabled={actionLoading === sub.id + "pause"}
                    className="flex-1 py-1.5 text-xs border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50"
                  >
                    Pause
                  </button>
                )}
                {isPaused && (
                  <button
                    onClick={() => handleAction(sub.id, "resume")}
                    disabled={actionLoading === sub.id + "resume"}
                    className="flex-1 py-1.5 text-xs bg-black text-white rounded-full hover:opacity-80 disabled:opacity-50"
                  >
                    Resume
                  </button>
                )}
                {(isActive || isPaused) && (
                  <button
                    onClick={() => { if (confirm("Cancel this subscription?")) handleAction(sub.id, "cancel"); }}
                    disabled={actionLoading === sub.id + "cancel"}
                    className="flex-1 py-1.5 text-xs border border-red-200 text-red-500 rounded-full hover:bg-red-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
