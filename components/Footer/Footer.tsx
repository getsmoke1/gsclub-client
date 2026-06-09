import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-[#090808] text-white font-unbounded">
            {/* Warning bar */}
            <div className="bg-[#fe3500] py-2 px-4 text-center text-xs font-medium">
                WARNING: These products contain nicotine. Nicotine is an addictive chemical. Must be 21+ to purchase.
            </div>

            <div className="w-11/12 mx-auto py-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Logo + tagline */}
                    <div className="flex flex-col gap-4">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="GetSmoke"
                                width={180}
                                height={30}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-xs max-w-xs leading-relaxed">
                            Your one-stop online vape shop. Top brands, best prices, fast US shipping.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-1">Information</h3>
                        {[
                            { label: 'Privacy Policy', href: '/privacy-policy' },
                            { label: 'Terms & Conditions', href: '/terms-conditions' },
                            { label: 'Return Policy', href: '/return-policy' },
                            { label: 'Shipping Policy', href: '/shipping-policy' },
                            { label: 'Contact', href: '/contact' },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href}
                                className="text-gray-300 hover:text-white text-xs transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Shop */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-1">Shop</h3>
                        {[
                            { label: 'All Disposables', href: '/vapes' },
                            { label: 'Geek Bar', href: '/brand/geek-bar' },
                            { label: 'Lost Mary', href: '/brand/lost-mary' },
                            { label: 'RAZ Vape', href: '/brand/raz' },
                            { label: 'HQD', href: '/brand/hqd' },
                            { label: 'FUME', href: '/brand/fume' },
                            { label: 'Hookah', href: '/hookah' },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href}
                                className="text-gray-300 hover:text-white text-xs transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Account */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-1">Account</h3>
                        {[
                            { label: 'My Account', href: '/my-account' },
                            { label: 'Order History', href: '/my-account/orders' },
                            { label: 'Blog', href: '/blog' },
                            { label: 'Contact Us', href: '/contact' },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href}
                                className="text-gray-300 hover:text-white text-xs transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} GetSmoke. All rights reserved.</p>
                    <p>Must be 21 years or older to purchase.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
