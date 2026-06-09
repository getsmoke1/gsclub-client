"use client"
import React from "react"
import Hero from "./Hero"
import Filter from "./Filter"
import Products from "./Products"
import Subscriptions from "./Subscriptions"
import BrandCircles from "./BrandCircles"
import MysteryBox from "./MysteryBox"
import InstagramFeed from "./InstagramFeed"

const HomePage = () => {
    return (
        <main>
            <Hero />
            <div className="w-11/12 mx-auto py-6">
                <h2 className="font-unbounded font-bold text-2xl md:text-3xl text-black">
                    GetSmoke &mdash; Online Vape Shop
                </h2>
            </div>
            <Subscriptions />
            <div className="pt-0">
                <Filter />
                <Products productType="VAPES" />
            </div>
            <BrandCircles />
            <MysteryBox />
            <InstagramFeed />
        </main>
    )
}

export default HomePage
