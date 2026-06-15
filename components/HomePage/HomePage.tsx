"use client"
import React from "react"
import Hero from "./Hero"
import BestSellersSection from "./BestSellersSection"
import VapeSubscription from "./VapeSubscription"
import BundleDeals from "./BundleDeals"
import ShopByCategory from "./ShopByCategory"
import BrandCircles from "./BrandCircles"
import InstagramFeed from "./InstagramFeed"
import HomeFaq from "./HomeFaq"
import HomeBlog from "./HomeBlog"
import { Product } from "@/types/product"

interface HomePageProps {
    initialProducts?: Product[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bundleProducts?: any[];
}

const HomePage = ({ initialProducts, bundleProducts }: HomePageProps) => {
    return (
        <main>
            <Hero />
            <BestSellersSection initialProducts={initialProducts} />
            <VapeSubscription />
            <BundleDeals initialProducts={bundleProducts} />
            <ShopByCategory />
            <BrandCircles />
            <InstagramFeed />
            <HomeFaq />
            <HomeBlog />
        </main>
    )
}

export default HomePage
