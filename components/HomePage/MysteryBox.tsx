"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const MysteryBox = () => {
    return (
        <section
            className="w-full py-12 px-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0a0a3a 0%, #1a0030 40%, #3a0010 100%)" }}
        >
            <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center gap-8">
                {/* Left: text */}
                <div className="flex-1 text-white">
                    <h2 className="font-unbounded font-black text-5xl md:text-7xl leading-none text-white/20 uppercase tracking-tighter">
                        MYST<br/>ERY<br/>BOX
                    </h2>
                    <p className="text-base md:text-lg mt-4 text-gray-300">
                        For those who look for new experiences...
                    </p>
                    <Link href="/vapes"
                        className="mt-6 inline-block px-8 py-3 rounded-full font-unbounded font-bold text-white text-sm uppercase"
                        style={{ background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)" }}
                    >
                        Order the box
                    </Link>
                </div>

                {/* Right: box image */}
                <div className="flex-1 flex justify-center">
                    <Image
                        src="https://getsmoke.com/wp-content/uploads/2024/07/Mystery-box-2.png"
                        alt="GetSmoke Mystery Box - Great box for great person"
                        width={386}
                        height={602}
                        className="max-w-[280px] md:max-w-[340px] w-full h-auto"
                        unoptimized
                    />
                </div>
            </div>
        </section>
    )
}

export default MysteryBox
