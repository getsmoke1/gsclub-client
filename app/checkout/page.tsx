import type { Metadata } from "next";
import CheckoutPage from '@/components/Checkout/CheckoutPage'
import React from 'react'

export const metadata: Metadata = { robots: { index: false, follow: false } };

const page = () => {
    return (
        <CheckoutPage />
    )
}

export default page
