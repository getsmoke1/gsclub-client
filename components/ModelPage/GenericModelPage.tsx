"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";
import { ModelConfig } from "@/lib/models-config";

type PackOption = "single" | "pack3" | "pack5" | "pack10";

interface ApiProduct {
  id: string;
  name: string;
  images: { url: string }[];
  flavor: { name: string } | null;
}

interface ApiResponse {
  products: ApiProduct[];
  model: ModelConfig;
}

function buildPackConfig(price: number) {
  return {
    single: { label: "Single", price, count: 1, display: `$${price.toFixed(2)}` },
    pack3: {
      label: "Pack of 3",
      price: +(price * 0.95).toFixed(2),
      count: 3,
      display: `$${(price * 0.95).toFixed(2)}/each`,
    },
    pack5: {
      label: "Pack of 5",
      price: +(price * 0.92).toFixed(2),
      count: 5,
      display: `$${(price * 0.92).toFixed(2)}/each`,
    },
    pack10: {
      label: "Pack of 10",
      price: +(price * 0.88).toFixed(2),
      count: 10,
      display: `$${(price * 0.88).toFixed(2)}/each`,
    },
  };
}

function getFlavorName(product: ApiProduct): string {
  if (product.flavor?.name) return product.flavor.name;
  // Try to extract flavor name from product name by removing common model prefixes
  return product.name;
}

function generateDescription(model: ModelConfig, flavorCount: number): string[] {
  const nicotineNote =
    model.nicotine === "0% Nicotine Free"
      ? "nicotine-free formula"
      : `${model.nicotine} nicotine salt`;

  return [
    `The ${model.name} disposable vape is designed for vapers who demand long-lasting performance and rich flavor. With up to ${model.puffs} puffs per device, it delivers consistent vapor quality from the very first draw to the last, making it one of the most reliable options in its class.`,
    `Each ${model.shortName} device is pre-filled with a ${nicotineNote} e-liquid, powered by a rechargeable USB-C battery that ensures you never waste any e-liquid. The draw-activated design requires no buttons - simply inhale to enjoy a smooth, satisfying vaping experience.`,
    `Available in ${flavorCount > 0 ? flavorCount : "multiple"} carefully crafted flavors, the ${model.shortName} offers something for every palate. Whether you prefer refreshing menthol, sweet fruity blends, or classic tobacco profiles, there is a flavor that matches your taste. Each variant delivers a consistent, true-to-name flavor profile throughout the life of the device.`,
    `GetSmoke ships the ${model.name} disposable vape across the entire United States with adult signature required delivery. Orders over $79 qualify for free shipping, and all products are sourced from authorized US distributors. We are committed to compliance with all applicable regulations for the sale of nicotine products to adults 21 and older.`,
  ];
}

function generateFaq(model: ModelConfig, flavorCount: number, price: number) {
  const pack3Price = (price * 0.95 * 3).toFixed(2);
  const pack5Price = (price * 0.92 * 5).toFixed(2);
  const pack10Price = (price * 0.88 * 10).toFixed(2);
  const nicotineNote =
    model.nicotine === "0% Nicotine Free"
      ? "This device contains no nicotine - it is completely nicotine-free, making it ideal for users who enjoy vaping without any nicotine dependency."
      : `The ${model.shortName} uses ${model.nicotine} nicotine salt. Nicotine salts deliver a smooth throat hit at higher concentrations compared to freebase nicotine, making this device suitable for users who need a satisfying nicotine experience.`;

  return [
    {
      q: `How many puffs does the ${model.shortName} have?`,
      a: `The ${model.name} delivers up to ${model.puffs} puffs per device. This makes it an excellent long-lasting option for daily vapers who want to go longer between device replacements.`,
    },
    {
      q: `What nicotine strength is in the ${model.shortName}?`,
      a: nicotineNote,
    },
    {
      q: `How many flavors does the ${model.shortName} come in?`,
      a: `The ${model.shortName} is available in ${flavorCount > 0 ? flavorCount : "multiple"} flavors at GetSmoke. Browse the flavor selection above to find your favorite.`,
    },
    {
      q: `Can I buy the ${model.shortName} in a pack?`,
      a: `Yes. GetSmoke offers the ${model.shortName} in Single ($${price.toFixed(2)}), Pack of 3 ($${pack3Price} total), Pack of 5 ($${pack5Price} total), and Pack of 10 ($${pack10Price} total). Each device in a multi-pack can be a different flavor so you can mix and match.`,
    },
    {
      q: `Does the ${model.shortName} have a rechargeable battery?`,
      a: `Yes, the ${model.shortName} features a rechargeable battery via USB-C. Recharging ensures you can use all the e-liquid in the device before it runs out of power, maximizing the value of each unit.`,
    },
    {
      q: `What is the shipping policy for ${model.shortName}?`,
      a: `GetSmoke ships ${model.shortName} devices across the United States. Free shipping is available on orders over $79. In compliance with the PACT Act and state regulations, adult signature is required upon delivery. We do not ship to states or localities where the sale of nicotine products is restricted.`,
    },
    {
      q: `Is the ${model.shortName} a good choice for beginners?`,
      a: model.nicotine === "0% Nicotine Free"
        ? `The ${model.shortName} is nicotine-free, making it an ideal option for those who enjoy vaping without nicotine. The draw-activated design is simple to use right out of the box with no settings or buttons required.`
        : `The ${model.shortName} is designed for vapers comfortable with high-nicotine products. If you are transitioning from cigarettes, the ${model.nicotine} nicotine salt provides a satisfying experience. The draw-activated design makes it extremely easy to use - no buttons, no setup.`,
    },
    {
      q: `Where can I buy ${model.name} online?`,
      a: `You can buy the ${model.name} directly at GetSmoke. We carry all available flavors with fast delivery across the USA. Orders ship from our US warehouse with adult signature required upon delivery.`,
    },
  ];
}

