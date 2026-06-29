"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTurnstile } from "@/hooks/useTurnstile"

const Footer = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const { containerRef, token, reset, hasSiteKey } = useTurnstile()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        if (hasSiteKey && !token) return
        setLoading(true)
        setFormError(null)
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, turnstileToken: token }),
            })
            if (!res.ok) {
                const d = await res.json()
                throw new Error(d.error || "Failed to subscribe")
            }
            setSubmitted(true)
        } catch (err: unknown) {
            setFormError(err instanceof Error ? err.message : "Something went wrong")
            reset()
        } finally {
            setLoading(false)
        }
    }

    return (
        <footer className="bg-white font-unbounded">
            {/* White top section */}
            <div className="w-11/12 mx-auto pt-8 pb-6 flex flex-col md:flex-row md:items-start md:justify-between md:gap-12 gap-4" style={{ paddingTop: '32px', paddingBottom: '24px' }}>
                {/* Logo */}
                <Link href="/" className="block">
                    <Image
                        src="/images/logo.png"
                        alt="GetSmoke"
                        width={220}
                        height={56}
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* Contact + License */}
                <div className="text-sm text-black space-y-0.5">
                    <p>contact us: <a href="mailto:info@getsmoke.com" className="hover:underline">info@getsmoke.com</a></p>
                    <p>License number: #2333778</p>
                </div>

                {/* Subscribe */}
                <div className="w-full md:max-w-sm mt-2">
                    <p className="text-sm font-bold text-black mb-3">Subscribe to the latest news</p>
                    {submitted ? (
                        <p className="text-green-600 font-bold text-sm py-4">Subscribed successfully!</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {/* Email input */}
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder=""
                                className="w-full border-2 border-black rounded-full px-5 py-3.5 text-sm focus:outline-none bg-white"
                                required
                            />

                            {/* Cloudflare Turnstile */}
                            <div ref={containerRef} />

                            {/* Sub button */}
                            <button
                                type="submit"
                                disabled={loading || (hasSiteKey && !token)}
                                className="w-full py-4 rounded-full text-black font-bold text-lg lowercase tracking-wide border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "#FFD600" }}
                            >
                                {loading ? "..." : "sub"}
                            </button>
                            {formError && <p className="text-red-500 text-xs">{formError}</p>}
                        </form>
                    )}
                </div>
            </div>

            {/* Black bottom section — policy links */}
            <div className="bg-black py-5 px-4 flex flex-col md:flex-row md:justify-center md:flex-wrap items-center gap-4 md:gap-8" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                    { label: "Privacy policy",        href: "/privacy-policy" },
                    { label: "Terms and conditions",  href: "/terms-and-conditions" },
                    { label: "Return policy",         href: "/return-policy" },
                    { label: "Contact",               href: "/contact" },
                    { label: "Shipping Policy",       href: "/shipping-policy" },
                ].map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="text-white text-sm font-normal hover:underline"
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* Health Warning + Copyright */}
            <div className="bg-black border-t border-gray-800 py-3 px-4 text-center">
                <p className="text-gray-600 text-[10px] leading-relaxed max-w-3xl mx-auto">
                    <strong className="text-gray-500">WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical.
                    For use by adults 21+ only. Keep out of reach of children and pets.
                    If you are pregnant, nursing, or have a heart condition, do not use this product.
                    GetSmoke is a reseller of third-party manufactured products and assumes no liability for health consequences arising from product use.
                    By purchasing, you confirm you are 21 or older and acknowledge all associated health risks.
                </p>
                <p className="text-gray-700 text-[10px] mt-2">
                    © {new Date().getFullYear()} Cosmoproject LLC. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
