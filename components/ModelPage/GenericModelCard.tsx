"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ModelConfig } from "@/lib/models-config";

interface Props {
  model: ModelConfig;
}

export default function GenericModelCard({ model }: Props) {
  return (
    <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col h-full bg-white">
      <Link href={`/models/${model.slug}`} className="block">
        {/* Image */}
        <div className="relative bg-white" style={{ paddingTop: "100%" }}>
          <div className="absolute inset-0">
            <Image
              src={model.heroImage}
              alt={`${model.name} Disposable Vape`}
              fill
              className="object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-vape.jpg";
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="p-2 md:p-3">
          <div className="text-center text-sm font-bold text-black">
            ${model.price.toFixed(2)}
            <span className="block text-xs text-gray-500 font-normal">
              - or subscribe to save up to 10%
            </span>
          </div>
          <h3 className="font-bold text-xs md:text-sm text-center mt-1 leading-4">
            {model.shortName}
          </h3>
          <p className="text-[10px] text-gray-400 text-center mt-0.5">{model.puffs} Puffs</p>
        </div>
      </Link>

      {/* Button */}
      <div className="px-2 md:px-3 pb-2 md:pb-3 mt-auto">
        <Link href={`/models/${model.slug}`} className="block">
          <button
            className="w-full py-2.5 rounded-full text-white text-sm font-bold flex items-center justify-center gap-1.5 transition-opacity whitespace-nowrap"
            style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
          >
            Pick Your Flavor
          </button>
        </Link>
        <p className="text-center text-[9px] text-gray-400 mt-1 leading-tight">
          21+ only{model.nicotine !== "0% Nicotine Free" ? " - Nicotine is addictive" : " - Nicotine Free"}
        </p>
      </div>
    </div>
  );
}
