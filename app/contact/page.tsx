import Contact from '@/components/Contact/Contact'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | GetSmoke",
  description: "Get in touch with GetSmoke. Questions about your order, products, or shipping? We're here to help. 21+ only.",
  alternates: { canonical: "https://getsmoke.com/contact" },
}

const page = () => {
  return (
    <div className=' w-full'>
      <Contact />
    </div>
  )
}

export default page
