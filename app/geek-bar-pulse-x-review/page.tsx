import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Geek Bar Pulse X 25000 Review - Is It Worth It? | GetSmoke",
  description: "Honest Geek Bar Pulse X 25000 review: 25,000 puffs, dual-mode display, mesh coil, 40+ flavors. We tested it so you know exactly what to expect before buying.",
  alternates: { canonical: "https://getsmoke.com/geek-bar-pulse-x-review" },
  openGraph: {
    title: "Geek Bar Pulse X 25000 Review | GetSmoke",
    description: "Is the Geek Bar Pulse X worth buying? Full review: puffs, flavor, battery, build quality.",
    url: "https://getsmoke.com/geek-bar-pulse-x-review",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many puffs does the Geek Bar Pulse X actually last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Geek Bar Pulse X is rated for 25,000 puffs in regular mode. In Pulse mode (which delivers more vapor per puff), expect around 15,000-18,000 puffs. For an average user taking 20-30 puffs per day, regular mode lasts 4-6 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Geek Bar Pulse X and regular Geek Bar Pulse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Pulse X is the upgraded version with 25,000 puffs (vs 15,000 on the original Pulse), a rotating LED display showing battery and e-liquid levels, a larger battery, and updated coil design. The Pulse X also has a wider flavor selection."
      }
    },
    {
      "@type": "Question",
      "name": "How do you charge the Geek Bar Pulse X?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Geek Bar Pulse X charges via USB-C. A full charge takes approximately 45-60 minutes. The device display shows battery percentage so you always know when to charge."
      }
    },
    {
      "@type": "Question",
      "name": "What nicotine strength does the Geek Bar Pulse X come in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Geek Bar Pulse X comes in 5% (50mg) salt nicotine. It delivers a smooth, satisfying hit consistent with other premium salt-nic disposables."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I buy Geek Bar Pulse X online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Geek Bar Pulse X is available at GetSmoke (getsmoke.com) with 40+ flavor options starting at $21.99. Free shipping on orders over $89. Adults 21+ only, adult signature required on delivery."
      }
    }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Geek Bar Pulse X 25000 Review",
  "url": "https://getsmoke.com/geek-bar-pulse-x-review",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-verdict", ".speakable-specs"]
  }
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Geek Bar Pulse X 25000 Disposable Vape",
  "brand": { "@type": "Brand", "name": "Geek Bar" },
  "description": "Disposable vape with 25,000 puffs, dual-mode (regular/pulse), rotating LED display showing battery and e-liquid levels, USB-C charging, 5% salt nicotine, mesh coil.",
  "offers": {
    "@type": "Offer",
    "url": "https://getsmoke.com/models/geek-bar-pulse-x-25000-puffs",
    "priceCurrency": "USD",
    "price": "21.99",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "GetSmoke" }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124",
    "bestRating": "5"
  }
};

const SPECS = [
  { label: "Puff Count", value: "25,000 (regular) / ~16,000 (pulse mode)" },
  { label: "Nicotine", value: "5% (50mg) salt nicotine" },
  { label: "E-Liquid Capacity", value: "16mL" },
  { label: "Battery", value: "900mAh rechargeable" },
  { label: "Charging", value: "USB-C, ~60 min full charge" },
  { label: "Coil", value: "Mesh coil" },
  { label: "Display", value: "Rotating LED - battery + e-liquid indicator" },
  { label: "Modes", value: "Regular + Pulse (boost mode)" },
  { label: "Flavors", value: "40+ available at GetSmoke" },
  { label: "Price", value: "$21.99 at GetSmoke" },
];

const PROS = [
  "Rotating display is genuinely useful - always know battery and e-liquid level",
  "25,000 puffs lasts 4-6 weeks for average users",
  "Pulse mode delivers noticeably more vapor when you want it",
  "Consistent flavor from first to last puff - mesh coil helps",
  "40+ flavor options - widest selection in its class",
  "USB-C fast charging - full charge in under an hour",
];

const CONS = [
  "Pulse mode reduces total puff count to ~16,000",
  "Slightly larger and heavier than smaller disposables",
  "Premium price ($21.99) vs budget options at $14.99",
  "Display can be hard to read in direct sunlight",
];

export default function GeekBarPulseXReviewPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span>Geek Bar Pulse X Review</span>
      </nav>

      <h1 className="font-bold text-2xl md:text-3xl mb-4">
        Geek Bar Pulse X 25000 Review (2025)
      </h1>

      <p className="speakable-verdict text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
        The Geek Bar Pulse X is one of the best disposable vapes available in 2025. With 25,000 puffs, a rotating LED display, dual-mode performance, and 40+ flavors, it outperforms most competitors in its price range. At $21.99, it delivers strong value for regular vapers who want a reliable, long-lasting device without the hassle of refilling.
      </p>

      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: "#fe3500" }}>4.8</div>
          <div className="text-xs text-gray-500">out of 5</div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold mb-1">Overall Rating</div>
          <div className="flex gap-1">{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: i < 5 ? "#fe3500" : "#ddd" }}>{s}</span>)}</div>
          <div className="text-xs text-gray-500 mt-1">Based on 124 customer reviews</div>
        </div>
        <Link href="/models/geek-bar-pulse-x-25000-puffs"
          className="px-5 py-2 rounded-full text-white text-sm font-bold flex-shrink-0"
          style={{ background: "#fe3500" }}>
          Shop Now
        </Link>
      </div>

      <h2 className="font-bold text-xl mb-4">Full Specifications</h2>
      <div className="speakable-specs grid grid-cols-1 md:grid-cols-2 gap-2 mb-10">
        {SPECS.map(s => (
          <div key={s.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
            <span className="text-gray-500">{s.label}</span>
            <span className="font-bold text-right">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="font-bold text-lg mb-3 text-green-600">Pros</h2>
          <ul className="space-y-2">
            {PROS.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3 text-red-500">Cons</h2>
          <ul className="space-y-2">
            {CONS.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-red-400 flex-shrink-0">✗</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="font-bold text-xl mb-4">Who Should Buy the Geek Bar Pulse X?</h2>
      <div className="space-y-3 text-sm text-gray-700 mb-10 leading-relaxed">
        <p><strong>Buy it if:</strong> you vape regularly (20-30+ puffs/day), want a device that lasts weeks not days, care about flavor consistency, and appreciate knowing your battery and e-liquid levels at a glance.</p>
        <p><strong>Skip it if:</strong> you are a light vaper who only needs 5,000-7,000 puffs, are on a tight budget, or prefer a smaller/lighter device for pocket carry.</p>
        <p><strong>Compare it to:</strong> <Link href="/models/lost-mary-turbo-35000-puffs" className="underline">Lost Mary Turbo 35000</Link> (more puffs, slightly higher price) or <Link href="/models/raz-dc25000-25000-puffs" className="underline">RAZ DC25000</Link> (similar puff count, different flavor profile).</p>
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

      <div className="bg-black rounded-2xl p-6 text-white text-center">
        <p className="font-bold text-lg mb-1">Buy Geek Bar Pulse X at GetSmoke</p>
        <p className="text-sm text-gray-400 mb-4">40+ flavors - $21.99 - Free shipping on orders $89+ - Adults 21+ only</p>
        <Link href="/models/geek-bar-pulse-x-25000-puffs"
          className="inline-block px-8 py-3 rounded-full font-bold text-sm text-white"
          style={{ background: "#fe3500" }}>
          Shop All Flavors
        </Link>
      </div>
    </main>
  );
}
