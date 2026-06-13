"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const circles = [
    {
        img: '/subscription/circle1.png',
        text: (
            <>
                Subscribe to get favourite flavour{' '}
                <em className="not-italic" style={{ color: '#fe3500' }}>everytime.</em>{' '}
                Change flavor at any time.
            </>
        ),
    },
    {
        img: '/subscription/circle2.png',
        text: (
            <>
                No need to visit the store - we will deliver{' '}
                <em style={{ color: '#fe3500' }}>a free vape box monthly.</em>
            </>
        ),
    },
    {
        img: '/subscription/circle3.png',
        text: (
            <>
                Only <em style={{ color: '#fe3500' }}>original</em> vapes from the producer
                {' '}- 100% quality guarantee.
            </>
        ),
    },
]

const VapeSubscription = () => {
    return (
        <section
            className="w-full relative overflow-hidden py-10"
            style={{
                backgroundImage: 'url(/subscription/bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
            }}
        >
            {/* Header text */}
            <div className="relative z-10 w-11/12 mx-auto mb-8">
                <h2 className="font-unbounded font-black text-3xl md:text-4xl text-white uppercase leading-tight">
                    VAPE{' '}
                    <span style={{ color: '#FFD600' }}>SUBSCRIPTION</span>
                </h2>
                <p className="font-unbounded font-bold text-xl md:text-2xl text-white italic mt-1">
                    Make your life easier
                </p>
                <div className="flex items-start gap-2 mt-4">
                    <span className="text-2xl leading-none" style={{ color: '#fe3500', fontWeight: 100 }}>{'{'}</span>
                    <p className="text-white text-sm md:text-base">
                        Save on time, subscribe for monthly delivery.{' '}
                        <strong>Free shipping for orders $89+</strong>
                    </p>
                </div>
            </div>

            {/* 3 circles with text cards */}
            <div className="relative z-10 w-full flex flex-col items-center gap-0">
                {circles.map((item, i) => (
                    <div key={i} className="w-full flex flex-col items-center">
                        {/* Circle image */}
                        <div className="w-full max-w-sm relative" style={{ aspectRatio: '712/450' }}>
                            <Image
                                src={item.img}
                                alt={`Subscription flavour ${i + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                        </div>
                        {/* White text pill */}
                        <div className="bg-white rounded-2xl px-5 py-3 mx-6 -mt-4 mb-6 shadow-lg max-w-xs">
                            <p className="text-black text-sm md:text-base leading-snug">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default VapeSubscription
