import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://getsmoke.com";
const PAGE_URL = `${SITE_URL}/vape-delivery-boston-massachusetts`;

export const metadata: Metadata = {
  title: "Vape Delivery to Boston, Massachusetts | Fast Shipping - GetSmoke",
  description:
    "Fast vape delivery to Boston, MA. Shop Geek Bar, RAZ, Lost Mary, HQD and more. 1-3 business day shipping to Boston and Greater Boston area. Adults 21+ only. PACT Act compliant.",
  alternates: { canonical: PAGE_URL },
  keywords: [
    "vape delivery boston",
    "buy vapes online boston ma",
    "disposable vapes boston massachusetts",
    "online vape shop boston",
    "fast vape shipping boston",
    "best disposable vapes boston",
  ],
  openGraph: {
    title: "Vape Delivery to Boston, Massachusetts | GetSmoke",
    description:
      "Fast 1-3 day vape delivery to Boston and Greater Boston. Geek Bar, RAZ, Lost Mary, HQD and more. Adults 21+ only.",
    url: PAGE_URL,
    siteName: "GetSmoke",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Vape Delivery to Boston Massachusetts",
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast is vape delivery to Boston, MA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard shipping to Boston takes 1 to 3 business days. Orders placed before 2 PM EST typically ship same day. All deliveries require an adult signature from a verified 21+ customer with photo ID.",
      },
    },
    {
      "@type": "Question",
      name: "Is online vape delivery legal in Boston, Massachusetts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Massachusetts law restricts online delivery of flavored vape products to consumers. Only tobacco-flavored and menthol vape products can be shipped to Massachusetts addresses. This is due to Massachusetts' Chapter 133 (2019) which bans the sale of all flavored tobacco products including most flavored vapes. GetSmoke does not ship restricted flavors to Massachusetts.",
      },
    },
    {
      "@type": "Question",
      name: "Are flavored vapes legal in Boston?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Massachusetts enacted a comprehensive flavored tobacco and vape ban in 2019 under Chapter 133. All flavored e-cigarette products except menthol are prohibited for sale in Massachusetts, including online delivery. Only tobacco-flavored disposable vapes can be shipped to Boston addresses.",
      },
    },
    {
      "@type": "Question",
      name: "What age do you have to be to buy vapes in Boston?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "21 years old. Massachusetts matches the federal Tobacco 21 standard. All online vape purchases require 21+ age verification and adult signature upon delivery with valid photo ID.",
      },
    },
    {
      "@type": "Question",
      name: "Does Massachusetts have a vape tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Massachusetts imposes a 75% excise tax on the wholesale price of vape products as of 2020. This is among the highest state vape taxes in the US. Online purchases shipped to Massachusetts addresses are subject to this tax under PACT Act reporting requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Which disposable vapes can be shipped to Boston?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Due to Massachusetts' flavored vape ban, only tobacco-flavored and unflavored disposable vapes can be delivered to Boston. Classic Tobacco, Virginia Tobacco, and similar tobacco-profile flavors from brands like Geek Bar, RAZ, Lost Mary, and HQD are eligible for delivery to Massachusetts addresses.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Order Vapes Online for Delivery to Boston",
  url: PAGE_URL,
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Browse tobacco-flavored vapes",
      text: "Visit GetSmoke and filter by tobacco or menthol flavors - the only flavors legally shippable to Massachusetts.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Add to cart and enter your Boston address",
      text: "Add your chosen products to the cart. At checkout, enter your Boston, MA shipping address.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Complete 21+ age verification",
      text: "All vape orders require age verification. You must confirm you are 21 or older at checkout.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Sign for delivery",
      text: "Expect delivery in 1-3 business days. An adult 21+ must be present to sign for the package with valid photo ID. This is required by federal PACT Act law.",
    },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Vape Delivery to Boston, Massachusetts",
  url: PAGE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".delivery-lead", "h2"],
  },
};

