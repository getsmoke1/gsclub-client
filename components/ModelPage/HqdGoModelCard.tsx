import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const HQD_GO_IMAGE = "/hqd-go-hero.jpg";

export default function HqdGoModelCard() {
  return (
    <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col h-full bg-white">
      <Link href="/models/hqd-go" className="block">
        {/* Image — object-contain so "35K PUFFS" at bottom is never cropped */}
        <div className="relative bg-black" style={{ paddingTop: "100%" }}>
          <div className="absolute inset-0">
            <Image
              src={HQD_GO_IMAGE}
              alt="HQD GO 35000 Puffs Disposable Vape"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Text — same layout as BrandProductCard */}
        <div className="p-2 md:p-3">
          <div className="text-center text-sm font-bold text-black">
            $34.99
            <span className="block text-xs text-gray-500 font-normal">
              14 Flavors Available
            </span>
          </div>
          <h3 className="font-bold text-xs md:text-sm text-center mt-1 leading-4">
            HQD GO
          </h3>
        </div>
      </Link>

      {/* Button — exact same style as compact AddToCartButton */}
      <div className="px-2 md:px-3 pb-2 md:pb-3 mt-auto">
        <Link href="/models/hqd-go" className="block">
          <button
            className="w-full py-2.5 rounded-full text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-opacity whitespace-nowrap"
            style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
          >
            <ShoppingCart size={13} />
            Pick Your Flavor
          </button>
        </Link>
        <p className="text-center text-[9px] text-gray-400 mt-1 leading-tight">21+ only · Nicotine is addictive</p>
      </div>
    </div>
  );
}
