"use client"
import React, { useEffect } from "react"
import Products from "../HomePage/Products"
import Filter from "../HomePage/Filter"
import { useFilter } from "@/hooks/useFilter"

interface BrandPageProps {
    brandId: string;
    brandName: string;
}

const BrandPage = ({ brandId, brandName }: BrandPageProps) => {
    const { setFilters } = useFilter();

    useEffect(() => {
        setFilters({ brandId });
        return () => setFilters({ brandId: undefined });
    }, [brandId, setFilters]);

    return (
        <main>
            {/* Brand header — no hero, clean heading */}
            <div className="w-11/12 mx-auto pt-8 pb-4">
                <h1 className="font-unbounded font-bold text-2xl md:text-3xl uppercase">
                    {brandName} <span style={{ color: "#fe3500" }}>Vapes</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Shop all {brandName} disposable vapes at GetSmoke
                </p>
            </div>
            <div className="pt-2">
                <Filter />
                <Products productType="VAPES" />
            </div>
        </main>
    )
}

export default BrandPage
