import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/how-to-charge-raz-vape`;

export const metadata: Metadata = {
  title: "How to Charge RAZ Vape - RAZ DC25000 Charging Guide | GetSmoke",
  description:
    "Step-by-step guide on how to charge the RAZ DC25000 and other RAZ vapes. Learn charging time, what the indicators mean, and when your RAZ is fully charged.",
  alternates: { canonical: PAGE_URL },
  keywords: ["how to charge raz vape", "raz dc25000 charging", "raz vape battery", "raz vape not charging", "raz vape usb c"],
  openGraph: {
    title: "How to Charge RAZ Vape - RAZ DC25000 Charging Guide",
    description: "Complete charging guide for RAZ disposable vapes. Learn charging time, indicators, and troubleshooting.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "How to Charge RAZ Vape" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I charge my RAZ DC25000?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To charge your RAZ DC25000, connect a USB-C cable to the charging port on the bottom of the device. Plug the other end into any USB power adapter or computer. The battery indicator on the screen will show a charging animation. Charging takes approximately 45-90 minutes depending on how depleted the battery is.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to charge a RAZ vape?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A RAZ DC25000 takes approximately 45-90 minutes to fully charge from a depleted battery. The device screen shows the current battery percentage during charging. Once it reaches 100%, charging is complete.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know when my RAZ vape is fully charged?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The RAZ DC25000 has a digital display that shows the battery level as a percentage. When charging is complete, the battery indicator shows 100% and the charging animation stops. You can disconnect the USB-C cable at this point.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my RAZ vape not charging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your RAZ vape is not charging, try: 1) Use a different USB-C cable - a faulty cable is the most common cause. 2) Try a different power adapter. 3) Check the USB-C port for debris. 4) Ensure the port is fully seated. If none of these work and the device shows no charging indicator, the battery may be fully discharged - wait 5-10 minutes connected before the screen activates.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know when my RAZ DC25000 is empty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The RAZ DC25000 shows both battery level and e-liquid level on its display. When the e-liquid indicator shows near 0%, the device is nearly depleted. The flavor will also become weaker or take on a slightly different taste as e-liquid runs low.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Charge a RAZ Vape",
  url: PAGE_URL,
  description: "Step-by-step guide to charging the RAZ DC25000 disposable vape",
  step: [
    { "@type": "HowToStep", position: 1, name: "Get a USB-C cable", text: "Use any standard USB-C cable. The RAZ DC25000 does not come with a cable - any phone charger cable works." },
    { "@type": "HowToStep", position: 2, name: "Locate the charging port", text: "The USB-C port is on the bottom of the RAZ DC25000 device." },
    { "@type": "HowToStep", position: 3, name: "Connect and charge", text: "Insert the USB-C cable and connect to a power source. The screen will activate and show a charging animation with battery percentage." },
    { "@type": "HowToStep", position: 4, name: "Wait for full charge", text: "Leave connected for 45-90 minutes until the battery shows 100%." },
    { "@type": "HowToStep", position: 5, name: "Disconnect and vape", text: "Unplug the USB-C cable when fully charged. Resume vaping normally." },
  ],
};

export default function HowToChargeRazVapePage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} strategy="beforeInteractive" />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/brands/raz" className="hover:text-orange-500">RAZ Vape</Link>
          <span className="mx-2">/</span>
          <span>How to Charge RAZ Vape</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">How to Charge a RAZ Vape</h1>
        <p className="definition-lead text-lg text-gray-600 mb-8 leading-relaxed">
          All <strong>RAZ disposable vapes</strong> including the RAZ DC25000 and RAZ TN9000 use
          USB-C charging. This guide covers exactly how to charge your RAZ vape, how long it takes,
          and what to do if it is not charging.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Charging Steps - RAZ DC25000</h2>
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

        <h2 className="text-2xl font-bold mt-8 mb-3">RAZ DC25000 Battery and E-Liquid Display</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The RAZ DC25000 has a clear digital screen showing two indicators:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li><strong>Battery indicator</strong> - shows remaining charge as a percentage (0-100%)</li>
          <li><strong>E-liquid indicator</strong> - shows remaining e-liquid level</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-6">
          You will need to recharge the RAZ DC25000 battery approximately every 2-5 days depending
          on how heavily you vape. The e-liquid will outlast multiple battery charges before
          the device is fully depleted.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">RAZ Vape Not Charging - Troubleshooting</h2>
        <div className="space-y-3 mb-8">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">No charging indicator on screen</p>
            <p className="text-gray-600 text-sm mt-1">Try a different USB-C cable. A faulty cable is the most common cause. Also try a different power adapter or USB port.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">Screen is completely blank</p>
            <p className="text-gray-600 text-sm mt-1">The battery may be fully discharged. Leave connected for 5-10 minutes before the screen activates and shows the charging animation.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">Battery charges but device does not vape</p>
            <p className="text-gray-600 text-sm mt-1">Check the e-liquid indicator. If it shows empty, the device is finished and needs to be replaced. The battery being full does not extend the device life if the e-liquid is gone.</p>
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
          <p className="font-semibold mb-2">Shop RAZ Vapes at GetSmoke</p>
          <p className="text-sm text-gray-600 mb-3">RAZ DC25000 - 25,000 puffs, USB-C charging, digital display. Free shipping over $89. Adults 21+ only.</p>
          <Link href="/models/raz-dc25000-25000-puffs" className="inline-block bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
            Shop RAZ DC25000
          </Link>
        </div>
      </main>
    </>
  );
}
