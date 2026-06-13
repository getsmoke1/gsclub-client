"use client"
import React from 'react'
import Image from 'next/image'

const circles = [
    {
        img: '/subscription/circle1.png',
        text: <>Subscribe to get favourite flavour <em style={{ color: '#fe3500', fontStyle: 'normal' }}>everytime.</em> Change flavor at any time.</>,
    },
    {
        img: '/subscription/circle2.png',
        text: <>No need to visit the store - we will deliver <em style={{ color: '#fe3500' }}>a free vape box monthly.</em></>,
    },
    {
        img: '/subscription/circle3.png',
        text: <>Only <em style={{ color: '#fe3500' }}>original</em> vapes from the producer - 100% quality guarantee.</>,
    },
]

const VapeSubscription = () => {
    return (
        <section
            className="w-full overflow-hidden py-10"
            style={{
                background: 'linear-gradient(180deg, #1a0533 0%, #2d0a4e 35%, #1a1040 70%, #0d1a3e 100%)',
            }}
        >
            {/* Header — HTML only, no image */}
            <div className="w-11/12 mx-auto mb-8">
                <h2 className="font-unbounded font-black text-3xl text-white uppercase leading-tight">
                    VAPE{' '}
                    <span style={{ color: '#FFD600' }}>SUBSCRIPTION</span>
                </h2>
                <p className="font-unbounded font-bold text-2xl text-white italic mt-1">
                    Make your life easier
                </p>
                <div className="flex items-start gap-2 mt-4">
                    <span className="text-2xl leading-none font-thin" style={{ color: '#fe3500' }}>{'{'}</span>
                    <p className="text-white text-sm">
                        Save on time, subscribe for monthly delivery.{' '}
                        <strong>Free shipping for orders $89+</strong>
                    </p>
                </div>
            </div>

            {/* 3 circles + text pills */}
            {circles.map((item, i) => (
                <div key={i} className="w-full flex flex-col items-center mb-6">
                    {/* Circle image — only the circle, no text */}
                    <div className="w-full">
                        <Image
                            src={item.img}
                            alt={`Subscription flavour ${i + 1}`}
                            width={712}
                            height={350}
                            className="w-full h-auto"
                            sizes="100vw"
                        />
                    </div>
                    {/* White text pill — HTML only */}
                    <div className="bg-white rounded-2xl px-5 py-3 mx-6 shadow-lg max-w-xs -mt-2">
                        <p className="text-black text-sm leading-snug">{item.text}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default VapeSubscription
