import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Where to Buy Disposable Vapes Online in 2026 | GetSmoke",
  description:
    "Buy disposable vapes online at GetSmoke. Licensed US retailer. Shop Geek Bar, RAZ, Fifty Bar, FUME, HQD and 30+ brands. Free shipping over $89. Adults 21+ only.",
  alternates: { canonical: "https://getsmoke.com/where-to-buy-disposable-vapes-online" },
  keywords: ["where to buy disposable vapes online", "buy disposable vapes online", "disposable vape online store USA", "geek bar online", "raz vape online", "hqd vape online"],
  openGraph: {
    title: "Where to Buy Disposable Vapes Online in 2026",
    description: "Buy disposable vapes online at GetSmoke — a licensed US retailer. 700+ authentic products, 30+ top brands, free shipping on orders $89+. Ages 21+ verified.",
    url: "https://getsmoke.com/where-to-buy-disposable-vapes-online",
    images: [{ url: "https://getsmoke.com/og-default.jpg", width: 1200, height: 630 }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where can I buy disposable vapes online legally?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke (getsmoke.com) is a licensed US online retailer selling nicotine disposable vapes. We are PACT Act compliant and verify age at checkout and delivery. We ship to most US states for adults 21 and older."
      }
    },
    {
      "@type": "Question",
      "name": "Can you buy Geek Bar vapes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. GetSmoke carries the full Geek Bar lineup including Geek Bar Pulse X2 (50,000 puffs, $35.99), Geek Bar Pulse X (25,000 puffs, $33.99), Geek Bar Pulse 2 ($28.99) and Geek Bar Meloso. All available at getsmoke.com/brands/geek-bar."
      }
    },
    {
      "@type": "Question",
      "name": "Is it legal to buy disposable vapes online in the US?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, in most US states. Online vape sales are legal but regulated under the PACT Act, which requires age verification and adult signature on delivery. GetSmoke is fully PACT Act compliant. Some states (California, New York, Massachusetts and others) have banned online flavored vape sales."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cheapest way to buy disposable vapes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke offers free shipping on all orders over $89, which makes multi-pack orders the best value. A 10-pack of Geek Bar Pulse at $19.99 each comes to $199.90 with free shipping. Single devices start at $14.99 for models like FUME Infinity (4,500 puffs)."
      }
    },
    {
      "@type": "Question",
      "name": "Do online vape stores ship to my state?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke ships to most US states. We do not ship to California, New York, Massachusetts, Georgia, Maine, Nebraska, Oregon, South Dakota, Utah, Vermont, or the District of Columbia due to state laws restricting online flavored nicotine product sales."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I buy RAZ vapes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke carries the full RAZ lineup including RAZ DC25000 (25,000 puffs, $23.99), RAZ TN9000 (9,000 puffs, $17.99) and the RAZ DC25000 Zero Nicotine version. Shop at getsmoke.com/brands/raz."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://getsmoke.com" },
    { "@type": "ListItem", "position": 2, "name": "Where to Buy Disposable Vapes Online", "item": "https://getsmoke.com/where-to-buy-disposable-vapes-online" }
  ]
};

const brands = [
  { name: "Geek Bar", slug: "geek-bar", topModel: "Pulse X2 50,000 puffs", price: "$35.99", puffs: "50,000", desc: "Most popular brand in the US. Known for Pulse series with digital displays and dual-mode performance." },
  { name: "RAZ Vape", slug: "raz", topModel: "DC25000 25,000 puffs", price: "$23.99", puffs: "25,000", desc: "Top-rated for flavor quality. RAZ DC25000 delivers 25,000 puffs at a mid-range price." },
  { name: "HQD", slug: "hqd", topModel: "Cuvie Glaze 15,000 puffs", price: "$19.99", puffs: "15,000", desc: "Budget-friendly with wide flavor selection. HQD Cuvie Bar offers 7,000 puffs at $15.90." },
  { name: "FUME", slug: "fume", topModel: "Pro 30,000 puffs", price: "$18.99", puffs: "30,000", desc: "One of the original US disposable brands. FUME Pro offers 30,000 puffs at the best price per puff." },
  { name: "Fifty Bar", slug: "fifty-bar", topModel: "Black Series 20,000 puffs", price: "$20.99", puffs: "20,000", desc: "Texas-popular brand with bold flavors. Black Series and Fruitia collab editions." },
  { name: "Foger", slug: "foger", topModel: "Bit 35,000 puffs", price: "$24.89", puffs: "35,000", desc: "Known for the Switch Pod system and Bit high-puff disposable. Great value for long-lasting devices." },
];

