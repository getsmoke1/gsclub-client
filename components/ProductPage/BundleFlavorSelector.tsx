"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import { useSession } from "next-auth/react";
import { MODELS } from "@/lib/models-config";
import { r2src } from "@/lib/r2-image";

interface FlavorProduct {
  id: string;
  name: string;
  flavorName: string;
  imageUrl: string | null;
  stockStatus: string | null;
}

interface BundleFlavorSelectorProps {
  productName: string;
  packCount: number; // from DB (may be null) or extracted from name
}

function detectModelSlug(productName: string): string | null {
  const lower = productName.toLowerCase();
  for (const model of MODELS) {
    const query = model.dbSearchQuery.toLowerCase();
    if (lower.includes(query)) return model.slug;
  }
  return null;
}

function getFlavorLabel(product: FlavorProduct): string {
  if (product.flavorName) return product.flavorName;
  // Extract flavor from product name - remove the model identifier
  return product.name.replace(/juicy\s*bar|jb\d+\s*(pro\s*max|pro)?|disposable\s*vape|pack\s*of\s*\d+/gi, "").trim();
}

export default function BundleFlavorSelector({ productName, packCount }: BundleFlavorSelectorProps) {
  const [flavors, setFlavors] = useState<FlavorProduct[]>([]);
  const [slots, setSlots] = useState<string[]>(Array(packCount).fill(""));
  const [invalidSlots, setInvalidSlots] = useState<boolean[]>(Array(packCount).fill(false));
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const slotRefs = useRef<(HTMLSelectElement | null)[]>([]);

  const { addItem } = useCart();
  const { data: session } = useSession();
  const email = session?.user?.email ?? null;

  useEffect(() => {
    const slug = detectModelSlug(productName);
    if (!slug) return;
    setLoading(true);
    fetch(`/api/models/${slug}`)
      .then(r => r.json())
      .then(data => {
        const products: FlavorProduct[] = (data.products ?? [])
          .filter((p: { name: string }) => !/pack\s*of/i.test(p.name))
          .map((p: {
            id: string;
            name: string;
            flavor?: { name: string } | null;
            images?: { url: string }[];
            stockStatus?: string | null;
          }) => ({
            id: p.id,
            name: p.name,
            flavorName: p.flavor?.name ?? "",
            imageUrl: p.images?.[0]?.url ?? null,
            stockStatus: p.stockStatus ?? null,
          }));
        setFlavors(products);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productName]);

  const handleSlotChange = (slotIndex: number, productId: string) => {
    setSlots(prev => { const n = [...prev]; n[slotIndex] = productId; return n; });
    setInvalidSlots(prev => { const n = [...prev]; n[slotIndex] = false; return n; });
  };

  const handleAddToCart = async () => {
    // Validate all slots filled
    const newInvalid = slots.map(s => !s);
    if (newInvalid.some(Boolean)) {
      setInvalidSlots(newInvalid);
      const firstEmpty = newInvalid.findIndex(Boolean);
      slotRefs.current[firstEmpty]?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setCartLoading(true);
    try {
      for (const productId of slots) {
        await addItem(email, { id: productId, quantity: 1 });
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {}
    setCartLoading(false);
  };

  if (!detectModelSlug(productName)) return null;
  if (loading) return <div className="text-sm text-gray-400 py-2">Loading flavors...</div>;
  if (flavors.length === 0) return null;

  const availableFlavors = flavors.filter(f => f.stockStatus !== "OUTOFSTOCK");

  return (
    <div className="mt-4 space-y-3">
      {/* Flavor chips row */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Available Flavors</p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {flavors.map(f => {
            const oos = f.stockStatus === "OUTOFSTOCK";
            const preorder = f.stockStatus === "PREORDER";
            return (
              <div
                key={f.id}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 p-1 rounded-xl ${oos || preorder ? "opacity-40" : ""}`}
                title={oos ? "Out of Stock" : preorder ? "Pre-Order" : ""}
              >
                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gray-100">
                  {f.imageUrl ? (
                    <Image src={r2src(f.imageUrl)} alt={getFlavorLabel(f)} fill className={`object-cover ${oos || preorder ? "grayscale" : ""}`} loading="eager" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  {preorder && (
                    <div className="absolute inset-0 flex items-end justify-center pb-0.5">
                      <span className="text-[6px] font-bold text-purple-600 bg-white/90 px-0.5 rounded">PRE</span>
                    </div>
                  )}
                  {oos && (
                    <div className="absolute inset-0 flex items-end justify-center pb-0.5">
                      <span className="text-[6px] font-bold text-red-500 bg-white/90 px-0.5 rounded">OOS</span>
                    </div>
                  )}
                </div>
                <span className={`text-[8px] text-center leading-tight max-w-[40px] ${oos || preorder ? "text-gray-400 line-through" : "text-gray-700"}`}>
                  {getFlavorLabel(f)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slot dropdowns */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Your {packCount} Flavors</p>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: packCount }).map((_, i) => (
            <select
              key={i}
              ref={el => { slotRefs.current[i] = el; }}
              id={`bundle-slot-${i}`}
              value={slots[i]}
              onChange={e => handleSlotChange(i, e.target.value)}
              className={`text-xs border rounded-lg px-2 py-1.5 ${invalidSlots[i] ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            >
              <option value="">Flavor {i + 1}</option>
              {availableFlavors.map(f => (
                <option key={f.id} value={f.id}
                  disabled={f.stockStatus === "PREORDER"}
                  style={f.stockStatus === "PREORDER" ? { color: "#9ca3af" } : {}}
                >
                  {getFlavorLabel(f)}{f.stockStatus === "PREORDER" ? " — Pre-Order" : ""}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAddToCart}
        disabled={cartLoading}
        className="w-full py-3 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
        style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
      >
        <ShoppingCart size={15} />
        {cartLoading ? "Adding..." : added ? "Added!" : `Add Pack of ${packCount} to Cart`}
      </button>
      <p className="text-[10px] text-gray-400 text-center">Select a different flavor for each slot</p>
    </div>
  );
}
