"use client"
import React from 'react'
import Link from 'next/link'

const benefits = [
    {
        text: 'Subscribe to get favourite flavour everytime. Change flavor at any time.',
    },
    {
        text: 'No need to visit the store - we will deliver a free vape box monthly.',
    },
    {
        text: 'Only original vapes from the producer - 100% quality guarantee.',
    },
]

const VapeSubscription = () => {
    return (
        <section
            className="w-full py-12 px-4 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1a0533 0%, #2d0a4e 30%, #1a1040 60%, #0d1a3e 100%)',
            }}
        >
            {/* Decorative blur blobs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #e040fb, transparent)' }} />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

            <div className="relative z-10 max-w-lg mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="font-unbounded font-bold text-2xl md:text-3xl text-white leading-tight">
                        VAPE{' '}
                        <span style={{ color: '#fe3500' }}>SUBSCRIPTION</span>
                    </h2>
                    <h3 className="font-unbounded font-bold text-xl md:text-2xl text-white mt-1">
                        Make your life easier
                    </h3>
                    <div className="flex items-start gap-3 mt-4">
                        <span className="text-white/60 text-3xl leading-none font-thin mt-1">{'{'}</span>
                        <p className="text-white/80 text-sm md:text-base">
                            Save on time, subscribe for monthly delivery.{' '}
                            <strong className="text-white">Free shipping for orders $89+</strong>
                        </p>
                    </div>
                </div>

                {/* Benefits with circles */}
                <div className="space-y-6">
                    {benefits.map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                            {/* Placeholder circle for product image */}
                            <div
                                className="w-40 h-40 rounded-full flex items-center justify-center"
                                style={{
                                    background: i === 0
                                        ? 'radial-gradient(circle, #c0392b, #922b21)'
                                        : i === 1
                                        ? 'radial-gradient(circle, #f39c12, #d68910)'
                                        : 'radial-gradient(circle, #8e44ad, #6c3483)',
                                }}
                            >
                                <span className="text-white text-4xl">
                                    {i === 0 ? '🚬' : i === 1 ? '🌿' : '🍬'}
                                </span>
                            </div>

                            {/* Text pill */}
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 max-w-xs text-center">
                                <p className="text-white text-sm">{b.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <Link
                        href="/subscriptions"
                        className="inline-block font-unbounded font-bold text-sm px-8 py-3 rounded-full text-white uppercase transition-all hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                    >
                        Subscribe Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default VapeSubscription
