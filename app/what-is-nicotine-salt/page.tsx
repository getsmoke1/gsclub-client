import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/what-is-nicotine-salt`;

export const metadata: Metadata = {
  title: "What Is Nicotine Salt? Nic Salt vs Freebase Explained | GetSmoke",
  description:
    "Nicotine salt (nic salt) is a form of nicotine found naturally in tobacco leaves. It delivers smoother hits at higher concentrations than freebase nicotine. Learn why all disposable vapes use nic salt.",
  alternates: { canonical: PAGE_URL },
  keywords: ["what is nicotine salt", "nic salt vs freebase nicotine", "nicotine salt explained", "50mg nicotine salt", "smooth nicotine hit"],
  openGraph: {
    title: "What Is Nicotine Salt? Nic Salt vs Freebase Explained",
    description: "Nicotine salt delivers smoother, faster nicotine satisfaction than freebase. Learn why all disposable vapes use nic salt formulations.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: "What Is Nicotine Salt" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is nicotine salt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nicotine salt (nic salt) is a naturally occurring form of nicotine found in tobacco leaves. Unlike freebase nicotine, nic salt is combined with an organic acid (usually benzoic acid) which lowers its pH, making it smoother to inhale at higher concentrations and absorbing into the bloodstream faster.",
      },
    },
    {
      "@type": "Question",
      name: "Why do disposable vapes use nicotine salt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Disposable vapes use nicotine salt because it allows high nicotine concentrations (50mg/5%) to be delivered smoothly without the harsh throat hit that freebase nicotine causes at the same levels. This makes disposable vapes effective for smokers transitioning away from cigarettes.",
      },
    },
    {
      "@type": "Question",
      name: "Is 5% nicotine salt strong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. 5% (50mg) nicotine salt is the highest common strength in disposable vapes. It delivers nicotine satisfaction comparable to a cigarette relatively quickly. It is recommended for current smokers or experienced vapers, not beginners or non-smokers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between 3% and 5% nicotine salt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3% (30mg) nicotine salt delivers lighter nicotine satisfaction and is better suited for light smokers or vapers stepping down from 5%. 5% (50mg) delivers stronger, faster nicotine delivery equivalent to a regular cigarette. Most disposable vapes in the US are 5%.",
      },
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  name: "What Is Nicotine Salt?",
  url: PAGE_URL,
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".definition-lead", "h2"] },
};

export default function WhatIsNicotineSaltPage() {
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
          <span>What Is Nicotine Salt</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">What Is Nicotine Salt (Nic Salt)?</h1>
        <p className="definition-lead text-lg text-gray-600 mb-8 leading-relaxed">
          <strong>Nicotine salt</strong> (commonly called nic salt) is the natural form of nicotine found
          in tobacco leaves. It is the foundation of virtually all disposable vape e-liquids because it
          delivers smooth, fast nicotine satisfaction at concentrations that would be harsh with
          traditional freebase nicotine.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Nicotine Salt vs Freebase Nicotine</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">Feature</th>
                <th className="text-left p-3 border border-gray-200">Nicotine Salt</th>
                <th className="text-left p-3 border border-gray-200">Freebase Nicotine</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border border-gray-200">Throat hit at high strength</td><td className="p-3 border border-gray-200">Smooth</td><td className="p-3 border border-gray-200">Harsh</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Absorption speed</td><td className="p-3 border border-gray-200">Fast (like cigarette)</td><td className="p-3 border border-gray-200">Slower</td></tr>
              <tr><td className="p-3 border border-gray-200">Common strength</td><td className="p-3 border border-gray-200">3%-5% (30-50mg)</td><td className="p-3 border border-gray-200">3mg-18mg</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Used in</td><td className="p-3 border border-gray-200">Disposable vapes, pod systems</td><td className="p-3 border border-gray-200">Box mods, tanks</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-3">Why Disposable Vapes Use Nic Salt</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The main reason all disposable vapes use nicotine salt is the <strong>smooth throat hit at high
          concentrations</strong>. At 5% (50mg), freebase nicotine would be extremely harsh and unpleasant.
          Nic salt at the same level is smooth, which is why millions of smokers have switched from cigarettes
          to disposable vapes successfully.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Nic salt also absorbs into the bloodstream faster, which is key for cigarette smokers who need
          quick nicotine satisfaction to overcome cravings.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Nicotine Salt Strengths in Disposable Vapes</h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-3">
            <span className="mt-1 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
            <div><strong>5% (50mg)</strong> - Strongest. Best for pack-a-day smokers switching to vaping. Shop <Link href="/5-percent-nicotine-vapes" className="text-orange-500 hover:underline">5% nicotine vapes</Link>.</div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-5 h-5 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <div><strong>3% (30mg)</strong> - Moderate. Suitable for light smokers or those stepping down from 5%.</div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0">0</span>
            <div><strong>0% (nicotine-free)</strong> - No nicotine. All flavor and vapor. Shop <Link href="/nicotine-free-vapes" className="text-orange-500 hover:underline">0% nicotine vapes</Link>.</div>
          </li>
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
          <p className="text-sm text-gray-600 mb-3">All nicotine strengths available - 5%, 3%, and 0%. Free shipping over $89. Adults 21+ only.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/5-percent-nicotine-vapes" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">5% Nicotine Vapes</Link>
            <Link href="/nicotine-free-vapes" className="inline-block bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">0% Nicotine Free</Link>
          </div>
        </div>
      </main>
    </>
  );
}
