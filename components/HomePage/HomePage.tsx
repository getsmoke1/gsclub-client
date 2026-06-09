"use client"
import React from "react"
import Hero from "./Hero"
import Filter from "./Filter"
import Products from "./Products"
import Subscriptions from "./Subscriptions"
import BrandCircles from "./BrandCircles"

const HomePage = () => {
    return (
        <main>
            <Hero />
            <Subscriptions />
            <div className="pt-0">
                <Filter />
                <Products productType="VAPES" />
            </div>
            <BrandCircles />
        </main>
    )
}

export default HomePage
