"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import ProductList from './ProductList';
import { Product } from '@/types/product';

interface BestSellersSectionProps {
    initialProducts?: Product[];
}

const BestSellersSection = ({ initialProducts }: BestSellersSectionProps) => {
    const [activeTab, setActiveTab] = useState<'best' | 'newest'>('best');
    return (
        <section className="w-full bg-white pt-5 pb-2">
            <div className="w-11/12 mx-auto">
                <div className="flex justify-center gap-4 mb-2">
                    <button
                        onClick={() => setActiveTab('best')}
                        className={`font-unbounded font-bold text-xs uppercase px-6 py-2.5 rounded-full transition-colors ${activeTab === 'best' ? 'text-black' : 'bg-transparent text-gray-400'}`}
                        style={activeTab === 'best' ? { background: '#FFD600' } : {}}
                    >
                        BEST SELLERS
                    </button>
                    <button
                        onClick={() => setActiveTab('newest')}
                        className={`font-unbounded font-bold text-xs uppercase px-6 py-2.5 rounded-full transition-colors ${activeTab === 'newest' ? 'text-black' : 'bg-transparent text-gray-400'}`}
                        style={activeTab === 'newest' ? { background: '#FFD600' } : {}}
                    >
                        NEWEST IN
                    </button>
                </div>
                <ProductList
                    title=""
                    showViewAll={false}
                    productType="VAPES"
                    search={activeTab === 'newest' ? undefined : "pack"}
                    sortBy={activeTab === 'newest' ? 'newest' : undefined}
                    initialProducts={activeTab === 'best' ? initialProducts : undefined}
                />
                <div className="flex justify-center mt-4">
                    <Link href="/vapes" className="font-unbounded font-bold text-xs uppercase px-10 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                        view all
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSellersSection;
