"use client"
import React from "react"
import Link from "next/link"

const InstagramFeed = () => {
    return (
        <section className="w-full overflow-hidden relative" style={{ background: "#f0e8ff" }}>
            {/* Grid of product images styled like Instagram posts */}
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ minHeight: "300px" }}>
                {[
                    "https://getsmoke.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-15-at-10.43.25-PM-300x377.jpeg",
                    "https://getsmoke.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-19-at-7.15.54-PM-1-300x377.jpeg",
                    "https://getsmoke.com/wp-content/uploads/2025/01/Pack-of-10Geek-BAr-Pulse-300x377.jpg",
                    "https://getsmoke.com/wp-content/uploads/2025/02/Pack-of-10HQD-Cuvie-BAr-300x377.jpg",
                ].map((src, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden bg-gray-200">
                        <img src={src} alt="GetSmoke on Instagram" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2">
                            <span className="text-white text-xs font-unbounded font-bold bg-black/50 px-2 py-1 rounded">getsmoke&#x2122;</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center py-8 bg-white">
                <Link
                    href="https://www.instagram.com/getsmoke.shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-unbounded font-bold text-sm uppercase px-10 py-4 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
                >
                    Follow us on Instagram
                </Link>
            </div>
        </section>
    )
}

export default InstagramFeed
