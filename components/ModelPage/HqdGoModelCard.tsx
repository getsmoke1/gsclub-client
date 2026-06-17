import React from "react";
import Image from "next/image";
import Link from "next/link";

const HQD_GO_IMAGE = "/hqd-go-hero.jpg";

export default function HqdGoModelCard() {
  return (
    <Link href="/models/hqd-go" className="block">
      <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#7c3aed] transition-colors flex flex-col h-full bg-white">
        {/* Image — taller aspect ratio so banner isn't cropped */}
        <div className="relative bg-gray-50" style={{ paddingTop: "75%" }}>
          <div className="absolute inset-0">
            <Image
              src={HQD_GO_IMAGE}
              alt="HQD GO 35000 Puffs Disposable Vape"
              fill
              className="object-cover object-center"
            />
          </div>
          {/* Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              35,000 PUFFS
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-2 flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-500">HQD</span>
          <p className="font-bold text-sm leading-tight">HQD GO</p>
          <p className="text-[11px] text-gray-600">14 Flavors Available</p>
          <p className="font-bold text-sm mt-0.5">$34.99</p>
        </div>

        {/* CTA */}
        <div className="px-2 pb-2 mt-auto">
          <span
            className="block w-full text-center py-2 rounded-full text-white font-bold text-xs"
            style={{
              background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)",
            }}
          >
            Pick Your Flavor
          </span>
          <p className="text-center text-[9px] text-gray-400 mt-1 leading-tight">21+ only · Nicotine is addictive</p>
        </div>
      </div>
    </Link>
  );
}
