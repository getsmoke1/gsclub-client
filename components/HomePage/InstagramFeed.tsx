"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"

const posts = [
    "https://getsmoke.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-19-at-7.15.54-PM-1.jpeg",
    "https://getsmoke.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-15-at-10.43.25-PM.jpeg",
    "https://getsmoke.com/wp-content/uploads/2025/01/Pack-of-10Geek-BAr-Pulse-300x377.jpg",
]

const InstagramFeed = () => {
    return (
        <section
            className="w-full py-10 px-4 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #6a0dad 0%, #4a00e0 40%, #00bfff 100%)',
            }}
        >
            {/* Heading */}
            <div className="relative z-10 mb-8 max-w-sm">
                <h2 className="font-unbounded font-bold text-2xl md:text-3xl text-white leading-tight uppercase">
                    INHALE THE GOOD VIBES — FOLLOW US ON INSTAGRAM FOR THE LATEST DROPS!
                </h2>
                <Link
                    href="https://www.instagram.com/getsmoke.shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-5 font-unbounded font-bold text-sm text-white uppercase px-8 py-3 rounded-full bg-black/60 hover:bg-black transition-colors"
                >
                    FOLLOW
                </Link>
            </div>

            {/* Instagram post mockups */}
            <div className="relative z-10 flex gap-3 overflow-hidden justify-center">
                {posts.map((src, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/20"
                        style={{
                            width: i === 1 ? '42vw' : '36vw',
                            maxWidth: i === 1 ? '180px' : '155px',
                            transform: i === 0 ? 'rotate(-3deg)' : i === 2 ? 'rotate(3deg)' : 'none',
                        }}
                    >
                        {/* IG post header */}
                        <div className="bg-white px-2 py-1.5 flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" />
                            <span className="text-xs font-bold text-black">getsmoke.shop</span>
                        </div>
                        {/* Image */}
                        <div className="relative" style={{ paddingBottom: '125%' }}>
                            <Image
                                src={src}
                                alt="GetSmoke Instagram"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        {/* IG post footer */}
                        <div className="bg-white px-2 py-1.5">
                            <div className="flex gap-2 text-gray-400 text-sm mb-1">
                                <span>♡</span><span>💬</span><span>✈</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-1">
                                <strong className="text-black">getsmoke.shop</strong> Latest drops!
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default InstagramFeed
