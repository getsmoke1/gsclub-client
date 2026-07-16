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
  const [selectedFlavor, setSelectedFlavor] = useState<(typeof FLAVORS)[0] | null>(null);
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
    setSelectedFlavorIds((prev) => {
      const updated = [...prev];
      updated[0] = flavor.id;
      return updated;
    });
  };

  const heroSrc = selectedFlavor
    ? IMAGE_BASE + selectedFlavor.img
    : "/hqd-go-hero.jpg";

  const handlePackChange = (option: PackOption) => {
    setPackOption(option);
    // Reset flavor IDs keeping first pre-filled
    setSelectedFlavorIds((prev) => {
      const updated = Array(10).fill("");
      updated[0] = prev[0] || selectedFlavor?.id || "";
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
      // Use dropdown selection (slot 0); fallback to flavor scroll selection
      const id = selectedFlavorIds[0] || selectedFlavor?.id;
      if (!id) return;
      await addItem(email, { id, quantity: qty });
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
              src={heroSrc}
              alt={selectedFlavor ? `HQD GO - ${selectedFlavor.name}` : "HQD GO 35,000 Puffs Disposable Vape"}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Flavor chips horizontal scroll */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {FLAVORS.map((flavor) => {
              const isSelected = selectedFlavor?.id === flavor.id;
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

                    {/* Flavor dropdowns - shown inline when selected (including single) */}
                    {isSelected && (
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

      {/* SEO Description */}
      <section className="mt-12 border-t border-gray-100 pt-8">
        <h2 className="text-lg md:text-xl font-bold font-unbounded mb-4">
          About HQD GO 35,000 Puffs Disposable Vape
        </h2>
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          <p>
            The <strong>HQD GO 35,000 puffs disposable vape</strong> is one of the most advanced and long-lasting disposable devices on the market. Designed for vapers who want powerful performance without the hassle of refilling or recharging frequently, the HQD GO delivers up to 35,000 puffs per device with consistent vapor quality from the first puff to the last.
          </p>
          <p>
            Powered by a high-capacity rechargeable battery and a large e-liquid reservoir, the <strong>HQD GO disposable</strong> features a smooth draw-activated mechanism - no buttons required. Each device is pre-filled with <strong>50mg (5%) nicotine salt</strong> e-liquid for a satisfying throat hit and rapid nicotine delivery, making it ideal for smokers switching to vaping or experienced vapers who prefer strong nicotine.
          </p>
          <p>
            Available in 14 carefully crafted flavors - from refreshing <strong>Black Ice</strong> and tropical <strong>Mango Tropico</strong> to smooth <strong>Virginia Tobacco</strong> and sweet <strong>Berry&apos;d Alive</strong> - the HQD GO offers something for every taste. Each flavor is developed to deliver a rich, consistent taste profile throughout the life of the device.
          </p>
          <p>
            GetSmoke ships the <strong>HQD GO vape</strong> across the entire United States with adult signature required delivery. Orders over $79 qualify for free shipping. All products are sourced from authorized US distributors and comply with applicable regulations for the sale of nicotine products to adults 21 and older.
          </p>
        </div>
      </section>

      {/* Specs table */}
      <section className="mt-8">
        <h2 className="text-base font-bold font-unbounded mb-3">HQD GO Specifications</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ["Puff Count", "Up to 35,000 puffs"],
            ["Nicotine Strength", "50mg (5%) Nicotine Salt"],
            ["Battery", "Rechargeable (USB-C)"],
            ["E-Liquid Capacity", "Pre-filled, large reservoir"],
            ["Operation", "Draw-activated (no button)"],
            ["Available Flavors", "14 flavors"],
            ["Brand", "HQD Tech"],
            ["Age Requirement", "21+ only"],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col bg-gray-50 rounded-xl p-3">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="font-bold text-black">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-lg md:text-xl font-bold font-unbounded mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How many puffs does the HQD GO have?",
              a: "The HQD GO delivers up to 35,000 puffs per device. This is one of the highest puff counts available in a disposable vape, making it an excellent value for long-term use.",
            },
            {
              q: "What nicotine strength is in the HQD GO?",
              a: "The HQD GO uses 50mg (5%) nicotine salt. Nicotine salts provide a smoother throat hit at higher concentrations compared to freebase nicotine, making the HQD GO suitable for users who need a stronger nicotine experience.",
            },
            {
              q: "How many flavors does the HQD GO come in?",
              a: "The HQD GO is available in 14 flavors: Berry'd Alive, Black Ice, Breezy Nana, Dubai Chocolate, Fresh AF, Kiwi Splash, Lush Ice, Mango Tropico, Menthol God, Miami Breeze, Purple Drank, Razz Quake, Strawmelon, and Virginia Tobacco.",
            },
            {
              q: "Can I buy the HQD GO in a pack?",
              a: "Yes. GetSmoke offers the HQD GO in Single ($34.99), Pack of 3 ($33.24/each), Pack of 5 ($32.19/each), and Pack of 10 ($30.79/each). Each device in a pack can be a different flavor, so you can mix and match to find your favorites.",
            },
            {
              q: "Does the HQD GO have a rechargeable battery?",
              a: "Yes, the HQD GO features a rechargeable battery via USB-C. This ensures that you use all the e-liquid in the device before it runs out of power - extending the lifespan and value of each unit.",
            },
            {
              q: "What is the shipping policy for HQD GO?",
              a: "GetSmoke ships HQD GO devices across the United States. Free shipping is available on orders over $79. In compliance with the PACT Act and state regulations, adult signature is required upon delivery. We do not ship to states or localities where the sale of nicotine products is prohibited.",
            },
            {
              q: "Is the HQD GO a good vape for beginners?",
              a: "The HQD GO is ideal for vapers who are comfortable with high-nicotine products. If you are new to vaping or transitioning from cigarettes, the 50mg nicotine salt strength delivers a satisfying experience similar to cigarettes. The draw-activated design (no buttons) makes it easy to use right out of the box.",
            },
            {
              q: "Where can I buy HQD GO disposable vapes online?",
              a: "You can buy the HQD GO disposable vape directly at GetSmoke. We offer all 14 flavors in stock with fast delivery across the USA. Orders are shipped from our US warehouse with adult signature required.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="border border-gray-200 rounded-2xl overflow-hidden group">
              <summary className="cursor-pointer px-5 py-4 font-bold text-sm flex justify-between items-center list-none">
                {q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg leading-none ml-2 shrink-0">&#8964;</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