export default function WhereToBuyPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-xs text-gray-400 mb-6 flex gap-2 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span>Where to Buy Disposable Vapes Online</span>
      </nav>

      <h1 className="font-bold text-2xl md:text-3xl mb-4 leading-snug">
        Where to Buy Disposable Vapes Online in 2026
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <time dateTime="2026-08-21">Updated: August 2026</time>
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          By Angel Rose
        </span>
      </div>

      <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
        GetSmoke is a licensed US online retailer selling nicotine disposable vapes since 2021. We carry 700+ products from 30+ brands including Geek Bar, RAZ, Fifty Bar, FUME, HQD and Foger. All orders over $89 ship free. Adults 21+ only. PACT Act compliant with adult signature required on delivery.
      </p>

      <section className="mb-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="font-bold text-lg mb-3">GetSmoke at a Glance</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li><strong>Products:</strong> 700+ disposable vapes, 30+ brands</li>
          <li><strong>Price range:</strong> $14.99 - $35.99 per device</li>
          <li><strong>Free shipping:</strong> Orders $89+</li>
          <li><strong>Delivery:</strong> 3-7 business days (USPS/UPS)</li>
          <li><strong>Age requirement:</strong> 21+ verified at checkout and delivery</li>
          <li><strong>License:</strong> Cosmoproject LLC, Florida, License #2333778</li>
          <li><strong>Contact:</strong> info@getsmoke.com | (786) 368-0100</li>
        </ul>
        <div className="mt-4">
          <Link href="/vapes" className="inline-block bg-[#fe3500] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#d42c00] transition">
            Shop All Vapes
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-bold text-xl mb-6">Top Brands Available at GetSmoke</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {brands.map((b) => (
            <div key={b.slug} className="border border-gray-200 rounded-xl p-4 hover:border-[#fe3500] transition">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-base">{b.name}</h3>
                <span className="text-[#fe3500] font-bold text-sm">{b.price}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">Best seller: {b.topModel} - {b.puffs} puffs</p>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{b.desc}</p>
              <Link href={`/brands/${b.slug}`} className="text-sm font-semibold text-[#fe3500] hover:underline">
                Shop {b.name} at GetSmoke
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4">Pricing by Puff Count (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 font-semibold">Puff Count</th>
                <th className="text-left p-3 font-semibold">Price at GetSmoke</th>
                <th className="text-left p-3 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">4,500 - 7,000</td><td className="p-3">$14.99 - $16.99</td><td className="p-3 text-gray-500">FUME Infinity, HQD Cuvie Bar</td></tr>
              <tr><td className="p-3">9,000 - 15,000</td><td className="p-3">$16.99 - $20.99</td><td className="p-3 text-gray-500">RAZ TN9000, HQD Cuvie Glaze</td></tr>
              <tr><td className="p-3">20,000 - 25,000</td><td className="p-3">$19.99 - $33.99</td><td className="p-3 text-gray-500">RAZ DC25000, Geek Bar Pulse X</td></tr>
              <tr><td className="p-3">30,000 - 40,000</td><td className="p-3">$18.99 - $24.99</td><td className="p-3 text-gray-500">FUME Pro, Foger Bit, EBCreate BC Pro</td></tr>
              <tr><td className="p-3">50,000+</td><td className="p-3">$35.99</td><td className="p-3 text-gray-500">Geek Bar Pulse X2</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4">How Ordering Works</h2>
        <ol className="space-y-3 text-sm text-gray-600">
          <li className="flex gap-3"><span className="font-bold text-[#fe3500] shrink-0">1.</span> Browse <Link href="/vapes" className="text-[#fe3500] hover:underline">our catalog</Link> and add to cart. Filter by brand, puffs, or nicotine level.</li>
          <li className="flex gap-3"><span className="font-bold text-[#fe3500] shrink-0">2.</span> Confirm your age at checkout. We verify you are 21 or older.</li>
          <li className="flex gap-3"><span className="font-bold text-[#fe3500] shrink-0">3.</span> Choose shipping. Free on orders $89+. Standard delivery 3-7 business days.</li>
          <li className="flex gap-3"><span className="font-bold text-[#fe3500] shrink-0">4.</span> Sign for your package. Adult signature is required by federal PACT Act law.</li>
        </ol>
      </section>

      <section className="mb-10 p-5 bg-orange-50 border border-orange-200 rounded-xl text-sm text-gray-700">
        <h2 className="font-bold text-base mb-2">States We Do Not Ship To</h2>
        <p>Due to state laws restricting online flavored nicotine sales, GetSmoke does not ship to: California, New York, Massachusetts, Georgia, Maine, Nebraska, Oregon, South Dakota, Utah, Vermont, or the District of Columbia.</p>
      </section>

      <section className="mb-8">
        <h2 className="font-bold text-xl mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-sm mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mt-8">
        <Link href="/vapes" className="inline-block bg-[#fe3500] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#d42c00] transition">
          Shop Disposable Vapes at GetSmoke
        </Link>
      </div>
    </main>
  );
}
