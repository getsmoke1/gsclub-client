"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";

const IMAGE_BASE =
  "https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev/wp-content/uploads/2025/11/";

const FLAVORS = [
  {
    id: "6a2740b29dde15843c7ba08f",
    slug: "berry-d-alive-hqd-go",
    name: "Berry'd Alive",
    flavor: "Mix Berries",
    img: "HQD-Go-Berry-d-Alive.jpg",
  },
  {
    id: "6a2740a19dde15843c7ba07a",
    slug: "black-ice-hqd-go",
    name: "Black Ice",
    flavor: "Black Ice",
    img: "HQD-Go-Black-Ice.jpg",
  },
  {
    id: "6a27409f9dde15843c7ba078",
    slug: "breezy-nana-hqd-go",
    name: "Breezy Nana",
    flavor: "Banana",
    img: "HQD-Go-Breezy-Nana.jpg",
  },
  {
    id: "6a2740ad9dde15843c7ba089",
    slug: "dubai-chocolate-hqd-go",
    name: "Dubai Chocolate",
    flavor: "Chocolate",
    img: "HQD-Go-Dubai-Chocolate.jpg",
  },
  {
    id: "6a27409d9dde15843c7ba076",
    slug: "fresh-af-hqd-go",
    name: "Fresh AF",
    flavor: "Mint",
    img: "HQD-Go-Fresh-Af.jpg",
  },
  {
    id: "6a2740ab9dde15843c7ba087",
    slug: "kiwi-splash-hqd-go",
    name: "Kiwi Splash",
    flavor: "Kiwi",
    img: "HQD-Go-Kiwi-Splash.jpg",
  },
  {
    id: "6a2740b59dde15843c7ba093",
    slug: "lush-ice-hqd-go",
    name: "Lush Ice",
    flavor: "Lush Ice",
    img: "HQD-Go-Lush-Ice.jpg",
  },
  {
    id: "6a2740af9dde15843c7ba08c",
    slug: "mango-tropico-hqd-go",
    name: "Mango Tropico",
    flavor: "Mango",
    img: "HQD-Go-Mango-Tropico.jpg",
  },
  {
    id: "6a2740b39dde15843c7ba091",
    slug: "menthol-god-hqd-go",
    name: "Menthol God",
    flavor: "Menthol",
    img: "HQD-Go-Menthol-God.jpg",
  },
  {
    id: "6a2740a79dde15843c7ba082",
    slug: "miami-breeze-hqd-go",
    name: "Miami Breeze",
    flavor: "Spearmint",
    img: "HQD-Go-Miami-Breeze.jpg",
  },
  {
    id: "6a2740b79dde15843c7ba095",
    slug: "purple-drank-hqd-go",
    name: "Purple Drank",
    flavor: "Grape",
    img: "HQD-Go-Purple-Drank.jpg",
  },
  {
    id: "6a2740a99dde15843c7ba084",
    slug: "razz-quake-hqd-go",
    name: "Razz Quake",
    flavor: "Blue Raspberry",
    img: "HQD-Go-Razz-Quake.jpg",
  },
  {
    id: "6a2740a39dde15843c7ba07d",
    slug: "strawmelon-hqd-go",
    name: "Strawmelon",
    flavor: "Strawberry Watermelon",
    img: "HQD-Go-Strawmelon.jpg",
  },
  {
    id: "6a2740a59dde15843c7ba080",
    slug: "virginia-tobacco-hqd-go",
    name: "Virginia Tobacco",
    flavor: "Tobacco",
    img: "HQD-Go-Virginia-Tobacco.jpg",
  },
];

type PackOption = "single" | "pack3" | "pack5" | "pack10";

const PACK_CONFIG: Record<
  PackOption,
  { label: string; price: number; count: number; display: string }
> = {
  single: { label: "Single", price: 34.99, count: 1, display: "$34.99" },
  pack3: {
    label: "Pack of 3",
    price: 33.24,
    count: 3,
    display: "$33.24/each",
  },
  pack5: {
    label: "Pack of 5",
    price: 32.19,
    count: 5,
    display: "$32.19/each",
  },
  pack10: {
    label: "Pack of 10",
    price: 30.79,
    count: 10,
    display: "$30.79/each",
  },
};

