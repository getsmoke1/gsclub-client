import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Disposable Vapes 2025 - Top Picks by Puffs & Brand | GetSmoke",
  description: "Find the best disposable vapes available online in 2025. Compare top models by puff count, flavor variety, battery life, and price. Shop Geek Bar, HQD, Lost Mary, RAZ and more.",
  alternates: { canonical: "https://getsmoke.com/best-disposable-vapes" },
  openGraph: {
    title: "Best Disposable Vapes 2025 | GetSmoke",
    description: "Compare the top disposable vapes of 2025 by puff count, brand, and price.",
    url: "https://getsmoke.com/best-disposable-vapes",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best disposable vape in 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best disposable vapes in 2025 include the Geek Bar Pulse X (25,000 puffs), Lost Mary Turbo (35,000 puffs), RAZ DC25000 (25,000 puffs), and HQD Cuvie Glaze (12,000 puffs). The best choice depends on your preferred puff count, flavor selection, and budget."
      }
    },
    {
      "@type": "Question",
      "name": "How many puffs should a good disposable vape have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For casual vapers, 6,000-10,000 puffs lasts 1-2 weeks. Heavy vapers should look for 20,000-35,000 puffs for multi-week use. Most high-quality disposable vapes now range from 7,000 to 35,000 puffs."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best disposable vape brand?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Top disposable vape brands in 2025 include Geek Bar (known for Pulse series), HQD (Cuvie Bar, Cuvie Glaze), Lost Mary (Turbo 35K, MT15000), RAZ (DC25000), and FUME. Each brand offers unique flavor profiles and puff counts."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I buy disposable vapes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke (getsmoke.com) offers 700+ disposable vape products from 30+ top brands with fast US shipping. Orders over $89 ship free. Adult signature required on delivery (21+). Ships to 39+ states."
      }
    },
    {
      "@type": "Question",
      "name": "How much do disposable vapes cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disposable vape prices range from $14.99 to $29.99 at GetSmoke depending on puff count and brand. High-capacity devices (25,000+ puffs) cost $18-25. Mid-range devices (7,000-15,000 puffs) cost $15-20."
      }
    }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Best Disposable Vapes 2025",
  "url": "https://getsmoke.com/best-disposable-vapes",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-intro", ".speakable-picks"]
  }
};

const TOP_PICKS = [
  {
    rank: 1,
    name: "Geek Bar Pulse X",
    puffs: "25,000",
    price: "$21.99",
    why: "Best overall - dual-mode display, 35+ flavors, rotating display screen",
    href: "/models/geek-bar-pulse-x-25000-puffs",
  },
  {
    rank: 2,
    name: "Lost Mary Turbo",
    puffs: "35,000",
    price: "$24.99",
    why: "Longest-lasting - turbo mode, mesh coil, premium build quality",
    href: "/models/lost-mary-turbo-35000-puffs",
  },
  {
    rank: 3,
    name: "RAZ DC25000",
    puffs: "25,000",
    price: "$22.99",
    why: "Best flavor accuracy - premium salt nic, smooth draw",
    href: "/models/raz-dc25000-25000-puffs",
  },
  {
    rank: 4,
    name: "HQD Cuvie Glaze",
    puffs: "12,000",
    price: "$17.99",
    why: "Best value mid-range - reliable, wide flavor selection",
    href: "/models/hqd-cuvie-glaze-12000-puffs",
  },
  {
    rank: 5,
    name: "EBCreate BC Pro",
    puffs: "40,000",
    price: "$26.99",
    why: "Most puffs - perfect for heavy vapers, dual-mesh coil",
    href: "/models/ebcreate-bc-pro-40000-puffs",
  },
];

export default function BestDisposableVapesPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span>Best Disposable Vapes 2025</span>
      </nav>

      <h1 className="font-bold text-2xl md:text-3xl mb-4">
        Best Disposable Vapes 2025
      </h1>

      <p className="speakable-intro text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
        We have tested and compared the top disposable vapes available in the US market in 2025. Whether you are looking for the most puffs, the best flavors, or the best value - here are our expert picks ranked by overall performance, reliability, and customer satisfaction.
      </p>

      <div className="speakable-picks space-y-4 mb-12">
        {TOP_PICKS.map(p => (
          <Link key={p.rank} href={p.href} className="block border border-gray-200 rounded-2xl p-5 hover:border-gray-400 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: p.rank === 1 ? "#fe3500" : "#111" }}>
                {p.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h2 className="font-bold text-base">{p.name}</h2>
                  <span className="font-bold text-sm" style={{ color: "#fe3500" }}>{p.price}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{p.puffs} puffs</div>
                <p className="text-sm text-gray-600 mt-2">{p.why}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-4">How to Choose a Disposable Vape</h2>
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed mb-10">
        <div>
          <h3 className="font-bold mb-1">1. Puff Count</h3>
          <p>Match puff count to your usage. Casual vapers (5-10 puffs/day): 6,000-10,000 puffs lasts 2-3 weeks. Regular vapers (20-30 puffs/day): 15,000-25,000 puffs. Heavy vapers: 35,000+ puffs for 2+ weeks of use.</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">2. Nicotine Strength</h3>
          <p>Most disposable vapes come in 5% (50mg) salt nicotine. Some brands offer 3% or nicotine-free options. Salt nic provides a smooth throat hit at higher concentrations.</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">3. Flavor Profile</h3>
          <p>Fruit flavors (mango, watermelon, strawberry) are most popular. Menthol and mint variants provide a cooling effect. Tobacco and unflavored options are available for those who prefer a traditional feel.</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">4. Battery and Charging</h3>
          <p>All modern high-puff disposables (7,000+) come with a USB-C rechargeable battery. Look for 500mAh+ battery capacity for devices over 10,000 puffs.</p>
        </div>
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
        <p className="font-bold text-lg mb-2">Shop 700+ Disposable Vapes</p>
        <p className="text-sm text-gray-300 mb-4">Free shipping on orders over $89 - Adults 21+ only</p>
        <Link href="/vapes" className="inline-block px-8 py-3 rounded-full font-bold text-sm text-white" style={{ background: "#fe3500" }}>
          Browse All Disposables
        </Link>
      </div>
    </main>
  );
}
