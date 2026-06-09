"use client"
import React from "react"
import Link from "next/link"

const Subscriptions = () => {
    return (
        <section
            className="w-full py-12 px-4 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2d0a6b 0%, #6b0f8a 50%, #4a0060 100%)" }}
        >
            <div className="w-11/12 mx-auto max-w-lg">
                <h2 className="font-unbounded font-bold text-2xl md:text-3xl mb-8 leading-tight">
                    Subscriptions. All you need &mdash; in one box.
                </h2>
                <div className="flex flex-col gap-4">
                    {[
                        { num: "01", text: "Do your things, without wasting your time. Subscribe and choose your vapes with your own delivery schedule." },
                        { num: "02", text: "No need to waste time going to store — we deliver a box with vapes monthly. You can change flavours at any time." },
                        { num: "03", text: "No chance to accidentally buy a fake — we deliver vapes straight from the producer. 100% quality guarantee." },
                    ].map(({ num, text }) => (
                        <div key={num} className="bg-white text-black rounded-2xl p-4 flex gap-4 items-start">
                            <span className="font-unbounded font-black text-xl text-gray-800 min-w-[2rem]">{num}</span>
                            <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                    ))}
                </div>
                <Link href="/vapes"
                    className="mt-8 block w-full text-center py-4 rounded-full font-unbounded font-bold text-white text-sm uppercase"
                    style={{ background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)" }}
                >
                    order your box of vapes
                </Link>
            </div>
        </section>
    )
}

export default Subscriptions
