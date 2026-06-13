import React from "react"
import Link from "next/link"
import Image from "next/image"

const InstagramFeed = () => {
    return (
        <section className="w-full bg-white py-2 px-4">
            <Link
                href="https://www.instagram.com/getsmoke.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <Image
                    src="/instagram/ig_banner.webp"
                    alt="Follow us on Instagram"
                    width={585}
                    height={1080}
                    className="w-full h-auto rounded-3xl"
                    priority={false}
                />
            </Link>
        </section>
    )
}

export default InstagramFeed
