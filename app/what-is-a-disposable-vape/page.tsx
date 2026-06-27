import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/what-is-a-disposable-vape`;

export const metadata: Metadata = {
  title: "What Is a Disposable Vape? Complete Guide 2026 | GetSmoke",
  description:
    "A disposable vape is a single-use or rechargeable electronic cigarette pre-filled with e-liquid. Learn how they work, how long they last, and what to look for when buying.",
  alternates: { canonical: PAGE_URL },
  keywords: ["what is a disposable vape", "how does a disposable vape work", "disposable vape guide", "disposable e-cigarette explained"],
  openGraph: {
    title: "What Is a Disposable Vape? Complete Guide 2026",
    description: "Everything you need to know about disposable vapes - how they work, puff counts, nicotine levels, and the best brands.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "What Is a Disposable Vape" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a disposable vape?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A disposable vape is a pre-filled electronic cigarette that comes ready to use with no refilling or recharging required (for smaller models). Modern high-puff disposables (5,000+ puffs) are rechargeable via USB-C but still pre-filled with e-liquid. They are designed to be discarded once the e-liquid runs out.",
      },
    },
    {
      "@type": "Question",
      name: "How does a disposable vape work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A disposable vape works by heating e-liquid with a coil powered by a built-in battery. When you inhale through the mouthpiece, the device activates automatically (draw-activated), heating the e-liquid into vapor. The vapor is inhaled and delivers nicotine (or zero nicotine in 0% models).",
      },
    },
    {
      "@type": "Question",
      name: "How many puffs does a disposable vape last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Disposable vapes range from 1,200 puffs (small devices like HQD Cuvie Plus) to 70,000 puffs (premium devices like Lost Mary Nera Fullview). The most popular range is 15,000-25,000 puffs, which lasts the average user 1-3 months.",
      },
    },
    {
      "@type": "Question",
      name: "Are disposable vapes rechargeable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most modern high-puff disposable vapes (5,000 puffs and above) include a USB-C charging port. The battery needs to be recharged multiple times before the e-liquid runs out. Smaller disposables (under 3,000 puffs) are typically not rechargeable.",
      },
    },
    {
      "@type": "Question",
      name: "What nicotine strength do disposable vapes come in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most disposable vapes in the US come in 5% (50mg) nicotine salt - the most common strength. Some brands offer 3% (30mg) for lighter users, and 0% (nicotine-free) for those who want vapor without nicotine.",
      },
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  name: "What Is a Disposable Vape?",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".definition-lead", "h2"],
  },
};

export default function WhatIsDisposableVapePage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="speakable-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} strategy="beforeInteractive" />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-orange-500">Blog</Link>
          <span className="mx-2">/</span>
          <span>What Is a Disposable Vape</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">What Is a Disposable Vape?</h1>
        <p className="definition-lead text-lg text-gray-600 mb-8 leading-relaxed">
          A <strong>disposable vape</strong> is a pre-filled electronic cigarette that comes ready to use
          straight out of the package. Unlike refillable pod systems or mods, disposable vapes require no
          setup - you simply inhale and the device activates automatically.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">How Does a Disposable Vape Work?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Every disposable vape contains three core components:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li><strong>Battery</strong> - powers the heating element. Rechargeable via USB-C on most modern devices.</li>
          <li><strong>E-liquid reservoir</strong> - pre-filled with nicotine salt e-liquid and food-grade flavorings.</li>
          <li><strong>Mesh coil</strong> - heats the e-liquid into vapor when you draw on the mouthpiece.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-6">
          The device is draw-activated - no buttons needed. Inhale through the mouthpiece and the coil fires,
          vaporizing the e-liquid instantly.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">How Many Puffs Does a Disposable Vape Last?</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">Puff Count</th>
                <th className="text-left p-3 border border-gray-200">Average Duration</th>
                <th className="text-left p-3 border border-gray-200">Example Models</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border border-gray-200">1,200-3,500</td><td className="p-3 border border-gray-200">3-10 days</td><td className="p-3 border border-gray-200">HQD Cuvie Plus, Fume Extra</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">5,000-9,000</td><td className="p-3 border border-gray-200">2-4 weeks</td><td className="p-3 border border-gray-200">Juicy Bar JB5000, RAZ TN9000</td></tr>
              <tr><td className="p-3 border border-gray-200">15,000-20,000</td><td className="p-3 border border-gray-200">1-2 months</td><td className="p-3 border border-gray-200">Geek Bar Pulse, Lost Mary MO20000</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">25,000+</td><td className="p-3 border border-gray-200">2-4 months</td><td className="p-3 border border-gray-200">Geek Bar Pulse X, RAZ DC25000</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-3">Nicotine Strengths Explained</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Disposable vapes in the US use <strong>nicotine salt</strong> (nic salt) formulations that deliver
          smoother hits at higher nicotine concentrations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li><strong>5% (50mg)</strong> - most common, equivalent to approximately 1 cigarette per 5-10 puffs. Best for current smokers.</li>
          <li><strong>3% (30mg)</strong> - lighter option for moderate users or those reducing nicotine.</li>
          <li><strong>0% (nicotine-free)</strong> - all the flavor and vapor, zero nicotine. See our <Link href="/nicotine-free-vapes" className="text-orange-500 hover:underline">0% nicotine vapes collection</Link>.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-3">Best Disposable Vape Brands in 2026</h2>
        <p className="text-gray-700 mb-4">The top-rated disposable vape brands currently available at GetSmoke:</p>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li><Link href="/brands/geek-bar" className="text-orange-500 font-semibold hover:underline">Geek Bar</Link> - best for bold flavors and dual-mode vapor (Pulse X)</li>
          <li><Link href="/brands/raz" className="text-orange-500 font-semibold hover:underline">RAZ</Link> - best for flavor accuracy and premium build quality</li>
          <li><Link href="/brands/lost-mary" className="text-orange-500 font-semibold hover:underline">Lost Mary</Link> - best for high puff counts and refined flavors</li>
          <li><Link href="/brands/hqd" className="text-orange-500 font-semibold hover:underline">HQD</Link> - best for value and wide model variety</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-orange-50 border border-orange-200 rounded-2xl">
          <p className="font-semibold mb-2">Shop Disposable Vapes at GetSmoke</p>
          <p className="text-sm text-gray-600 mb-3">Browse 900+ disposable vapes. Free shipping on orders over $89. Adults 21+ only.</p>
          <Link href="/vapes" className="inline-block bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
            Shop All Vapes
          </Link>
        </div>
      </main>
    </>
  );
}
