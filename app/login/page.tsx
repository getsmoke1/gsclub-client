import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
import Login from '@/components/Authentication/Login'
import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        // Already logged in — go to callbackUrl or account page
        const params = await searchParams;
        const dest = params.callbackUrl || '/my-account';
        redirect(dest);
    }
    return (
        <Login />
    )
}

export default page
