"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { r2src } from "@/lib/r2-image";
import AddToCartButton from "@/components/Cart/AddToCartButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BrandProductCardProps = { product: any };

const BrandProductCard = ({ product }: BrandProductCardProps) => {
  return (
    <div className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col h-full bg-white">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative bg-gray-50" style={{ paddingTop: "100%" }}>
          <div className="absolute inset-0">
            {product.images[0]?.url ? (
              <Image
                src={r2src(product.images[0].url)}
                alt={product.name}
                fill
                loading="eager"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-300 text-xs">No image</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-2 md:p-3">
          <div className="text-center text-sm font-bold text-black">
            ${product.currentPrice.toFixed(2)}
            <span className="block text-xs text-gray-500 font-normal">
              — or subscribe to save up to 10%
            </span>
          </div>
          <h3 className="font-bold text-xs md:text-sm text-center mt-1 line-clamp-2 leading-4">
            {product.name}
          </h3>
        </div>
      </Link>
      <div className="px-2 md:px-3 pb-2 md:pb-3 mt-auto" style={{ paddingLeft: '12px', paddingRight: '12px', paddingBottom: '12px' }}>
        <AddToCartButton product={product as never} compact={true} />
        <p className="text-center text-[9px] text-gray-400 mt-1 leading-tight">21+ only · Nicotine is addictive</p>
      </div>
    </div>
  );
};

export default BrandProductCard;
