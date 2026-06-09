import React from 'react'
import Hero from './Hero'
import Faq from './Faq'
import ProductList from './ProductList'
import GetMail from './GetMail'
import BrandGrid from './BrandGrid'

const HomePage = () => {
    return (
        <main>
            <Hero />
            <ProductList title="Best Sellers" viewAllLink="/vapes" productType="VAPES" />
            <BrandGrid />
            <ProductList title="Just In" viewAllLink="/vapes" productType="VAPES" />
            <GetMail />
            <Faq />
        </main>
    )
}

export default HomePage
