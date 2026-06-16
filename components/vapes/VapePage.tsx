"use client"
import React from 'react'
import Products from '../HomePage/Products'
import Filter from '../HomePage/Filter'

interface VapePageProps {
    productType?: string;
    search?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialProducts?: any[];
}

const VapePage = ({ productType = "VAPES", search, initialProducts }: VapePageProps) => {
    return (
        <main>
            <div className="pt-2">
                <Filter />
                <Products productType={productType} search={search} initialProducts={initialProducts} />
            </div>
        </main>
    )
}

export default VapePage
