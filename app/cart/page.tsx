import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
import CartPage from '@/components/Cart/CartPage'
import React from 'react'

const page = () => {
    return (
        <CartPage />
    )
}

export default page
