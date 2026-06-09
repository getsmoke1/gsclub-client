"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
    return (
        <section
            className="w-full relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #ffffff 0%, #ddf1ff 40%, #aaddff 80%, #88ccff 100%)",
                minHeight: "520px"
            }}
        >
            {/* Text overlay */}
            <div className="relative z-10 pt-10 px-5 md:px-10 text-left max-w-xs">
                <h1 className="font-unbounded font-black text-3xl md:text-4xl text-black leading-tight">
                    Welcome to our<br />
                    <span className="text-4xl md:text-5xl">VAPESHOP</span>
                </h1>
                <div
                    className="inline-block mt-4 px-5 py-2 font-unbounded font-bold text-sm text-black"
                    style={{ backgroundColor: "#ffc42e", borderRadius: "6px" }}
                >
                    No more trips to stores
                </div>
            </div>

            {/* Hero product image — full width like getsmoke.com slider */}
            <div className="relative w-full" style={{ marginTop: "-20px" }}>
                <Image
                    src="https://getsmoke.com/wp-content/uploads/2024/07/getsmoke-1.png"
                    alt="Welcome to GetSmoke Vapeshop"
                    width={1920}
                    height={700}
                    className="w-full h-auto"
                    priority
                    unoptimized
                />
            </div>
        </section>
    )
}

export default Hero
