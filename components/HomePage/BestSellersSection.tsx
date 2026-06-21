"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import ProductList from './ProductList';
import { Product } from '@/types/product';
import GenericModelCard from '@/components/ModelPage/GenericModelCard';
import { MODELS } from '@/lib/models-config';

interface BestSellersSectionProps {
    initialProducts?: Product[];
    newestProducts?: Product[];
}

const BestSellersSection = ({ initialProducts }: BestSellersSectionProps) => {
    const [activeTab, setActiveTab] = useState<'best' | 'newest'>('best');
    return (
        <section className="w-full bg-white pt-5 pb-2">
            <div className="w-11/12 mx-auto">
                <div className="flex justify-center gap-4 mb-2">
                    <button
                        onClick={() => setActiveTab('best')}
                        className={`font-unbounded font-bold text-xs uppercase rounded-full transition-colors border-0 outline-none cursor-pointer ${activeTab === 'best' ? 'text-black' : 'bg-transparent text-gray-400'}`}
                        style={activeTab === 'best'
                            ? { background: '#FFD600', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }
                            : { paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }}
                    >
                        BEST SELLERS
                    </button>
                    <button
                        onClick={() => setActiveTab('newest')}
                        className={`font-unbounded font-bold text-xs uppercase rounded-full transition-colors border-0 outline-none cursor-pointer ${activeTab === 'newest' ? 'text-black' : 'bg-transparent text-gray-400'}`}
                        style={activeTab === 'newest'
                            ? { background: '#FFD600', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }
                            : { paddingTop: '10px', paddingBottom: '10px', paddingLeft: '24px', paddingRight: '24px' }}
                    >
                        NEWEST IN
                    </button>
                </div>
                {activeTab === 'newest' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                        {MODELS.map(model => (
                            <GenericModelCard key={model.slug} model={model} />
                        ))}
                    </div>
                ) : (
                    <ProductList
                        title=""
                        showViewAll={false}
                        productType="VAPES"
                        search="pack"
                        initialProducts={initialProducts}
                        compactCart={true}
                        featuredModelSlugs={["raz-dc25000", "lost-mary-turbo", "geek-bar-pulse", "hqd-cuvie-glaze"]}
                    />
                )}
                <div className="flex justify-center mt-4">
                    <Link href="/vapes" className="font-unbounded font-bold text-xs uppercase rounded-full bg-black text-white hover:bg-gray-800 transition-colors" style={{ display: 'inline-block', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '40px', paddingRight: '40px' }}>
                        view all
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSellersSection;
