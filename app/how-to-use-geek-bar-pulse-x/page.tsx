import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/how-to-use-geek-bar-pulse-x`;

export const metadata: Metadata = {
  title: "How to Use Geek Bar Pulse X - Complete Guide | GetSmoke",
  description:
    "Step-by-step guide on how to use the Geek Bar Pulse X. Learn how to switch between Regular and Pulse mode, charge it, read the display, and troubleshoot common issues.",
  alternates: { canonical: PAGE_URL },
  keywords: ["how to use geek bar pulse x", "geek bar pulse x guide", "geek bar pulse x pulse mode", "how to charge geek bar pulse x", "geek bar pulse x modes"],
  openGraph: {
    title: "How to Use Geek Bar Pulse X - Complete Guide",
    description: "Complete guide to using the Geek Bar Pulse X: Regular vs Pulse mode, charging, display, and troubleshooting.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "How to Use Geek Bar Pulse X" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you switch between Regular and Pulse mode on Geek Bar Pulse X?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To switch between Regular and Pulse mode on the Geek Bar Pulse X, press the button on the side of the device. One press switches modes. Regular mode is for normal vaping; Pulse mode fires the coil in rapid bursts for increased vapor production and a stronger hit. The display shows which mode is active.",
      },
    },
    {
      "@type": "Question",
      name: "How do I charge the Geek Bar Pulse X?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Charge the Geek Bar Pulse X using a USB-C cable connected to any USB power source. The device's screen shows the battery level. Charging typically takes 30-60 minutes. Do not use the device while it is charging.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know when my Geek Bar Pulse X is empty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Geek Bar Pulse X has a digital display showing both battery level and e-liquid level. When the e-liquid indicator shows near zero, the device is almost empty. The vapor will also decrease in flavor intensity as the e-liquid depletes.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my Geek Bar Pulse X not hitting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your Geek Bar Pulse X is not hitting, check: 1) Battery level - charge if low. 2) E-liquid level - if empty, the device is finished. 3) Draw technique - inhale slowly and steadily for 2-3 seconds. 4) If the device blinks repeatedly, the battery is dead or the device is depleted.",
      },
    },
    {
      "@type": "Question",
      name: "How many puffs does the Geek Bar Pulse X last in Pulse mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Pulse mode, the Geek Bar Pulse X uses e-liquid faster due to higher power output. The device is rated for 25,000 puffs in Regular mode. Using primarily Pulse mode will reduce total puff count, though exact reduction depends on usage patterns.",
      },
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use Geek Bar Pulse X",
  url: PAGE_URL,
  description: "Step-by-step guide to using the Geek Bar Pulse X disposable vape",
  step: [
    { "@type": "HowToStep", position: 1, name: "Remove from packaging", text: "Take the Geek Bar Pulse X out of its box and remove the silicone mouthpiece cover if present." },
    { "@type": "HowToStep", position: 2, name: "Check battery and e-liquid", text: "The screen on the front shows battery level (icon on left) and e-liquid level (icon on right). Both should be full on a new device." },
    { "@type": "HowToStep", position: 3, name: "Choose your mode", text: "Press the side button once to select Regular mode (steady vapor) or Pulse mode (burst firing for bigger hits and clouds)." },
    { "@type": "HowToStep", position: 4, name: "Inhale to vape", text: "Place the mouthpiece to your lips and inhale slowly and steadily. The device is draw-activated - no button needed to vape." },
    { "@type": "HowToStep", position: 5, name: "Charge when needed", text: "Connect USB-C cable when the battery indicator shows low. Charge for 30-60 minutes before resuming use." },
  ],
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".definition-lead", "h2"] },
};

export default function HowToUseGeekBarPulseXPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} strategy="beforeInteractive" />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/brands/geek-bar" className="hover:text-orange-500">Geek Bar</Link>
          <span className="mx-2">/</span>
          <span>How to Use Geek Bar Pulse X</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">How to Use Geek Bar Pulse X</h1>
        <p className="definition-lead text-lg text-gray-600 mb-8 leading-relaxed">
          The <strong>Geek Bar Pulse X</strong> is a 25,000-puff rechargeable disposable vape with two
          distinct vaping modes: Regular and Pulse. This guide covers everything from first use to
          troubleshooting common issues.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Step-by-Step: First Use</h2>
        <ol className="space-y-4 mb-8">
          {speakableSchema.step.map((step) => (
            <li key={step.position} className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{step.position}</span>
              <div>
                <p className="font-semibold text-gray-900">{step.name}</p>
                <p className="text-gray-600 text-sm mt-0.5">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">Regular Mode vs Pulse Mode</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">Feature</th>
                <th className="text-left p-3 border border-gray-200">Regular Mode</th>
                <th className="text-left p-3 border border-gray-200">Pulse Mode</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border border-gray-200">Vapor output</td><td className="p-3 border border-gray-200">Moderate, consistent</td><td className="p-3 border border-gray-200">High, burst-style</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Flavor intensity</td><td className="p-3 border border-gray-200">Smooth, all-day</td><td className="p-3 border border-gray-200">Intense, bold</td></tr>
              <tr><td className="p-3 border border-gray-200">Battery drain</td><td className="p-3 border border-gray-200">Slower</td><td className="p-3 border border-gray-200">Faster</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Best for</td><td className="p-3 border border-gray-200">All-day vaping</td><td className="p-3 border border-gray-200">Sessions, clouds</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-3">How to Charge Geek Bar Pulse X</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The Geek Bar Pulse X charges via <strong>USB-C</strong>. Use any standard USB-C cable:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Connect USB-C cable to the port on the bottom of the device</li>
          <li>The screen will show a charging animation</li>
          <li>Full charge takes approximately 30-60 minutes</li>
          <li>The battery indicator returns to full when charging is complete</li>
          <li>Do not leave charging unattended for extended periods</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-3">Troubleshooting</h2>
        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">Device is not producing vapor</p>
            <p className="text-gray-600 text-sm mt-1">Check battery level. If battery is full but no vapor, the e-liquid may be depleted. If both indicators show zero, the device is finished.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">Device blinks 10-15 times and stops</p>
            <p className="text-gray-600 text-sm mt-1">This means the battery is depleted. Connect USB-C cable to recharge.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">Flavor tastes burnt</p>
            <p className="text-gray-600 text-sm mt-1">The e-liquid is nearly depleted. Take shorter puffs or switch to a new device. Burnt taste with a full e-liquid indicator may mean the coil is damaged - stop using.</p>
          </div>
        </div>

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
          <p className="font-semibold mb-2">Buy Geek Bar Pulse X at GetSmoke</p>
          <p className="text-sm text-gray-600 mb-3">25,000 puffs, Regular + Pulse mode, 40+ flavors. Free shipping over $89. Adults 21+ only.</p>
          <Link href="/models/geek-bar-pulse-x-25000-puffs" className="inline-block bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
            Shop Geek Bar Pulse X
          </Link>
        </div>
      </main>
    </>
  );
}
