"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    const [email, setEmail] = useState("")
    const [checked, setChecked] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email && checked) setSubmitted(true)
    }

    return (
        <footer className="bg-white font-unbounded">
            {/* White top section */}
            <div className="w-11/12 mx-auto pt-8 pb-6 flex flex-col md:flex-row md:items-start md:justify-between md:gap-12 gap-4">
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

                            {/* reCAPTCHA-style widget */}
                            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-3 bg-gray-50 w-fit">
                                <div
                                    className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center cursor-pointer flex-shrink-0 bg-white"
                                    onClick={() => setChecked(!checked)}
                                >
                                    {checked && (
                                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm text-gray-700 select-none">I&apos;m not a robot</span>
                                <div className="ml-4 flex flex-col items-center">
                                    <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none">
                                        <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8z" fill="#4A90D9"/>
                                        <path d="M32 14c-9.9 0-18 8.1-18 18s8.1 18 18 18 18-8.1 18-18-8.1-18-18-18z" fill="#fff"/>
                                        <path d="M32 20v12l8 4" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                    <span className="text-[9px] text-gray-400 leading-none mt-0.5">reCAPTCHA</span>
                                    <span className="text-[7px] text-gray-300">Privacy - Terms</span>
                                </div>
                            </div>

                            {/* Sub button */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-full text-black font-bold text-lg lowercase tracking-wide border-2 border-black"
                                style={{ backgroundColor: "#FFD600" }}
                            >
                                sub
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Black bottom section — policy links */}
            <div className="bg-black py-6 px-4 flex flex-col md:flex-row md:justify-center md:flex-wrap items-center gap-4 md:gap-8">
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
        </footer>
    )
}

export default Footer
