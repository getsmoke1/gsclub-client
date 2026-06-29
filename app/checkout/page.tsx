import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
import CheckoutPage from '@/components/Checkout/CheckoutPage'
import React from 'react'

const page = () => {
    return (
        <CheckoutPage />
    )
}

export default page