export default function GenericModelPage({ modelSlug }: { modelSlug: string }) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [model, setModel] = useState<ModelConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [packOption, setPackOption] = useState<PackOption>("single");
  const [qty, setQty] = useState(1);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(Array(10).fill(""));

  const { addItem, loading: cartLoading } = useCart();
  const { data: session } = useSession();
  const email = session?.user?.email ?? null;

  useEffect(() => {
    fetch(`/api/models/${modelSlug}`)
      .then(r => r.json())
      .then((data: ApiResponse) => {
        setProducts(data.products ?? []);
        setModel(data.model);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [modelSlug]);

  if (loading) {
    return (
      <main className="font-unbounded pb-16 w-11/12 mx-auto">
        <div className="pt-6 pb-4">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="md:flex md:gap-10">
          <div className="md:w-1/2">
            <div className="w-full rounded-3xl bg-gray-200 animate-pulse" style={{ paddingTop: "100%" }} />
            <div className="flex gap-3 mt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-12 h-16 bg-gray-200 rounded-xl animate-pulse flex-shrink-0" />
              ))}
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2 space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!model) {
    return (
      <main className="font-unbounded pb-16 w-11/12 mx-auto pt-16 text-center">
        <p className="text-gray-500">Model not found.</p>
      </main>
    );
  }

  const packConfig = buildPackConfig(model.price);
  const pack = packConfig[packOption];

  const totalPrice =
    packOption === "single"
      ? pack.price * qty
      : pack.price * pack.count;

  const heroSrc = selectedProduct?.images?.[0]?.url ?? model.heroImage;

  const handleProductSelect = (product: ApiProduct) => {
    setSelectedProduct(product);
    setSelectedProductIds(prev => {
      const updated = [...prev];
      updated[0] = product.id;
      return updated;
    });
  };

  const handlePackChange = (option: PackOption) => {
    setPackOption(option);
    setSelectedProductIds(prev => {
      const updated = Array(10).fill("");
      updated[0] = prev[0] || selectedProduct?.id || "";
      return updated;
    });
  };

  const handleDropdownChange = (index: number, value: string) => {
    setSelectedProductIds(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddToCart = async () => {
    if (packOption === "single") {
      const id = selectedProductIds[0] || selectedProduct?.id;
      if (!id) return;
      await addItem(email, { id, quantity: qty });
    } else {
      for (const productId of selectedProductIds.slice(0, pack.count)) {
        if (productId) await addItem(email, { id: productId, quantity: 1 });
      }
    }
  };

  const packKeys: PackOption[] = ["single", "pack3", "pack5", "pack10"];
  const descParagraphs = generateDescription(model, products.length);
  const faqs = generateFaq(model, products.length, model.price);

  return (
    <main className="font-unbounded pb-16 w-11/12 mx-auto">
      {/* Breadcrumb */}
      <nav className="pt-6 pb-4 text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href={`/brands/${model.brandSlug}`} className="hover:underline">{model.brand}</Link>
        <span>/</span>
        <span className="text-gray-800">{model.shortName}</span>
      </nav>

      {/* Main layout */}
      <div className="md:flex md:gap-10 md:items-start">
        {/* Left: Image + Flavor Scroll */}
        <div className="md:w-1/2 md:sticky md:top-6">
          {/* Hero image */}
          <div className="relative w-full rounded-3xl overflow-hidden bg-gray-50" style={{ paddingTop: "100%" }}>
            <Image
              src={heroSrc}
              alt={selectedProduct ? `${model.shortName} - ${getFlavorName(selectedProduct)}` : model.name}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-vape.jpg";
              }}
            />
          </div>

          {/* Flavor chips */}
          {products.length > 0 && (
            <div
              className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map(product => {
                const isSelected = selectedProduct?.id === product.id;
                const imgUrl = product.images?.[0]?.url;
                return (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-xl border-2 transition-colors ${
                      isSelected ? "border-black" : "border-transparent"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={getFlavorName(product)}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <span className="text-[9px] text-center leading-tight max-w-[44px] text-gray-700">
                      {getFlavorName(product)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Info + Options + Purchase */}
        <div className="mt-6 md:mt-0 md:w-1/2">
          {/* Info */}
          <div>
            <Link
              href={`/brands/${model.brandSlug}`}
              className="text-xs text-gray-500 hover:underline uppercase tracking-wide"
            >
              {model.brand}
            </Link>
            <h1 className="font-unbounded font-bold text-2xl mt-1">{model.shortName}</h1>
            <p className="text-sm text-gray-500 mt-1">{model.puffs} Puffs - Disposable Vape</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-base">&#9733;&#9733;&#9733;&#9733;&#189;</span>
              <span className="text-xs text-gray-500">4.5 / 5</span>
            </div>

            {/* Price */}
            <p className="text-xl font-bold mt-2">${totalPrice.toFixed(2)}</p>
          </div>

          {/* Pack options */}
          <div className="mt-6">
            <p className="font-bold text-xs uppercase tracking-wider mb-3">Choose Your Option</p>
            <div className="flex flex-col gap-2">
              {packKeys.map(key => {
                const cfg = packConfig[key];
                const isSelected = packOption === key;
                return (
                  <div key={key}>
                    <button
                      onClick={() => handlePackChange(key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full border-2 transition-colors ${
                        isSelected ? "border-black bg-gray-50" : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            isSelected ? "border-black bg-black" : "border-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">{cfg.label}</span>
                      </div>
                      <span className="text-sm font-bold">{cfg.display}</span>
                    </button>

                    {/* Flavor dropdowns */}
                    {isSelected && products.length > 0 && (
                      <div
                        className={`mt-2 px-2 flex flex-col gap-2 ${
                          key === "pack10" ? "md:grid md:grid-cols-2 md:gap-x-3" : ""
                        }`}
                      >
                        {Array.from({ length: cfg.count }).map((_, i) => (
                          <select
                            key={i}
                            value={selectedProductIds[i] || ""}
                            onChange={e => handleDropdownChange(i, e.target.value)}
                            className="rounded-full border border-gray-300 w-full py-2 px-4 text-sm bg-white appearance-none"
                          >
                            <option value="">Choose flavor</option>
                            {products.map(p => (
                              <option key={p.id} value={p.id}>
                                {getFlavorName(p)}
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

          {/* Purchase */}
          <div className="mt-6">
            <p className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</p>
            <div className="flex items-center gap-3 mt-4">
              {packOption === "single" && (
                <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-2 text-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-bold min-w-[2.5rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(99, q + 1))}
                    className="px-4 py-2 text-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              )}
              <button
                onClick={handleAddToCart}
                disabled={cartLoading || products.length === 0}
                className="flex-1 py-3 px-6 rounded-full text-white font-bold text-sm disabled:opacity-60 transition-opacity"
                style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
              >
                {cartLoading ? "Adding..." : products.length === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              {model.nicotine === "0% Nicotine Free"
                ? "21+ only - Nicotine Free"
                : "21+ only - Nicotine is addictive"}
            </p>
          </div>
        </div>
      </div>

      {/* SEO Description */}
      <section className="mt-12 border-t border-gray-100 pt-8">
        <h2 className="text-lg md:text-xl font-bold font-unbounded mb-4">
          About {model.name} Disposable Vape
        </h2>
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          {descParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Specs table */}
      <section className="mt-8">
        <h2 className="text-base font-bold font-unbounded mb-3">{model.shortName} Specifications</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ["Puff Count", `Up to ${model.puffs} puffs`],
            ["Nicotine Strength", model.nicotine],
            ["Battery", "Rechargeable (USB-C)"],
            ["Operation", "Draw-activated (no button)"],
            ["Available Flavors", products.length > 0 ? `${products.length} flavors` : "Multiple flavors"],
            ["Brand", model.brand],
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
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="border border-gray-200 rounded-2xl overflow-hidden group"
            >
              <summary className="cursor-pointer px-5 py-4 font-bold text-sm flex justify-between items-center list-none">
                {q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg leading-none ml-2 shrink-0">
                  &#8964;
                </span>
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
