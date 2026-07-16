import type { Metadata } from "next";
import CartPage from '@/components/Cart/CartPage'
import React from 'react'

export const metadata: Metadata = { robots: { index: false, follow: false } };

const page = () => {
    return (
        <CartPage />
    )
}

export default page
