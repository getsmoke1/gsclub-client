"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import ProductList from './ProductList';

const BestSellersSection = () => {
    const [activeTab, setActiveTab] = useState<'best' | 'newest'>('best');
    return (
        <section className="w-full bg-white py-10">
            <div className="w-11/12 mx-auto">
                <div className="flex justify-center gap-4 mb-3">
                    {/* Active: yellow filled pill. Inactive: plain text no border */}
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
                <ProductList title="" showViewAll={false} productType="VAPES" search="pack" />
                <div className="flex justify-center mt-8">
                    <Link href="/vapes" className="font-unbounded font-bold text-xs uppercase px-10 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                        view all
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSellersSection;
