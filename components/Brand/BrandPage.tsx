"use client";
import React from "react";
import Products from "@/components/HomePage/Products";
import Filter from "@/components/HomePage/Filter";
import Image from "next/image";

interface BrandPageProps {
  brandId: string;
  brandName: string;
  brandSlug: string;
}

const BrandPage = ({ brandId, brandName, brandSlug }: BrandPageProps) => {
  return (
    <main>
      <div className="w-11/12 mx-auto pt-8 pb-4 font-unbounded">
        <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
        <p className="text-gray-500 text-sm mb-6">Shop all {brandName} disposable vapes</p>
      </div>
      <div className="pt-2">
        <Filter />
        <Products productType="VAPES" brandId={brandId} />
      </div>
    </main>
  );
};

export default BrandPage;