export default function VapeDeliveryBostonPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
        strategy="beforeInteractive"
      />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Vape Delivery Boston</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">
          Vape Delivery to Boston, Massachusetts
        </h1>
        <p className="delivery-lead text-lg text-gray-600 mb-8 leading-relaxed">
          GetSmoke ships disposable vapes to Boston and the Greater Boston area
          with 1-3 business day delivery. Massachusetts has one of the strictest
          vape laws in the US - only <strong>tobacco-flavored vapes</strong> can
          be shipped to Boston addresses. All orders require 21+ age
          verification and adult signature on delivery.
        </p>

        {/* MA Flavor Restriction Warning */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 mb-8">
          <p className="font-semibold text-amber-800 mb-2">
            ⚠️ Important: Massachusetts Flavor Restrictions
          </p>
          <p className="text-amber-700 text-sm leading-relaxed">
            Massachusetts banned all flavored vape products in 2019 (Chapter
            133). Only <strong>tobacco-flavored</strong> and menthol disposable
            vapes can be legally shipped to Boston, MA addresses. Fruit, dessert,
            candy, and other flavors cannot be shipped to Massachusetts.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          Massachusetts Vape Laws - What Boston Customers Need to Know
        </h2>
        <ol className="space-y-3 text-gray-700 mb-8">
          <li>
            <strong>1. Flavored vape ban (2019).</strong> Chapter 133 bans
            sales of all flavored tobacco products including flavored
            e-cigarettes. Only tobacco-flavored and menthol vapes can be sold
            or shipped to MA.
          </li>
          <li>
            <strong>2. Legal age: 21+.</strong> Massachusetts requires 21+ for
            all tobacco and vape purchases. Valid photo ID required at delivery.
          </li>
          <li>
            <strong>3. 75% wholesale excise tax.</strong> MA taxes vape products
            at 75% of wholesale price - one of the highest in the US. This is
            factored into pricing at checkout.
          </li>
          <li>
            <strong>4. PACT Act compliance.</strong> All online vape shipments
            to Massachusetts must comply with federal PACT Act reporting. Adult
            signature required at delivery - no exceptions.
          </li>
          <li>
            <strong>5. No nicotine-free exemption.</strong> Massachusetts
            restrictions apply to all vape products regardless of nicotine
            content when flavored.
          </li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          Boston Delivery Coverage
        </h2>
        <p className="text-gray-700 mb-4">
          We ship to all Boston-area ZIP codes including:
        </p>
        <ol className="space-y-1 text-gray-700 mb-6">
          <li>1. <strong>Boston proper</strong> - Downtown, Back Bay, South End, Fenway, Charlestown, East Boston, South Boston</li>
          <li>2. <strong>Cambridge and Somerville</strong> - Harvard Square, Central Square, Kendall Square, Davis Square</li>
          <li>3. <strong>Inner suburbs</strong> - Brookline, Newton, Watertown, Arlington, Medford, Malden</li>
          <li>4. <strong>North Shore</strong> - Salem, Peabody, Beverly, Lynn, Gloucester</li>
          <li>5. <strong>South Shore</strong> - Quincy, Braintree, Weymouth, Plymouth</li>
          <li>6. <strong>MetroWest</strong> - Framingham, Natick, Marlborough, Waltham</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          How to Order Vapes for Delivery to Boston
        </h2>
        <ol className="space-y-4 mb-8">
          {howToSchema.step.map((step) => (
            <li key={step.position} className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {step.position}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{step.name}</p>
                <p className="text-gray-600 text-sm mt-0.5">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          Vapes That Can Be Shipped to Boston
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Only tobacco-flavored variants from these brands can be delivered to
          Massachusetts:
        </p>
        <ol className="space-y-2 text-gray-700 mb-8">
          <li>
            1. <Link href="/brands/geek-bar" className="text-orange-500 font-semibold hover:underline">Geek Bar</Link> - Classic Tobacco, Virginia Tobacco variants
          </li>
          <li>
            2. <Link href="/brands/raz" className="text-orange-500 font-semibold hover:underline">RAZ</Link> - Tobacco flavor variants (DC25000, TN9000)
          </li>
          <li>
            3. <Link href="/brands/lost-mary" className="text-orange-500 font-semibold hover:underline">Lost Mary</Link> - Tobacco profile flavors
          </li>
          <li>
            4. <Link href="/brands/hqd" className="text-orange-500 font-semibold hover:underline">HQD</Link> - Tobacco variants (Cuvie series)
          </li>
          <li>
            5. <Link href="/brands/fume" className="text-orange-500 font-semibold hover:underline">Fume</Link> - Classic Tobacco flavors
          </li>
        </ol>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Boston Vape Delivery FAQ
        </h2>
        <div className="space-y-6">
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-orange-50 border border-orange-200 rounded-2xl">
          <p className="font-semibold mb-2">
            Shop Tobacco Vapes - Ships to Boston
          </p>
          <p className="text-sm text-gray-600 mb-3">
            1-3 day shipping to Boston, MA. Adults 21+ only. Adult signature
            required on delivery.
          </p>
          <Link
            href="/vapes"
            className="inline-block bg-orange-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Vapes
          </Link>
        </div>

        {/* Related city pages */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Other cities we deliver to:
          </p>
          <ol className="space-y-1 text-sm">
            <li>1. <Link href="/vape-delivery-miami" className="text-orange-500 hover:underline">Vape Delivery Miami, FL</Link></li>
            <li>2. <Link href="/vape-delivery-chicago" className="text-orange-500 hover:underline">Vape Delivery Chicago, IL</Link></li>
            <li>3. <Link href="/vape-delivery-atlanta" className="text-orange-500 hover:underline">Vape Delivery Atlanta, GA</Link> (restricted)</li>
            <li>4. <Link href="/vape-delivery-phoenix" className="text-orange-500 hover:underline">Vape Delivery Phoenix, AZ</Link></li>
            <li>5. <Link href="/vape-delivery-las-vegas-nevada" className="text-orange-500 hover:underline">Vape Delivery Las Vegas, NV</Link></li>
          </ol>
        </div>
      </main>
    </>
  );
}
