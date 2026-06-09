"use client"
import React from 'react'
import Products from '../HomePage/Products'
import Filter from '../HomePage/Filter'

interface VapePageProps {
    productType?: string;
}

const VapePage = ({ productType = "VAPES" }: VapePageProps) => {
    return (
        <main>
            <div className="pt-2">
                <Filter />
                <Products productType={productType} />
            </div>
        </main>
    )
}

export default VapePage
