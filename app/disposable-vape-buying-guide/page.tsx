import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disposable Vape Buying Guide 2025 - How to Choose | GetSmoke",
  description: "Complete guide to buying disposable vapes in 2025. Learn about puff counts, nicotine strengths, top brands, flavors, and what to look for before you buy.",
  alternates: { canonical: "https://getsmoke.com/disposable-vape-buying-guide" },
  openGraph: {
    title: "Disposable Vape Buying Guide 2025 | GetSmoke",
    description: "Everything you need to know before buying a disposable vape - puff counts, brands, nicotine, flavors.",
    url: "https://getsmoke.com/disposable-vape-buying-guide",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I look for when buying a disposable vape?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key factors: puff count (how long it lasts), nicotine strength (5% salt nic is standard), flavor options, brand reputation, and whether it has USB-C recharging. For beginners, a 7,000-puff device from a trusted brand like Geek Bar or HQD is ideal."
      }
    },
    {
      "@type": "Question",
      "name": "What nicotine strength should I choose for a disposable vape?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most disposable vapes come in 5% (50mg) salt nicotine, which is the industry standard. Some brands offer 3% (30mg) for lighter users. If you are transitioning from cigarettes, 5% is recommended. Zero-nicotine options are also available on select models like RAZ TN9000 Zero."
      }
    },
    {
      "@type": "Question",
      "name": "Are disposable vapes worth it compared to refillable vapes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disposable vapes are better for convenience, travel, and variety - no refilling, no coil changes, no maintenance. Refillable (pod) systems cost less per puff long-term but require upfront investment and maintenance. For casual or on-the-go use, disposables are the better choice."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if a disposable vape brand is reputable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reputable brands sell through licensed US retailers, have clear ingredient disclosure, comply with FDA regulations, and have consistent product quality. Top brands include Geek Bar, HQD, Lost Mary, RAZ, FUME, and Juicy Bar. Avoid unbranded or suspiciously cheap devices."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best disposable vape for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For beginners, the HQD Cuvie Bar 7000 or Geek Bar Pulse 15000 are excellent starting points. They offer smooth draw, consistent flavor, wide flavor selection, and are available at most reputable online vape shops including GetSmoke."
      }
    }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Disposable Vape Buying Guide 2025",
  "url": "https://getsmoke.com/disposable-vape-buying-guide",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-intro", ".speakable-steps"]
  }
};

const STEPS = [
  {
    num: "01",
    title: "Choose Your Puff Count",
    body: "Puff count = how long the device lasts. Casual user (under 10 puffs/day): 5,000-7,000 puffs is enough for 2+ weeks. Regular user (20-30 puffs/day): aim for 15,000-25,000 puffs. Heavy user (50+ puffs/day): go for 35,000+ puffs. Higher puff counts cost more upfront but are cheaper per puff.",
  },
  {
    num: "02",
    title: "Pick Your Nicotine Strength",
    body: "Standard: 5% salt nicotine (50mg) - smooth, satisfying, recommended for most users. Light: 3% (30mg) - for those who find 5% too strong. Nicotine-free: 0% - available on select models for those who want flavor without nicotine. If transitioning from cigarettes, start with 5%.",
  },
  {
    num: "03",
    title: "Select a Flavor Profile",
    body: "Fruit flavors (watermelon, mango, strawberry) are the most popular. Menthol and mint offer a cool, refreshing hit. Tobacco flavors provide a familiar cigarette-like experience. Ice variants add a cooling effect to any base flavor. Most brands offer 20-40+ flavors per model.",
  },
  {
    num: "04",
    title: "Choose a Trusted Brand",
    body: "Stick to established brands sold by licensed US retailers. Top brands: Geek Bar (best overall), HQD (best value), Lost Mary (best for heavy users), RAZ (best flavor accuracy), FUME (most affordable). Avoid generic or unbranded devices - quality and safety cannot be verified.",
  },
  {
    num: "05",
    title: "Verify USB-C Charging",
    body: "Any device over 7,000 puffs should have USB-C recharging. This ensures the battery never dies before the e-liquid runs out. Non-rechargeable devices at high puff counts often fail before reaching their advertised puff count. Always check the product specs.",
  },
  {
    num: "06",
    title: "Buy From a Licensed Retailer",
    body: "Only purchase from PACT Act-compliant retailers who verify age at checkout. Licensed retailers sell authentic products, require adult signature on delivery (21+), and operate within state regulations. GetSmoke is a licensed US vape retailer shipping to 39+ states.",
  },
];

