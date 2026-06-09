"use client"
import React from 'react'
import Hero from './Hero'
import Products from '../HomePage/Products'
import Filter from '../HomePage/Filter'

interface VapePageProps {
    productType?: string;
    title?: string;
}

const VapePage = ({ productType = "VAPES" }: VapePageProps) => {
    return (
        <main>
            <Hero />
            <div className='pt-5'>
                <Filter />
                <Products productType={productType} />
            </div>
        </main>
    )
}

export default VapePage