export default function HqdGoPage() {
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [packOption, setPackOption] = useState<PackOption>("single");
  const [qty, setQty] = useState(1);
  const [selectedFlavorIds, setSelectedFlavorIds] = useState<string[]>(
    Array(10).fill("")
  );

  const { addItem, loading } = useCart();
  const { data: session } = useSession();
  const email = session?.user?.email ?? null;

  const pack = PACK_CONFIG[packOption];

  const totalPrice =
    packOption === "single"
      ? pack.price * qty
      : pack.price * pack.count;

  const handleFlavorSelect = (flavor: (typeof FLAVORS)[0]) => {
    setSelectedFlavor(flavor);
    // Pre-fill first dropdown with selected flavor
    setSelectedFlavorIds((prev) => {
      const updated = [...prev];
      updated[0] = flavor.id;
      return updated;
    });
  };

  const handlePackChange = (option: PackOption) => {
    setPackOption(option);
    // Reset flavor IDs keeping first pre-filled
    setSelectedFlavorIds((prev) => {
      const updated = Array(10).fill("");
      updated[0] = prev[0] || selectedFlavor.id;
      return updated;
    });
  };

  const handleFlavorDropdownChange = (index: number, value: string) => {
    setSelectedFlavorIds((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddToCart = async () => {
    if (packOption === "single") {
      await addItem(email, { id: selectedFlavor.id, quantity: qty });
    } else {
      for (const flavorId of selectedFlavorIds.slice(0, pack.count)) {
        if (flavorId) await addItem(email, { id: flavorId, quantity: 1 });
      }
    }
  };

  const packKeys: PackOption[] = ["single", "pack3", "pack5", "pack10"];

  return (
    <main className="font-unbounded pb-16 w-11/12 mx-auto">
      {/* Breadcrumb */}
      <nav className="pt-6 pb-4 text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/brands/hqd" className="hover:underline">
          HQD
        </Link>
        <span>/</span>
        <span className="text-gray-800">HQD GO</span>
      </nav>

      {/* Main layout: stack on mobile, side-by-side on md */}
      <div className="md:flex md:gap-10 md:items-start">
        {/* Section 1: Image + Flavor Scroll */}
        <div className="md:w-1/2 md:sticky md:top-6">
          {/* Hero image */}
          <div className="relative w-full rounded-3xl overflow-hidden bg-gray-50" style={{ paddingTop: "100%" }}>
            <Image
              src={IMAGE_BASE + selectedFlavor.img}
              alt={`HQD GO - ${selectedFlavor.name}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Flavor chips horizontal scroll */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {FLAVORS.map((flavor) => {
              const isSelected = flavor.id === selectedFlavor.id;
              return (
                <button
                  key={flavor.id}
                  onClick={() => handleFlavorSelect(flavor)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-xl border-2 transition-colors ${
                    isSelected ? "border-black" : "border-transparent"
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={IMAGE_BASE + flavor.img}
                      alt={flavor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[9px] text-center leading-tight max-w-[44px] text-gray-700">
                    {flavor.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2 + 3 + 4: Info, Options, Purchase */}
        <div className="mt-6 md:mt-0 md:w-1/2">
          {/* Section 2: Info */}
          <div>
            <Link
              href="/brands/hqd"
              className="text-xs text-gray-500 hover:underline uppercase tracking-wide"
            >
              HQD
            </Link>
            <h1 className="font-unbounded font-bold text-2xl mt-1">HQD GO</h1>
            <p className="text-sm text-gray-500 mt-1">35,000 Puffs - Disposable Vape</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-base">★★★★½</span>
              <span className="text-xs text-gray-500">17 reviews</span>
            </div>

            {/* Price */}
            <p className="text-xl font-bold mt-2">${totalPrice.toFixed(2)}</p>
          </div>

          {/* Section 3: Pack options */}
          <div className="mt-6">
            <p className="font-bold text-xs uppercase tracking-wider mb-3">
              Choose Your Option
            </p>

            <div className="flex flex-col gap-2">
              {packKeys.map((key) => {
                const cfg = PACK_CONFIG[key];
                const isSelected = packOption === key;
                return (
                  <div key={key}>
                    {/* Radio row */}
                    <button
                      onClick={() => handlePackChange(key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full border-2 transition-colors ${
                        isSelected
                          ? "border-black bg-gray-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            isSelected
                              ? "border-black bg-black"
                              : "border-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">{cfg.label}</span>
                      </div>
                      <span className="text-sm font-bold">{cfg.display}</span>
                    </button>

                    {/* Flavor dropdowns - shown inline when selected */}
                    {isSelected && key !== "single" && (
                      <div
                        className={`mt-2 px-2 flex flex-col gap-2 ${
                          key === "pack10" ? "md:grid md:grid-cols-2 md:gap-x-3" : ""
                        }`}
                      >
                        {Array.from({ length: cfg.count }).map((_, i) => (
                          <select
                            key={i}
                            value={selectedFlavorIds[i] || ""}
                            onChange={(e) =>
                              handleFlavorDropdownChange(i, e.target.value)
                            }
                            className="rounded-full border border-gray-300 w-full py-2 px-4 text-sm bg-white appearance-none"
                          >
                            <option value="">Choose flavor</option>
                            {FLAVORS.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Purchase */}
          <div className="mt-6">
            <p className="font-bold text-lg">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {packOption === "single" && (
                <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 text-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-bold min-w-[2.5rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="px-4 py-2 text-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="flex-1 py-3 px-6 rounded-full text-white font-bold text-sm disabled:opacity-60 transition-opacity"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)",
                }}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            <p className="text-[10px] text-gray-400 mt-2 text-center">
              21+ only - Nicotine is addictive
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