const BRAND_COMPARE = [
  { brand: "Geek Bar", bestFor: "Overall quality", topModel: "Pulse X 25000", priceRange: "$19-23", flavors: "40+" },
  { brand: "HQD", bestFor: "Value + variety", topModel: "Cuvie Glaze 12000", priceRange: "$15-19", flavors: "50+" },
  { brand: "Lost Mary", bestFor: "Heavy users", topModel: "Turbo 35000", priceRange: "$22-26", flavors: "30+" },
  { brand: "RAZ", bestFor: "Flavor accuracy", topModel: "DC25000", priceRange: "$20-23", flavors: "25+" },
  { brand: "FUME", bestFor: "Budget pick", topModel: "Infinity 3500", priceRange: "$13-17", flavors: "35+" },
  { brand: "Juicy Bar", bestFor: "Long-lasting", topModel: "JB25000 PRO MAX", priceRange: "$18-22", flavors: "20+" },
];

export default function DisposableVapeBuyingGuidePage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span>Buying Guide</span>
      </nav>

      <h1 className="font-bold text-2xl md:text-3xl mb-4">
        Disposable Vape Buying Guide 2025
      </h1>

      <p className="speakable-intro text-gray-600 text-sm md:text-base mb-10 leading-relaxed">
        New to disposable vapes or just overwhelmed by the options? This guide covers everything you need to know - puff counts, nicotine strengths, top brands, flavor types, and where to buy safely. By the end, you will know exactly which device fits your lifestyle and budget.
      </p>

      <h2 className="font-bold text-xl mb-6">6-Step Guide to Choosing a Disposable Vape</h2>
      <div className="speakable-steps space-y-5 mb-12">
        {STEPS.map(s => (
          <div key={s.num} className="flex gap-4 items-start border border-gray-100 rounded-2xl p-5">
            <div className="text-2xl font-bold text-gray-200 flex-shrink-0 w-10">{s.num}</div>
            <div>
              <h3 className="font-bold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-4">Top Brand Comparison</h2>
      <div className="overflow-x-auto mb-12">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left p-3 rounded-tl-xl">Brand</th>
              <th className="text-left p-3">Best For</th>
              <th className="text-left p-3">Top Model</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3 rounded-tr-xl">Flavors</th>
            </tr>
          </thead>
          <tbody>
            {BRAND_COMPARE.map((b, i) => (
              <tr key={b.brand} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-bold">{b.brand}</td>
                <td className="p-3 text-gray-600">{b.bestFor}</td>
                <td className="p-3 text-gray-600">{b.topModel}</td>
                <td className="p-3" style={{ color: "#fe3500" }}>{b.priceRange}</td>
                <td className="p-3 text-gray-600">{b.flavors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-bold text-xl mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-10">
        {faqSchema.mainEntity.map((q, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-2">{q.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{q.acceptedAnswer.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Link href="/best-disposable-vapes" className="block border border-gray-200 rounded-2xl p-4 hover:border-gray-400 transition-colors text-center">
          <div className="font-bold text-sm mb-1">Best Picks 2025</div>
          <div className="text-xs text-gray-500">Our top 5 ranked</div>
        </Link>
        <Link href="/how-many-puffs-disposable-vape" className="block border border-gray-200 rounded-2xl p-4 hover:border-gray-400 transition-colors text-center">
          <div className="font-bold text-sm mb-1">Puff Count Guide</div>
          <div className="text-xs text-gray-500">How long each device lasts</div>
        </Link>
        <Link href="/vapes" className="block rounded-2xl p-4 text-white text-center" style={{ background: "#fe3500" }}>
          <div className="font-bold text-sm mb-1">Shop All Vapes</div>
          <div className="text-xs opacity-80">700+ products, free shipping $89+</div>
        </Link>
      </div>
    </main>
  );
}
