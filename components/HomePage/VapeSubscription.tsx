import React from 'react'
import Image from 'next/image'

const VapeSubscription = () => {
    return (
        <section className="w-full overflow-hidden">
            <Image
                src="/subscription/full_section.webp"
                alt="Vape Subscription - Make your life easier"
                width={712}
                height={1965}
                className="w-full h-auto block"
                sizes="100vw"
            />
        </section>
    )
}

export default VapeSubscription
