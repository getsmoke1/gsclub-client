"use client"
import React from "react"
import Hero from "./Hero"
import BestSellersSection from "./BestSellersSection"
import BundleDeals from "./BundleDeals"
import ShopByCategory from "./ShopByCategory"
import BrandCircles from "./BrandCircles"
import InstagramFeed from "./InstagramFeed"
import HomeFaq from "./HomeFaq"
import HomeBlog from "./HomeBlog"

const HomePage = () => {
    return (
        <main>
            <Hero />
            <BestSellersSection />
            <BundleDeals />
            <ShopByCategory />
            <BrandCircles />
            <InstagramFeed />
            <HomeFaq />
            <HomeBlog />
        </main>
    )
}

export default HomePage
