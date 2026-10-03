import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vape Shop Illinois | Buy Disposable Vapes Online | GetSmoke",
  description: "Shop premium disposable vapes online - delivered to Illinois fast. Top brands: Geek Bar, Lost Mary, RAZ, HQD. Free shipping on orders $89+. No minimum order. Adults 21+ only.",
  alternates: { canonical: "https://getsmoke.com/vape-shop-illinois" },
  openGraph: {
    title: "Vape Shop Illinois | GetSmoke",
    description: "Shop premium disposable vapes online delivered to Illinois. Geek Bar Pulse 2, RAZ, HQD and 700+ products. Free shipping $89+. Ages 21+ verified. GetSmoke.",
    url: "https://getsmoke.com/vape-shop-illinois",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

export const dynamic = "force-static";

const FEATURED_MODELS = [
  {
    name: "Geek Bar Pulse X2",
    puffs: "50,000 puffs",
    slug: "geek-bar-pulse-x2-50000-puffs",
    image: "/model-banners/geek-bar-pulse-x2-hero.jpg",
    price: "from $35.99",
    tag: "Best Seller",
  },
  {
    name: "Lost Mary MO20000",
    puffs: "20,000 puffs",
    slug: "lost-mary-mo20000-20000-puffs",
    image: "/model-banners/lost-mary-mo20000-hero.jpg",
    price: "from $16.89",
    tag: "New",
  },
  {
    name: "RAZ DC25000",
    puffs: "25,000 puffs",
    slug: "raz-dc25000-25000-puffs",
    image: "/model-banners/raz-dc25000-hero.jpg",
    price: "from $19.99",
    tag: "Top Rated",
  },
  {
    name: "HQD Cuvie Glaze",
    puffs: "15,000 puffs",
    slug: "hqd-cuvie-glaze-15000-puffs",
    image: "/model-banners/hqd-cuvie-glaze-hero.jpg",
    price: "from $16.99",
    tag: "Popular",
  },
];

const FAQ = [
  {
    q: "Do you deliver disposable vapes to Illinois?",
    a: "Yes. We ship to all Illinois addresses including Chicago, Springfield, Rockford, Aurora, Naperville, and all other cities and towns. Standard delivery takes 2-4 business days.",
  },
  {
    q: "What is the minimum order?",
    a: "There is no minimum order. You can order a single disposable vape and we will ship it to you. Free shipping applies automatically on orders over $89.",
  },
  {
    q: "What brands do you carry?",
    a: "We stock all major brands: Geek Bar, Lost Mary, RAZ, HQD, EBCreate, Fume, Fifty Bar, VIHO, Foger, and many more. New products added weekly.",
  },
  {
    q: "Do I need to be 21 to order?",
    a: "Yes. Illinois law requires purchasers to be 21 or older. We use a third-party age verification service at checkout. A valid government-issued ID is required.",
  },
  {
    q: "How long does shipping take to Illinois?",
    a: "Most orders arrive in 2-4 business days. Orders placed before 2 PM ET typically ship the same day. You will receive a tracking number via email once shipped.",
  },
  {
    q: "Can I return a disposable vape?",
    a: "We accept returns on defective products within 30 days of purchase. Contact info@getsmoke.com with your order number and a description of the issue.",
  },
];

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          Vape Shop Illinois - Buy Disposable Vapes Online
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-3xl">
          Illinois&apos; best online vape store. Shop 500+ disposable vapes from top brands - delivered anywhere in IL in 2-4 business days. Free shipping on orders $89+. No minimum order.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vapes"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Shop All Vapes
          </Link>
          <Link
            href="/vapes?sort=newest"
            className="inline-block border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            New Arrivals
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-center">
        {[
          { icon: "", title: "Free Shipping", sub: "Orders $89+" },
          { icon: "⚡", title: "Fast Delivery", sub: "2-4 days to IL" },
          { icon: "✅", title: "500+ Flavors", sub: "Top brands in stock" },
          { icon: "", title: "Age Verified", sub: "21+ only, ID required" },
        ].map((b) => (
          <div key={b.title} className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl mb-1">{b.icon}</div>
            <div className="font-semibold text-gray-900 text-sm">{b.title}</div>
            <div className="text-gray-500 text-xs">{b.sub}</div>
          </div>
        ))}
      </section>

      {/* Featured Models */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Top Selling Disposable Vapes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED_MODELS.map((model) => (
            <Link
              key={model.slug}
              href={`/models/${model.slug}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {model.tag}
                </span>
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm text-gray-900 leading-tight mb-1">{model.name}</div>
                <div className="text-xs text-gray-500 mb-1">{model.puffs}</div>
                <div className="text-sm font-bold text-gray-900">{model.price}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/vapes"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Shop All Disposable Vapes →
          </Link>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Disposable Vapes Delivered Across Illinois</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          GetSmoke ships premium disposable vapes to every corner of Illinois - from Chicago and Springfield to Rockford, Aurora, Naperville, and beyond. As an online vape retailer, we carry 500+ products from the most trusted brands: Geek Bar, Lost Mary, RAZ, HQD, EBCreate, Fume, Fifty Bar, and more.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Every order ships from our US warehouse with standard 2-4 day delivery to Illinois. Orders over $89 ship free. No subscription required - order once or anytime you need to restock.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">Why Illinois Vapers Choose GetSmoke</h3>
        <ul className="space-y-2 text-gray-700 mb-4 list-disc pl-5">
          <li><strong>No minimum order</strong> - buy one or ten, we ship either way.</li>
          <li><strong>Age-verified checkout</strong> - compliant with all Illinois vaping regulations.</li>
          <li><strong>Real product reviews</strong> - shop by ratings and verified purchases.</li>
          <li><strong>Loyalty rewards</strong> - earn points on every order, redeem for discounts.</li>
          <li><strong>Subscription option</strong> - save 10% on repeat orders of your favorites.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">Popular Vape Brands in Illinois</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Illinois vapers consistently top our best-seller lists with high-puff devices. The{" "}
          <Link href="/models/geek-bar-pulse-x2-50000-puffs" className="text-blue-600 hover:underline">Geek Bar Pulse X2</Link>{" "}
          (50,000 puffs) and{" "}
          <Link href="/models/lost-mary-mo20000-20000-puffs" className="text-blue-600 hover:underline">Lost Mary MO20000</Link>{" "}
          (20,000 puffs) are especially popular in the Chicago area. Berry, mint, and ice flavors are consistently top sellers.
        </p>

        <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">Illinois Vaping Laws</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Illinois law requires purchasers to be 21 or older to buy vaping products. GetSmoke uses a third-party age verification service at checkout to ensure compliance. Adult signature is required upon delivery per PACT Act regulations. We ship only to verified adults with a confirmed delivery address in the state.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Ready to order?</h2>
        <p className="text-gray-600 mb-4">Browse 500+ disposable vapes. Free shipping on $89+. Delivered to Illinois in 2-4 days.</p>
        <Link
          href="/vapes"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Shop All Vapes →
        </Link>
      </section>

    </main>
  );
}
