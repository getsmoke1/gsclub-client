import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buy Disposable Vapes Online - Fast US Shipping | GetSmoke",
  description: "Buy disposable vapes online at GetSmoke. 700+ products from 30+ brands. Free shipping on orders over $89. PACT Act compliant, adults 21+ only. Ships to 39 states.",
  alternates: { canonical: "https://getsmoke.com/buy-disposable-vapes-online" },
  openGraph: {
    title: "Buy Disposable Vapes Online | GetSmoke",
    description: "700+ disposable vapes, 30+ brands, free shipping over $89. PACT Act compliant US retailer.",
    url: "https://getsmoke.com/buy-disposable-vapes-online",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is the best place to buy disposable vapes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke (getsmoke.com) is a licensed US vape retailer offering 700+ disposable vapes from 30+ top brands. We are PACT Act compliant, ship to 39+ states, and offer free shipping on orders over $89. All purchases require age verification (21+)."
      }
    },
    {
      "@type": "Question",
      "name": "Is it legal to buy vapes online in the US?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it is legal to buy vapes online in most US states from licensed PACT Act-compliant retailers. Retailers must verify age (21+), register with state tax authorities, and use carriers that require adult signature on delivery. Some states prohibit online vape sales - including California, New York, and Massachusetts."
      }
    },
    {
      "@type": "Question",
      "name": "How long does shipping take for online vape orders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke ships most orders within 1 business day. Delivery typically takes 3-7 business days depending on your location. All vape shipments require an adult signature (21+) at delivery per PACT Act requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What states can you not buy vapes online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GetSmoke does not ship to: California, New York, Massachusetts, Georgia, Maine, Nebraska, Oregon, South Dakota, Utah, Vermont, and the District of Columbia due to state laws prohibiting online sales of flavored nicotine products."
      }
    },
    {
      "@type": "Question",
      "name": "Do online vape shops require age verification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Licensed online vape retailers verify age at checkout (must be 21+) and require adult signature upon delivery. GetSmoke uses both website age gates and carrier-level signature verification to ensure compliance."
      }
    }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Buy Disposable Vapes Online",
  "url": "https://getsmoke.com/buy-disposable-vapes-online",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-intro", ".speakable-why"]
  }
};

const WHY_US = [
  { icon: "📦", title: "700+ Products", body: "Widest selection of disposable vapes, pods, hookah, and e-liquids from all major US brands in one place." },
  { icon: "🚀", title: "Fast Shipping", body: "Most orders ship same or next business day. Delivery in 3-7 business days to most US locations." },
  { icon: "💸", title: "Free Shipping $89+", body: "Orders over $89 ship free. Flat rate $7.69 on smaller orders. No surprise fees at checkout." },
  { icon: "✅", title: "PACT Act Compliant", body: "Licensed US tobacco retailer. Registered with ATF, state tax authorities. Full legal compliance." },
  { icon: "🔒", title: "Secure Checkout", body: "SSL-encrypted checkout. We accept Visa, Mastercard, Amex, and Discover. No stored card data." },
  { icon: "🔞", title: "21+ Verified", body: "Age verified at checkout and at delivery via carrier adult-signature requirement." },
];

const TOP_CATEGORIES = [
  { name: "Disposable Vapes", desc: "700+ SKUs, 1,200-40,000 puffs", href: "/vapes", badge: "Most Popular" },
  { name: "Switch Pods", desc: "100+ pod systems and replacement pods", href: "/pods", badge: null },
  { name: "Hookah Products", desc: "78+ hookah tobacco from top brands", href: "/hookah", badge: null },
  { name: "Bundle Deals", desc: "Multi-pack discounts and combo deals", href: "/bundles", badge: "Best Value" },
];

export default function BuyDisposableVapesOnlinePage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span>Buy Disposable Vapes Online</span>
      </nav>

      <h1 className="font-bold text-2xl md:text-3xl mb-4">
        Buy Disposable Vapes Online
      </h1>

      <p className="speakable-intro text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
        GetSmoke is a licensed US online vape retailer shipping to 39+ states. We carry 700+ disposable vapes from the top brands - Geek Bar, HQD, Lost Mary, RAZ, FUME, Juicy Bar, and more. All products are authentic, PACT Act compliant, and delivered with adult signature verification. Free shipping on orders over $89. Adults 21+ only.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { num: "700+", label: "Disposable Vapes" },
          { num: "30+", label: "Brands" },
          { num: "$89+", label: "Free Shipping" },
          { num: "39", label: "States Served" },
        ].map(s => (
          <div key={s.label} className="text-center p-4 bg-gray-50 rounded-2xl">
            <div className="text-xl font-bold" style={{ color: "#fe3500" }}>{s.num}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-4">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {TOP_CATEGORIES.map(cat => (
          <Link key={cat.name} href={cat.href}
            className="block border border-gray-200 rounded-2xl p-5 hover:border-gray-400 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-bold text-sm mb-1">{cat.name}</div>
                <div className="text-xs text-gray-500">{cat.desc}</div>
              </div>
              {cat.badge && (
                <span className="text-xs px-2 py-1 rounded-full text-white flex-shrink-0" style={{ background: "#fe3500" }}>
                  {cat.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-4">Why Buy From GetSmoke?</h2>
      <div className="speakable-why grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {WHY_US.map(w => (
          <div key={w.title} className="flex gap-3 p-4 border border-gray-100 rounded-2xl">
            <span className="text-2xl flex-shrink-0">{w.icon}</span>
            <div>
              <div className="font-bold text-sm mb-1">{w.title}</div>
              <p className="text-xs text-gray-600 leading-relaxed">{w.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-xl mb-4">How Online Vape Ordering Works</h2>
      <div className="space-y-3 mb-10">
        {[
          { step: "1", text: "Browse and add products to your cart. All prices include no hidden fees." },
          { step: "2", text: "At checkout, confirm you are 21+ and enter your shipping address. Restricted states (CA, NY, MA and others) will be blocked automatically." },
          { step: "3", text: "Complete payment securely. We accept Visa, Mastercard, Amex, Discover." },
          { step: "4", text: "Your order ships within 1 business day via FedEx, UPS, or USPS with tracking." },
          { step: "5", text: "An adult (21+) must sign for delivery. If no one is available, the carrier will reattempt or hold at a local pickup location." },
        ].map(s => (
          <div key={s.step} className="flex gap-4 items-start text-sm">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: "#fe3500" }}>{s.step}</div>
            <p className="text-gray-600 leading-relaxed pt-1">{s.text}</p>
          </div>
        ))}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/best-disposable-vapes" className="block border border-gray-200 rounded-2xl p-4 hover:border-gray-400 transition-colors text-center">
          <div className="font-bold text-sm mb-1">Best Picks 2025</div>
          <div className="text-xs text-gray-500">Top 5 disposable vapes</div>
        </Link>
        <Link href="/disposable-vape-buying-guide" className="block border border-gray-200 rounded-2xl p-4 hover:border-gray-400 transition-colors text-center">
          <div className="font-bold text-sm mb-1">Buying Guide</div>
          <div className="text-xs text-gray-500">How to choose the right vape</div>
        </Link>
        <Link href="/vapes" className="block rounded-2xl p-4 text-white text-center" style={{ background: "#fe3500" }}>
          <div className="font-bold text-sm mb-1">Shop Now</div>
          <div className="text-xs opacity-80">700+ vapes in stock</div>
        </Link>
      </div>
    </main>
  );
}
