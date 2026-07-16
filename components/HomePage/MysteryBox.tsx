"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"

const MysteryBox = () => {
    return (
        <section
            className="w-11/12 mx-auto my-10 rounded-3xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a0a3a 0%, #3a0a1a 60%, #0a0a1a 100%)" }}
        >
            <div className="flex flex-col md:flex-row items-center gap-0">
                {/* Left: text */}
                <div className="flex-1 p-8 md:p-12 text-white">
                    <p className="text-gray-300 text-sm mb-3">For those who look for new experiences...</p>
                    <h2 className="font-unbounded font-black text-2xl md:text-3xl leading-tight mb-6">
                        Order the box with 4 mystery flavours
                    </h2>
                    <Link href="/vapes"
                        className="inline-block w-full md:w-auto text-center px-10 py-4 rounded-full font-unbounded font-bold text-white text-sm uppercase"
                        style={{ background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)" }}
                    >
                        order your mystery box
                    </Link>
                </div>
                {/* Right: box image */}
                <div className="md:self-end">
                    <Image
                        src="https://getsmoke.com/wp-content/uploads/2024/07/Mystery-box-2.png"
                        alt="GetSmoke Mystery Box"
                        width={300}
                        height={460}
                        className="max-w-[200px] md:max-w-[260px] mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default MysteryBox
