"use client"
import React from 'react'
import Image from 'next/image'

const VapeSubscription = () => {
    return (
        <section
            className="w-full overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1a0533 0%, #2d0a4e 35%, #1a1040 70%, #0d1a3e 100%)',
            }}
        >
            {/* Header — HTML only */}
            <div className="w-11/12 mx-auto pt-10 pb-2">
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

            {/* Circles + text pills — single image from Figma, no HTML duplication */}
            <Image
                src="/subscription/circles_and_pills.webp"
                alt="Vape subscription benefits"
                width={712}
                height={1525}
                className="w-full h-auto"
                sizes="100vw"
            />
        </section>
    )
}

export default VapeSubscription
