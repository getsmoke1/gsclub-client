"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"

const InstagramFeed = () => {
    return (
        <section className="w-full bg-white py-4 px-4">
            {/* Rounded card with purple-to-cyan gradient */}
            <div
                className="relative rounded-3xl overflow-hidden w-full"
                style={{
                    background: "linear-gradient(135deg, #7B2FBE 0%, #4A90C4 50%, #5BC8C8 100%)",
                    minHeight: "380px",
                }}
            >
                {/* Text block - top left */}
                <div className="px-5 pt-7 pb-0 relative z-10 max-w-[70%]">
                    <p className="font-unbounded font-bold text-white text-lg leading-snug uppercase">
                        INHALE THE GOOD VIBES - FOLLOW US ON INSTAGRAM FOR THE LATEST DROPS!
                    </p>
                    <Link
                        href="https://www.instagram.com/getsmoke.shop/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-5 px-7 py-3 rounded-full font-unbounded font-bold text-white text-sm uppercase"
                        style={{ background: "rgba(60,20,100,0.65)" }}
                    >
                        FOLLOW
                    </Link>
                </div>

                {/* Two phone mockups - bottom, angled */}
                <div className="absolute bottom-0 right-0 flex items-end" style={{ width: "65%", height: "280px" }}>
                    {/* Left phone - slightly tilted left */}
                    <div
                        className="absolute bottom-0"
                        style={{
                            left: "5%",
                            width: "52%",
                            transform: "rotate(-6deg)",
                            transformOrigin: "bottom center",
                            zIndex: 2,
                        }}
                    >
                        <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                            {/* IG header */}
                            <div className="bg-white flex items-center gap-1.5 px-2 py-1.5">
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                                <span className="text-[8px] font-bold text-black leading-none">getsmoke.shop</span>
                            </div>
                            <Image
                                src="/instagram/post1.jpg"
                                alt="Instagram post 1"
                                width={200}
                                height={200}
                                className="w-full object-cover"
                                style={{ aspectRatio: "1/1" }}
                            />
                            {/* IG footer */}
                            <div className="bg-white px-2 py-1.5 flex gap-2">
                                <span className="text-[9px]">♥</span>
                                <span className="text-[9px]">💬</span>
                                <span className="text-[9px]">↗</span>
                            </div>
                        </div>
                    </div>

                    {/* Right phone - slightly tilted right */}
                    <div
                        className="absolute bottom-0"
                        style={{
                            right: "2%",
                            width: "48%",
                            transform: "rotate(6deg)",
                            transformOrigin: "bottom center",
                            zIndex: 1,
                        }}
                    >
                        <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                            {/* IG header */}
                            <div className="bg-white flex items-center gap-1.5 px-2 py-1.5">
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                                <span className="text-[8px] font-bold text-black leading-none">getsmoke.shop</span>
                            </div>
                            <Image
                                src="/instagram/post2.jpg"
                                alt="Instagram post 2"
                                width={180}
                                height={180}
                                className="w-full object-cover"
                                style={{ aspectRatio: "1/1" }}
                            />
                            {/* IG footer */}
                            <div className="bg-white px-2 py-1.5 flex gap-2">
                                <span className="text-[9px]">♥</span>
                                <span className="text-[9px]">💬</span>
                                <span className="text-[9px]">↗</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InstagramFeed
