"use client"
import React from 'react'
import Image from 'next/image'

const circles = [
    {
        img: '/subscription/circle1.png',
        w: 712,
        h: 365,
        text: <>Subscribe to get favourite flavour <em style={{ color: '#fe3500' }}>everytime.</em> Change flavor at any time.</>,
    },
    {
        img: '/subscription/circle2.png',
        w: 712,
        h: 360,
        text: <>No need to visit the store - we will deliver <em style={{ color: '#fe3500' }}>a free vape box monthly.</em></>,
    },
    {
        img: '/subscription/circle3.png',
        w: 712,
        h: 360,
        text: <>Only <em style={{ color: '#fe3500' }}>original</em> vapes from the producer - 100% quality guarantee.</>,
    },
]

const VapeSubscription = () => {
    return (
        <section
            className="w-full overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1a0533 0%, #2d0a4e 35%, #1a1040 70%, #0d1a3e 100%)',
            }}
        >
            {/* Header from Figma */}
            <div className="w-full">
                <Image
                    src="/subscription/header.png"
                    alt="Vape Subscription - Make your life easier"
                    width={712}
                    height={295}
                    className="w-full h-auto"
                    sizes="100vw"
                />
            </div>

            {/* 3 circles + text pills */}
            {circles.map((item, i) => (
                <div key={i} className="w-full flex flex-col items-center">
                    {/* Circle image from Figma */}
                    <Image
                        src={item.img}
                        alt={`Subscription circle ${i + 1}`}
                        width={item.w}
                        height={item.h}
                        className="w-full h-auto"
                        sizes="100vw"
                    />
                    {/* White text pill */}
                    <div className="bg-white rounded-2xl px-5 py-3 mx-6 mb-8 shadow-lg max-w-xs -mt-2">
                        <p className="text-black text-sm leading-snug">{item.text}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default VapeSubscription
