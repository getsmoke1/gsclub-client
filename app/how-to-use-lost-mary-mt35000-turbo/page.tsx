import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/how-to-use-lost-mary-mt35000-turbo`;

export const metadata: Metadata = {
  title: "How to Use Lost Mary MT35000 Turbo - Complete Guide | GetSmoke",
  description:
    "Step-by-step guide on how to use the Lost Mary MT35000 Turbo. Learn how to switch modes, charge via USB-C, read the display, and get the most puffs from your device.",
  alternates: { canonical: PAGE_URL },
  keywords: ["how to use lost mary mt35000 turbo", "lost mary mt35000 turbo guide", "lost mary turbo mode", "how to charge lost mary mt35000", "lost mary mt35000 not hitting"],
  openGraph: {
    title: "How to Use Lost Mary MT35000 Turbo",
    description: "Complete guide to using the Lost Mary MT35000 Turbo: modes, charging, display, and troubleshooting.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "How to Use Lost Mary MT35000 Turbo" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I switch modes on the Lost Mary MT35000 Turbo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To switch between Standard and Turbo mode on the Lost Mary MT35000 Turbo, press the button on the side of the device once. The display screen will show which mode is active. Standard mode delivers consistent smooth vapor; Turbo mode increases output for denser clouds and more intense flavor.",
      },
    },
    {
      "@type": "Question",
      name: "How do I charge the Lost Mary MT35000 Turbo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Charge the Lost Mary MT35000 Turbo using a USB-C cable connected to any USB power source. The LED screen will show a charging animation and current battery percentage. Full charge from empty takes approximately 60-90 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How many puffs does the Lost Mary MT35000 Turbo last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Lost Mary MT35000 Turbo is rated for 35,000 puffs in Standard mode. Using Turbo mode frequently will reduce the total puff count since Turbo mode uses more e-liquid per puff. For average users vaping 150-200 puffs per day, the device lasts 4-6 months.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my Lost Mary MT35000 Turbo not hitting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your Lost Mary MT35000 Turbo is not producing vapor: 1) Check the battery level on the display and charge if low. 2) Check the e-liquid level indicator. 3) Make sure you are inhaling slowly and steadily. 4) If the device blinks and shuts off, the battery needs charging. 5) If all indicators are full but no vapor, the coil may be flooded - take short dry draws to clear it.",
      },
    },
    {
      "@type": "Question",
      name: "What does the display on the Lost Mary MT35000 Turbo show?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Lost Mary MT35000 Turbo features a digital display screen showing: battery percentage (left icon), e-liquid level (right icon), and current mode (Standard or Turbo). The screen activates when you take a puff or press the mode button.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Lost Mary MT35000 Turbo",
  url: PAGE_URL,
  description: "Step-by-step guide to using the Lost Mary MT35000 Turbo disposable vape",
  step: [
    { "@type": "HowToStep", position: 1, name: "Unbox the device", text: "Remove the Lost Mary MT35000 Turbo from its packaging. Pull off the silicone mouthpiece cap if present." },
    { "@type": "HowToStep", position: 2, name: "Check the display", text: "The digital screen shows battery level and e-liquid level. Both should be full on a new device." },
    { "@type": "HowToStep", position: 3, name: "Select your mode", text: "Press the side button once to toggle between Standard and Turbo mode. Standard mode is ideal for longer sessions; Turbo mode delivers bigger hits." },
    { "@type": "HowToStep", position: 4, name: "Inhale to activate", text: "Place the mouthpiece to your lips and draw slowly for 2-3 seconds. The device is draw-activated - no button needed to vape." },
    { "@type": "HowToStep", position: 5, name: "Charge when low", text: "When the battery display shows below 20%, connect a USB-C cable to the port on the bottom. Charge for 60-90 minutes." },
  ],
};

export default function HowToUseLostMaryMT35000Page() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} strategy="beforeInteractive" />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/brands/lost-mary" className="hover:text-orange-500">Lost Mary</Link>
          <span className="mx-2">/</span>
          <span>How to Use MT35000 Turbo</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">How to Use the Lost Mary MT35000 Turbo</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The <strong>Lost Mary MT35000 Turbo</strong> is a 35,000-puff rechargeable disposable with
          Standard and Turbo vaping modes. This guide covers everything from first use to
          troubleshooting.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Step-by-Step: First Use</h2>
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

        <h2 className="text-2xl font-bold mt-8 mb-3">Standard Mode vs Turbo Mode</h2>
        <ol className="space-y-2 text-gray-700 mb-6">
          <li>1. <strong>Standard mode</strong> - consistent, smooth vapor output. Best for all-day vaping and maximizing puff count. Rated 35,000 puffs.</li>
          <li>2. <strong>Turbo mode</strong> - higher power, denser vapor, more intense flavor. Uses e-liquid faster. Best for occasional sessions or when you want bigger clouds.</li>
          <li>3. Press the side button once to switch between modes at any time.</li>
          <li>4. The display screen confirms which mode is active after each button press.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">Charging the Lost Mary MT35000 Turbo</h2>
        <ol className="space-y-2 text-gray-700 mb-6">
          <li>1. Connect a USB-C cable to the port on the bottom of the device.</li>
          <li>2. Plug the other end into a USB adapter, laptop, or power bank.</li>
          <li>3. The screen will show a charging animation with battery percentage.</li>
          <li>4. Full charge takes 60-90 minutes depending on current battery level.</li>
          <li>5. Do not use the device while charging.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">Troubleshooting</h2>
        <ol className="space-y-3 mb-8">
          <li className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">1. Device not producing vapor</p>
            <p className="text-gray-600 text-sm mt-1">Check battery level on display. If battery is full but no vapor, check e-liquid level. If both show zero, device is depleted.</p>
          </li>
          <li className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">2. Weak flavor or vapor</p>
            <p className="text-gray-600 text-sm mt-1">Switch to Turbo mode for a stronger hit. If already in Turbo mode, e-liquid may be running low.</p>
          </li>
          <li className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-sm">3. Burnt taste</p>
            <p className="text-gray-600 text-sm mt-1">E-liquid is nearly depleted or the coil is overheating. Let the device rest for 30 seconds between puffs. If taste persists, replace the device.</p>
          </li>
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
          <p className="font-semibold mb-2">Shop Lost Mary MT35000 Turbo at GetSmoke</p>
          <p className="text-sm text-gray-600 mb-3">35,000 puffs, Standard + Turbo mode, digital display. Free shipping over $89. Adults 21+ only.</p>
          <Link href="/models/lost-mary-mt35000-turbo-35000-puffs" className="inline-block bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">
            Shop Lost Mary MT35000 Turbo
          </Link>
        </div>
      </main>
    </>
  );
}
