"use client"
import React from 'react'
import Products from '../HomePage/Products'
import Filter from '../HomePage/Filter'
import ListingFaq from '../HomePage/ListingFaq'

interface VapePageProps {
    productType?: string;
    search?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialProducts?: any[];
    faqSlug?: string; // e.g. "/vapes" or "/bundles"
}

const VapePage = ({ productType = "VAPES", search, initialProducts, faqSlug = "/vapes" }: VapePageProps) => {
    return (
        <main>
            <div className="pt-2">
                <Filter productType={productType} />
                <div style={{ marginTop: '16px' }}>
                    <Products productType={productType} search={search} initialProducts={initialProducts} />
                </div>
            <ListingFaq pageSlug={faqSlug} />
        </main>
    )
}

export default VapePage
