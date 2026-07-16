import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About GetSmoke - US Disposable Vape Retailer | GetSmoke",
  description: "GetSmoke is a Florida-based online vape retailer operated by Cosmoproject LLC. We carry 900+ disposable vapes, pod systems, and hookah products from 30+ top brands. PACT Act compliant, 21+ only.",
  alternates: { canonical: "https://getsmoke.com/about-us" },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About GetSmoke",
  "url": "https://getsmoke.com/about-us",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-summary", ".speakable-facts"]
  }
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GetSmoke",
  "legalName": "Cosmoproject LLC",
  "url": "https://getsmoke.com",
  "logo": "https://getsmoke.com/images/logo.png",
  "email": "info@getsmoke.com",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "description": "GetSmoke is a US-based online retailer of disposable vapes, pod systems, hookah products, and e-liquids. PACT Act compliant, ships across the US, adults 21+ only.",
  "areaServed": "US",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vape Products",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Disposable Vapes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Pod Systems" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Hookah Products" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "E-Liquids" } }
    ]
  }
};

export default function AboutUsPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <h1 className="font-bold text-2xl md:text-3xl mb-6">
        About <span style={{ color: "#fe3500" }}>GetSmoke</span>
      </h1>

      <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">

        <p className="speakable-summary text-base md:text-lg font-semibold text-gray-800">
          GetSmoke is a US-based online vape retailer operated by Cosmoproject LLC, based in Florida. We specialize in disposable vapes, pod systems, hookah products, and e-liquids from the most trusted brands in the industry. Founded to bring a better online vaping experience to adult consumers across America, we serve customers in 39+ states with fast shipping and competitive pricing.
        </p>

        <div className="speakable-facts bg-gray-50 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "900+", label: "Products" },
            { num: "30+", label: "Brands" },
            { num: "39", label: "States Served" },
            { num: "21+", label: "Age Required" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold" style={{ color: "#fe3500" }}>{s.num}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl mt-8">Who We Are</h2>
        <p>
          GetSmoke is owned and operated by <strong>Cosmoproject LLC</strong>, a Florida-registered company. We are a licensed tobacco retailer compliant with the PACT Act (Prevent All Cigarette Trafficking Act) and all applicable federal and state regulations governing the online sale of nicotine products. Our license number is <strong>#2333778</strong>.
        </p>
        <p>
          We work directly with authorized US distributors of the top vape brands - ensuring all products are authentic, properly labeled, and meet US market requirements. We do not sell counterfeit or unregulated products.
        </p>

        <h2 className="font-bold text-xl mt-8">What We Sell</h2>
        <p>GetSmoke carries a curated selection of adult nicotine products:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Disposable Vapes</strong> - 700+ SKUs from brands like Geek Bar, HQD, Lost Mary, RAZ, FUME, Juicy Bar, Fifty Bar, Flum, VIHO, Oxbar, and more. Puff counts range from 1,200 to 70,000 puffs.</li>
          <li><strong>Pod Systems and Switch Pods</strong> - 100+ SKUs including Foger Switch, Lost Mary Nera/Ultrasonic, VIHO TRX and other kit-style systems with replaceable pods.</li>
          <li><strong>Hookah Products</strong> - 78+ SKUs including Al Fakher, Starbuzz, Fumari hookah tobacco in 250g-1kg sizes.</li>
          <li><strong>E-Liquids / Vape Juice</strong> - Salt nic and freebase e-liquids in various nicotine strengths.</li>
          <li><strong>Bundle Deals</strong> - Multi-pack discounts for bulk buyers and resellers.</li>
        </ul>

        <h2 className="font-bold text-xl mt-8">Shipping and Compliance</h2>
        <p>
          We ship to 39+ US states using FedEx, UPS, and USPS. In compliance with the PACT Act, all nicotine product deliveries require <strong>adult signature upon delivery</strong> (21+). We register with the ATF, the US Attorney General, and all required state tax authorities, and submit monthly sales reports as required by law.
        </p>
        <p>
          We do not ship to states where online vape sales are prohibited, including California, New York, Massachusetts, Utah, Vermont, and others. Orders from restricted jurisdictions are cancelled and refunded.
        </p>

        <h2 className="font-bold text-xl mt-8">Age Verification</h2>
        <p>
          GetSmoke is strictly <strong>21+ only</strong>. We implement age verification at checkout and on our website. All customers must confirm they are of legal smoking age before purchasing. We do not sell to minors under any circumstances. Our age gate, PACT Act compliance, and carrier signature requirements create multiple layers of protection.
        </p>

        <h2 className="font-bold text-xl mt-8">Why Choose GetSmoke?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Authentic products</strong> - We source only from authorized US distributors</li>
          <li><strong>Fast shipping</strong> - Most orders ship same or next business day</li>
          <li><strong>Free shipping</strong> - On orders over $89</li>
          <li><strong>Wide selection</strong> - 900+ products across all major brands and flavors</li>
          <li><strong>Competitive pricing</strong> - $14.99-$24.99 for most disposables</li>
          <li><strong>PACT Act compliant</strong> - Legal, regulated, responsible retail</li>
        </ul>

        <h2 className="font-bold text-xl mt-8">Contact Us</h2>
        <p>
          Customer support: <a href="mailto:info@getsmoke.com" className="text-[#fe3500] underline">info@getsmoke.com</a><br />
          Company: Cosmoproject LLC, Florida, USA<br />
          License: #2333778
        </p>

        <p className="text-xs text-gray-400 mt-8 p-4 bg-gray-50 rounded-xl">
          <strong>WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical. For use by adults 21 years of age or older. Keep out of reach of children and pets. If you are pregnant, nursing, or have a heart condition, consult a doctor before use.
        </p>
      </div>
    </main>
  );
}
