"use client"
import React from 'react'
import Hero from './Hero'
import Filter from './Filter'
import Products from './Products'

const HomePage = () => {
    return (
        <main>
            <Hero />
            <div className="w-11/12 mx-auto py-6">
                <h2 className="font-unbounded font-bold text-xl md:text-2xl mb-6">
                    GetSmoke — Online Vape Shop
                </h2>
            </div>
            <div className='pt-0'>
                <Filter />
                <Products productType="VAPES" />
            </div>
        </main>
    )
}

export default HomePage
