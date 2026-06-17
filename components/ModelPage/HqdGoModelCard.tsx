import React from "react";
import Image from "next/image";
import Link from "next/link";

const HQD_GO_IMAGE =
  "https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev/wp-content/uploads/2025/11/HQD-Go-Purple-Drank.jpg";

export default function HqdGoModelCard() {
  return (
    <Link href="/models/hqd-go" className="block">
      <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#7c3aed] transition-colors flex flex-col h-full bg-white">
        {/* Image */}
        <div className="relative bg-gray-50" style={{ paddingTop: "100%" }}>
          <div className="absolute inset-0">
            <Image
              src={HQD_GO_IMAGE}
              alt="HQD GO 35000 Puffs Disposable Vape"
              fill
              className="object-cover"
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
        <div className="p-2 md:p-3 flex flex-col gap-1">
          <span className="text-xs text-gray-500">HQD</span>
          <p className="font-bold text-lg leading-tight">HQD GO</p>
          <p className="text-sm text-gray-600">14 Flavors Available</p>
          <p className="font-bold mt-1">from $34.99</p>
        </div>

        {/* CTA */}
        <div className="px-2 md:px-3 pb-2 md:pb-3 mt-auto">
          <span
            className="block w-full text-center py-2.5 rounded-full text-white font-bold text-sm"
            style={{
              background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)",
            }}
          >
            Pick Your Flavor
          </span>
        </div>
      </div>
    </Link>
  );
}
