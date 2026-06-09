"use client"
import React from "react"
import Hero from "./Hero"
import Filter from "./Filter"
import Products from "./Products"
import Subscriptions from "./Subscriptions"
import BrandCircles from "./BrandCircles"
import MysteryBox from "./MysteryBox"

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
            <MysteryBox />
        </main>
    )
}

export default HomePage
