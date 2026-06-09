"use client";
import React, { useEffect } from "react";
import Products from "@/components/HomePage/Products";
import Filter from "@/components/HomePage/Filter";
import { useFilter } from "@/hooks/useFilter";

interface BrandPageProps {
  brandId: string;
  brandName: string;
  brandSlug: string;
}

const BrandPage = ({ brandId, brandName }: BrandPageProps) => {
  const { setFilters, clearFilters } = useFilter();

  useEffect(() => {
    setFilters({ brandId });
    return () => clearFilters();
  }, [brandId]);

  return (
    <main>
      <div className="w-11/12 mx-auto pt-8 pb-4 font-unbounded">
        <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
        <p className="text-gray-500 text-sm mb-6">
          Shop all {brandName} disposable vapes
        </p>
      </div>
      <div className="pt-2">
        <Filter />
        <Products productType="VAPES" />
      </div>
    </main>
  );
};

export default BrandPage;
