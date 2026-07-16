import React from "react"
import Link from "next/link"
import Image from "next/image"

const InstagramFeed = () => {
    return (
        <section className="w-full bg-white py-2 px-2">
            <Link
                href="https://www.instagram.com/getsmoke.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {/* Mobile banner */}
                <Image
                    src="/instagram/ig_banner.webp"
                    alt="Follow us on Instagram"
                    width={585}
                    height={1080}
                    className="w-full h-auto rounded-3xl md:hidden"
                    priority={false}
                />
                {/* Desktop banner */}
                <Image
                    src="/instagram-banner-desktop.webp"
                    alt="Welcome to our VapeShop - Follow us on Instagram"
                    width={1200}
                    height={400}
                    className="hidden md:block w-full h-auto rounded-3xl"
                    priority={false}
                />
            </Link>
        </section>
    )
}

export default InstagramFeed
