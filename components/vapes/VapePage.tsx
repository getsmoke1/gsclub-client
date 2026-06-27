"use client"
import React from 'react'
import Products from '../HomePage/Products'
import Filter from '../HomePage/Filter'
import ListingFaq from '../HomePage/ListingFaq'

interface VapePageProps {
    productType?: string;
    search?: string;
    nameOnly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialProducts?: any[];
    faqSlug?: string; // e.g. "/vapes" or "/bundles"
    heading?: string; // SEO H1 — rendered server-side via prop
}

const VapePage = ({ productType = "VAPES", search, nameOnly, initialProducts, faqSlug = "/vapes", heading }: VapePageProps) => {
    return (
        <main>
            {heading && (
                <div className="w-11/12 mx-auto pt-6 pb-2">
                    <h1 className="font-unbounded font-bold text-xl md:text-2xl text-[#0C0B0B]">
                        {heading}
                    </h1>
                </div>
            )}
            <div className="pt-2">
                <Filter productType={productType} />
                <div style={{ marginTop: '16px' }}>
                    <Products productType={productType} search={search} nameOnly={nameOnly} initialProducts={initialProducts} />
                </div>
            </div>
            <ListingFaq pageSlug={faqSlug} />
        </main>
    )
}

export default VapePage
