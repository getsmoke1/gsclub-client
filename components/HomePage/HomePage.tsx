"use client"
import React from "react"
import Hero from "./Hero"
import BestSellersSection from "./BestSellersSection"
import VapeSubscription from "./VapeSubscription"
import BundleDeals from "./BundleDeals"
import ShopByCategory from "./ShopByCategory"

import InstagramFeed from "./InstagramFeed"
import HomeFaq from "./HomeFaq"
import HomeBlog from "./HomeBlog"
import { Product } from "@/types/product"

interface HomePageProps {
    initialProducts?: Product[];
    newestProducts?: Product[];
    brandCircles?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bundleProducts?: any[];
}

const HomePage = ({ initialProducts, newestProducts, bundleProducts, brandCircles }: HomePageProps) => {
    return (
        <main>
            <Hero />
            <BestSellersSection initialProducts={initialProducts} newestProducts={newestProducts} />
            <div className="md:hidden"><VapeSubscription /></div>
            {/* Desktop-only promo banner between View All and Bundle Deals */}
            <div className="hidden md:block w-11/12 mx-auto my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/banners/vape-more-banner.jpg"
                    alt="Vape More, Stress Less - Packs of 3, 5 or 10"
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                />
            </div>
            <BundleDeals initialProducts={bundleProducts} />
            <ShopByCategory />
            {brandCircles}
            <InstagramFeed />
            <HomeFaq />
            <HomeBlog />
        </main>
    )
}

export default HomePage
