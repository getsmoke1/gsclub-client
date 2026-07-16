import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/how-to-use-hqd-cuvie`;

export const metadata: Metadata = {
  title: "How to Use HQD Cuvie Vape - Complete Guide 2026 | GetSmoke",
  description:
    "Step-by-step guide to using HQD Cuvie disposable vapes. Learn how the HQD Cuvie Plus, Bar, Glaze, and Mars work, how to charge them, and what to do when they stop hitting.",
  alternates: { canonical: PAGE_URL },
  keywords: ["how to use hqd cuvie", "hqd cuvie plus guide", "hqd vape not hitting", "how to charge hqd cuvie", "hqd cuvie blinking"],
  openGraph: {
    title: "How to Use HQD Cuvie Vape - Complete Guide",
    description: "Complete guide to HQD Cuvie disposable vapes: how they work, charging, blinking lights, and troubleshooting.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "How to Use HQD Cuvie" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the HQD Cuvie work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The HQD Cuvie is draw-activated - simply inhale through the mouthpiece and the device automatically fires the coil to create vapor. No buttons are needed to vape. The HQD Cuvie Plus, Bar, and Glaze models all work the same way.",
      },
    },
    {
      "@type": "Question",
      name: "Is the HQD Cuvie rechargeable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the model. The HQD Cuvie Plus (1,200 puffs) is not rechargeable - it is a true single-use disposable. Larger HQD models like the Cuvie Mars (8,000 puffs), Cuvie Glaze, and HQD Everest 25K include a USB-C charging port and rechargeable battery.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my HQD Cuvie blinking and not hitting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your HQD Cuvie is blinking: on rechargeable models (Mars, Glaze, Everest), blinking usually means the battery needs charging. Connect a USB-C cable. On non-rechargeable models (Cuvie Plus), blinking means the battery or e-liquid is depleted and the device is finished.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know when my HQD Cuvie is empty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the HQD Cuvie Plus (no screen), the flavor will become noticeably weaker, then disappear. On models with a display (Cuvie Mars, Everest), the e-liquid indicator shows the remaining level. When both battery and e-liquid reach zero, the device is finished.",
      },
    },
    {
      "@type": "Question",
      name: "What nicotine does HQD Cuvie use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HQD Cuvie devices use 5% (50mg) nicotine salt e-liquid - the same strength as most US disposable vapes. Nicotine salt delivers a smooth, fast-absorbing nicotine hit without harsh throat irritation.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use HQD Cuvie Disposable Vape",
  url: PAGE_URL,
  step: [
    { "@type": "HowToStep", position: 1, name: "Remove from packaging", text: "Take the HQD Cuvie out of its box. Remove the rubber mouthpiece cover if your model has one." },
    { "@type": "HowToStep", position: 2, name: "Check device type", text: "Confirm if your HQD model is rechargeable (USB-C port on bottom) or non-rechargeable. Cuvie Plus = non-rechargeable. Mars, Glaze, Everest = rechargeable." },
    { "@type": "HowToStep", position: 3, name: "Inhale to activate", text: "Place the mouthpiece to your lips and draw slowly. The HQD Cuvie activates automatically on inhalation. No button press required." },
    { "@type": "HowToStep", position: 4, name: "Charge when needed (rechargeable models)", text: "For rechargeable HQD models, connect USB-C cable when the battery indicator is low. Charge for 30-60 minutes." },
    { "@type": "HowToStep", position: 5, name: "Dispose responsibly", text: "When the flavor fades and the device no longer produces vapor, it is depleted. Dispose of the device per your local e-waste guidelines." },
  ],
};

export default function HowToUseHqdCuviePage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} strategy="beforeInteractive" />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/brands/hqd" className="hover:text-orange-500">HQD</Link>
          <span className="mx-2">/</span>
          <span>How to Use HQD Cuvie</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">How to Use HQD Cuvie Vape</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The <strong>HQD Cuvie</strong> series includes multiple disposable vape models from
          the compact Cuvie Plus (1,200 puffs) to the feature-rich HQD Everest 25K. This guide
          covers how all HQD Cuvie models work, charging, and what to do when your device stops
          hitting.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">HQD Cuvie Model Comparison</h2>
        <ol className="space-y-2 text-gray-700 mb-6">
          <li>1. <strong>HQD Cuvie Plus</strong> - 1,200 puffs, not rechargeable, compact pen-style</li>
          <li>2. <strong>HQD Cuvie Bar</strong> - 5,000 puffs, rechargeable USB-C, rectangular form</li>
          <li>3. <strong>HQD Cuvie Glaze</strong> - 12,000 puffs, rechargeable, dual mesh coil</li>
          <li>4. <strong>HQD Cuvie Mars</strong> - 8,000 puffs, rechargeable, LED display</li>
          <li>5. <strong>HQD Everest 25K</strong> - 25,000 puffs, rechargeable, full digital display</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Step-by-Step: Using Your HQD Cuvie</h2>
        <ol className="space-y-4 mb-8">
          {howToSchema.step.map((step) => (
            <li key={step.position} className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{step.position}</span>
              <div>
                <p className="font-semibold text-gray-900">{step.name}</p>
                <p className="text-gray-600 text-sm mt-0.5">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">HQD Cuvie Blinking - What It Means</h2>
        <ol className="space-y-2 text-gray-700 mb-6">
          <li>1. <strong>3 blinks then stops</strong> - Battery depleted. Charge if rechargeable; dispose if not.</li>
          <li>2. <strong>Continuous blinking while charging</strong> - Normal charging indicator on some models.</li>
          <li>3. <strong>Blinks when inhaling, no vapor</strong> - E-liquid depleted. Device is finished.</li>
          <li>4. <strong>Fast blinking 10+ times</strong> - Short circuit protection triggered. Let device rest 5 minutes.</li>
        </ol>

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
          <p className="font-semibold mb-2">Shop HQD Cuvie at GetSmoke</p>
          <p className="text-sm text-gray-600 mb-3">Full HQD lineup - Cuvie Plus, Bar, Glaze, Mars, Everest 25K. Free shipping over $89. Adults 21+ only.</p>
          <Link href="/brands/hqd" className="inline-block bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
            Shop HQD Vapes
          </Link>
        </div>
      </main>
    </>
  );
}
