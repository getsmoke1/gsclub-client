import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vape Shop Wisconsin | Buy Disposable Vapes Online | GetSmoke",
  description: "Shop premium disposable vapes online - delivered to Wisconsin fast. Top brands: Geek Bar, Lost Mary, Fume, EBCreate. Free shipping on orders $89+. No minimum order.",
  alternates: { canonical: "https://getsmoke.com/vape-shop-wisconsin" },
  openGraph: {
    title: "Vape Shop Wisconsin | GetSmoke",
    description: "Shop premium disposable vapes online delivered to Wisconsin. Geek Bar Pulse 2, RAZ, HQD and 700+ products. Free shipping $89+. Ages 21+ verified. GetSmoke.",
    url: "https://getsmoke.com/vape-shop-wisconsin",
    images: [{ url: "https://getsmoke.com/og-default.jpg" }],
  },
};

export const dynamic = "force-static";

const PRODUCTS = [
  {
    slug: "geek-bar-pulse-x2-50000-puffs",
    name: "Geek Bar Pulse X2",
    image: "/model-banners/geek-bar-pulse-x2-hero.jpg",
    price: "from $14.99",
    tag: "Best Seller",
  },
  {
    slug: "lost-mary-mo20000-20000-puffs",
    name: "Lost Mary MO20000",
    image: "/model-banners/lost-mary-mo20000-hero.jpg",
    price: "from $13.99",
    tag: "Top Rated",
  },
  {
    slug: "ebcreate-bc-pro-40000-puffs",
    name: "EBCreate BC Pro",
    image: "/model-banners/ebcreate-bc-pro-hero.jpg",
    price: "from $15.99",
    tag: "New",
  },
  {
    slug: "geek-bar-pulse-2-25000-puffs",
    name: "Geek Bar Pulse 2",
    image: "/model-banners/geek-bar-pulse-2-hero.jpg",
    price: "from $14.99",
    tag: "Popular",
  },
];

const FAQ = [
  {
    q: "Do you deliver disposable vapes to Wisconsin?",
    a: "Yes. We ship to all Wisconsin addresses including Milwaukee, Madison, Green Bay, Kenosha, Racine, Appleton, and rural areas. Standard delivery takes 2-4 business days.",
  },
  {
    q: "What is the minimum order?",
    a: "There is no minimum order. You can order a single disposable vape and we will ship it to you. Free shipping applies automatically on orders over $89.",
  },
  {
    q: "Are disposable vapes legal in Wisconsin?",
    a: "Yes. Disposable nicotine vapes are legal for adults 21+ in Wisconsin. All products comply with federal regulations and Wisconsin state law.",
  },
  {
    q: "How long does shipping to Wisconsin take?",
    a: "Standard shipping to Wisconsin takes 2-4 business days. Priority shipping options are available at checkout for faster delivery.",
  },
  {
    q: "What brands do you carry?",
    a: "We carry all major brands including Geek Bar, Lost Mary, RAZ, HQD, Fume, EBCreate, Oxbar, and dozens more. New models are added weekly.",
  },
  {
    q: "Do you have a local Wisconsin vape shop?",
    a: "We are an online-only retailer which allows us to offer better prices and a much wider selection than any local shop. Order online and receive delivery straight to your door.",
  },
];

export default function VapeShopWisconsinPage() {
  return (
    <main className="font-unbounded bg-white text-black">
      {/* Hero */}
      <section className="bg-black text-white py-14 px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Vape Shop Wisconsin
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6">
          Buy disposable vapes online - delivered to Wisconsin. Top brands, best prices, free shipping on orders $89+.
        </p>
        <Link
          href="/vapes"
          className="inline-block bg-[#fe3500] text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition"
        >
          Shop All Vapes
        </Link>
      </section>

      {/* Trust badges */}
      <section className="border-b border-gray-100 py-5 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs md:text-sm">
          {[
            { icon: "", text: "Free shipping $89+" },
            { icon: "✅", text: "Adults 21+ only" },
            { icon: "", text: "2-4 day delivery" },
            { icon: "", text: "Secure checkout" },
          ].map((b) => (
            <div key={b.text} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-gray-600">{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top products */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
          Top Disposable Vapes Delivered to Wisconsin
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/models/${p.slug}`}
              className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition flex flex-col"
            >
              <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-50">
                <Image src={p.image} alt={p.name} fill className="object-contain p-2" />
                <span className="absolute top-2 left-2 bg-[#fe3500] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {p.tag}
                </span>
              </div>
              <p className="font-bold text-sm">{p.name}</p>
              <p className="text-[#fe3500] text-sm mt-1">{p.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/vapes"
            className="inline-block border-2 border-black text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition"
          >
            View All 700+ Products
          </Link>
        </div>
      </section>

      {/* About section */}
      <section className="bg-gray-50 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4">
            Why Wisconsin Vapers Choose GetSmoke
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            GetSmoke is a US-based online vape store shipping premium disposable vapes to Wisconsin and all 50 states. Whether you are in Milwaukee, Madison, Green Bay, Kenosha, or anywhere in between, we deliver the latest vape models straight to your door.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We carry the newest models from Geek Bar, Lost Mary, RAZ, HQD, Fume, EBCreate, and 30+ other top brands. Our catalog is updated weekly so you always have access to the latest releases before local shops get them.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Free shipping on orders over $89. No subscription required. Adults 21+ only. All products contain nicotine, an addictive chemical.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-sm mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-10 px-4 text-center">
        <p className="font-bold text-lg mb-2">Ready to order?</p>
        <p className="text-gray-400 text-sm mb-6">
          Free shipping on orders $89+. Delivered to Wisconsin in 2-4 days.
        </p>
        <Link
          href="/vapes"
          className="inline-block bg-[#fe3500] text-white px-10 py-3 rounded-full font-bold hover:bg-red-600 transition"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
}
