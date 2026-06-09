"use client"
import React, { useState } from "react"
import Link from "next/link"

const Footer = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    return (
        <footer className="bg-white text-black font-unbounded border-t border-gray-100">
            {/* Warning */}
            <div className="bg-black text-white text-center text-xs py-2 px-4">
                WARNING: These products contain nicotine. Nicotine is an addictive chemical. Must be 21+ to purchase.
            </div>

            <div className="w-11/12 mx-auto py-12 flex flex-col items-center gap-6 text-center">
                {/* Logo */}
                <Link href="/" className="block">
                    <span className="font-unbounded font-black text-4xl md:text-5xl tracking-tight">
                        getsmoke<span className="inline-block w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-black align-middle mx-0.5 -mt-1" />
                        <sup className="text-xs align-super">TM</sup>
                    </span>
                </Link>

                {/* Contact */}
                <div className="text-sm text-gray-600 space-y-1">
                    <p>contact us: <a href="mailto:info@getsmoke.com" className="underline hover:text-black">info@getsmoke.com</a></p>
                    <p>License number: #2333778</p>
                </div>

                {/* Subscribe */}
                <div className="w-full max-w-sm">
                    <p className="text-sm font-medium mb-3">Subscribe to the latest news</p>
                    {submitted ? (
                        <p className="text-[#fe3500] font-bold text-sm">Subscribed!</p>
                    ) : (
                        <form
                            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                            className="flex gap-2"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Your email"
                                className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#fe3500]"
                                required
                            />
                            <button
                                type="submit"
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                                style={{ backgroundColor: "#fe3500" }}
                                aria-label="Subscribe"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                            </button>
                        </form>
                    )}
                </div>

                {/* Policy links */}
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
                    {[
                        { label: "Privacy Policy", href: "/privacy-policy" },
                        { label: "Terms & Conditions", href: "/terms-conditions" },
                        { label: "Return Policy", href: "/return-policy" },
                        { label: "Shipping Policy", href: "/shipping-policy" },
                        { label: "Contact", href: "/contact" },
                    ].map(({ label, href }) => (
                        <Link key={href} href={href} className="hover:text-black transition-colors">
                            {label}
                        </Link>
                    ))}
                </nav>

                <p className="text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} GetSmoke. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
