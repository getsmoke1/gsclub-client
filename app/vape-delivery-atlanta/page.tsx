import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vape Delivery to Atlanta | Fast Shipping from GetSmoke | GetSmoke",
  description: "Order disposable vapes online with fast delivery to Atlanta, GA. Geek Bar Pulse 2, RAZ, HQD and more — all legal flavors, 21+ verified. Free shipping on orders $89+ at GetSmoke.",
  alternates: { canonical: "https://getsmoke.com/vape-delivery-atlanta" },
  openGraph: {
    title: "Vape Delivery to Atlanta | Fast Shipping from GetSmoke | GetSmoke",
    description: "Order disposable vapes online with fast delivery to Atlanta, GA. Geek Bar Pulse 2, RAZ, HQD and more — all legal flavors, 21+ verified. Free shipping on orders $89+ at GetSmoke.",
    url: "https://getsmoke.com/vape-delivery-atlanta",
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
    name: "Fume Hookah 20K",
    puffs: "20,000 puffs",
    slug: "fume-hookah-20000-puffs",
    image: "/model-banners/fume-hookah-hero.jpg",
    price: "from $15.99",
    tag: "Atlanta Favorite",
  },
  {
    name: "Lost Mary MO20000",
    puffs: "20,000 puffs",
    slug: "lost-mary-mo20000-20000-puffs",
    image: "/model-banners/lost-mary-mo20000-hero.jpg",
    price: "from $16.89",
    tag: "Top Rated",
  },
  {
    name: "Geek Bar Pulse X",
    puffs: "25,000 puffs",
    slug: "geek-bar-pulse-x-25000-puffs",
    image: "/model-banners/geek-bar-pulse-x-hero.jpg",
    price: "from $14.99",
    tag: "Miami Mint Pick",
  },
];

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">

      {/* Hero */}
      <h1 className="text-3xl font-bold mb-4">Vape Delivery to Atlanta | Fast Shipping from GetSmoke</h1>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Atlanta is the largest market in the Southeast US, with the metro area covering over 6.1 million people across the broader region. Georgia&apos;s vape regulations include a $0.05-per-milliliter excise tax, which reflects in retail pricing but does not restrict product availability. This page covers Atlanta delivery, popular Southeast picks, and Georgia-specific vape law.
      </p>

      {/* Trust badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: "⚡", title: "1-3 Day Delivery", sub: "to Atlanta metro" },
          { icon: "", title: "Free Shipping", sub: "orders $89+" },
          { icon: "✅", title: "All Flavors Legal", sub: "No GA flavor ban" },
          { icon: "", title: "21+ Verified", sub: "Adult signature req." },
        ].map((b) => (
          <div key={b.title} className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{b.icon}</div>
            <div className="font-semibold text-gray-900 text-xs">{b.title}</div>
            <div className="text-gray-500 text-xs">{b.sub}</div>
          </div>
        ))}
      </div>

      {/* Georgia Laws */}
      <h2 className="text-2xl font-bold mb-3 mt-6">What Georgia Vape Laws Mean for You</h2>
      <p className="mb-4 text-gray-700 leading-relaxed">Georgia remains a generally vape-permissive state in 2026 with a few specific rules to be aware of:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
        <li><strong>Legal age: 21 and over.</strong> Georgia matches the federal Tobacco 21 standard.</li>
        <li><strong>Vape excise tax: $0.05 per milliliter of consumable vapor product.</strong> Georgia imposes a small per-ml tax that gets factored into product pricing.</li>
        <li><strong>Annual retailer licensing required.</strong> Online retailers shipping into Georgia must hold appropriate state licensing. GetSmoke complies with all required state-level licensing.</li>
        <li><strong>No flavor ban.</strong> All disposable vape flavors remain legal in Georgia.</li>
        <li><strong>Online purchase compliance:</strong> PACT Act compliance applies. Adult signature 21+ required at delivery.</li>
      </ul>

      {/* Featured Products */}
      <div className="my-10">
        <h2 className="text-2xl font-bold mb-6">Top Picks for Atlanta Customers</h2>
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
        <div className="mt-5 text-center">
          <Link href="/vapes" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Shop All Disposable Vapes →
          </Link>
        </div>
      </div>

      {/* Delivery Coverage */}
      <h2 className="text-2xl font-bold mb-3 mt-6">Atlanta Delivery Coverage</h2>
      <p className="mb-4 text-gray-700 leading-relaxed">Fast US shipping covers Atlanta and the broader Atlanta metro:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
        <li><strong>Inside the Perimeter (ITP):</strong> Midtown, Buckhead, Downtown, Virginia-Highland, Old Fourth Ward, Inman Park, West End, East Atlanta</li>
        <li><strong>North Atlanta:</strong> Sandy Springs, Dunwoody, Roswell, Alpharetta, Marietta, Smyrna</li>
        <li><strong>South Atlanta:</strong> East Point, Hapeville, College Park, Forest Park</li>
        <li><strong>East Atlanta:</strong> Decatur, Stone Mountain, Tucker, Lithonia</li>
        <li><strong>West Atlanta:</strong> Mableton, Powder Springs, Douglasville</li>
        <li><strong>Broader metro:</strong> Gainesville, Athens, Newnan, Stockbridge served via standard shipping</li>
      </ul>
      <p className="mb-4 text-gray-700 leading-relaxed">
        Atlanta&apos;s vape market reflects a diverse customer base. Music industry concentration drives some demand for hookah-style and statement disposables. Atlanta also leads our Southeast region in subscribe-and-save sign-up rates, suggesting more committed brand loyalty than transient markets like Miami.
      </p>

      {/* Popular Picks */}
      <h2 className="text-2xl font-bold mb-3 mt-6">Popular Picks in the Atlanta Market</h2>
      <p className="mb-4 text-gray-700 leading-relaxed">Three picks that lead Atlanta orders:</p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        <Link href="/best-25000-puff-disposable-vapes-2026/" className="text-blue-600 hover:underline font-medium">RAZ DC25000</Link>: Atlanta is one of RAZ&apos;s strongest regional markets. The brand&apos;s flavor accuracy reputation has driven strong word-of-mouth in the area.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        <Link href="/models/fume-hookah-20000-puffs" className="text-blue-600 hover:underline font-medium">Fume Hookah 20K</Link>: Hookah-style disposables over-index in Atlanta, partly due to cultural influence from the music and nightlife scenes.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        <Link href="/best-mint-disposable-vapes-2026/" className="text-blue-600 hover:underline font-medium">Miami Mint Geek Bar Pulse</Link>: Atlanta&apos;s hot summers drive mint disposable demand. Strong daily-driver pick across the metro.
      </p>

      {/* How shipping works */}
      <h2 className="text-2xl font-bold mb-3 mt-6">How Fast Shipping Works to Atlanta</h2>
      <p className="mb-4 text-gray-700 leading-relaxed">Standard fast US shipping to Atlanta takes 1 to 3 business days:</p>
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700">
        <li><strong>Order online.</strong> Add products to your cart and enter your Atlanta shipping address.</li>
        <li><strong>Age verification at checkout.</strong> 21+ verification required.</li>
        <li><strong>Fast delivery with adult signature.</strong> Adult signature 21+ required at door with photo ID. PACT Act compliance is mandatory for all vape shipments.</li>
      </ol>

      {/* Top Brands */}
      <h2 className="text-2xl font-bold mb-3 mt-6">Top Brands We Ship to Atlanta</h2>
      <ul className="list-disc pl-6 mb-6 space-y-1 text-gray-700">
        <li><Link href="/brands/geek-bar" className="text-blue-600 hover:underline">Geek Bar</Link>: Pulse X2 50K, Pulse 2 25K, Pulse X 25K, Meloso, Lush, Skyview - 130+ products</li>
        <li><Link href="/brands/juicy-bar" className="text-blue-600 hover:underline">Juicy Bar</Link>: JB5000, JB7500 PRO, JB25000 PRO MAX</li>
        <li><Link href="/brands/lost-mary" className="text-blue-600 hover:underline">Lost Mary</Link>: MO20000, MT15000, MT35000 Turbo, Nera Fullview, Nera Pureview</li>
        <li><Link href="/brands/hqd" className="text-blue-600 hover:underline">HQD</Link>: Cuvie Plus, Cuvie Bar, Cuvie Glaze, Mars, Everest 25K, GO 35K</li>
        <li><Link href="/brands/fume" className="text-blue-600 hover:underline">Fume</Link>: Extra, Recharge, Eternity, PRO 30K, Hookah 20K</li>
        <li><Link href="/brands/foger" className="text-blue-600 hover:underline">Foger</Link>: Switch Pro Kit, Bit 35K</li>
        <li><Link href="/brands/ebcreate" className="text-blue-600 hover:underline">EBCreate</Link>: BC Pro 40K, BC5000 Ultra</li>
      </ul>

      {/* FAQ styled as cards */}
      <h2 className="text-2xl font-bold mb-6 mt-8">Atlanta-Specific FAQ</h2>
      <div className="space-y-4 mb-10">
        {[
          {
            q: "Does Georgia tax vape products?",
            a: "Yes. Georgia imposes a $0.05 per milliliter excise tax on consumable vapor products. This is factored into retail pricing.",
          },
          {
            q: "Is online vape delivery legal in Atlanta?",
            a: "Yes. Georgia state law permits online vape sales to verified 21+ adults. PACT Act compliance and adult signature on delivery apply.",
          },
          {
            q: "What is the Georgia retailer license requirement?",
            a: "Online retailers shipping vape products into Georgia must hold appropriate state licensing. GetSmoke maintains the required state-level licensing for Georgia.",
          },
          {
            q: "How fast is shipping to Atlanta?",
            a: "1 to 3 business days standard. Atlanta is one of our better-served Southeast markets due to logistics routing.",
          },
          {
            q: "Are there flavor restrictions in Georgia?",
            a: "No statewide flavor ban as of 2026. All disposable vape flavors remain legal in Georgia.",
          },
        ].map((item) => (
          <div key={item.q} className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
            <p className="text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-sm text-gray-500 mb-8 leading-relaxed border-l-4 border-gray-200 pl-4">
        <strong>21+ only.</strong> Nicotine is an addictive chemical. Products on getsmoke.com are intended exclusively for adults of legal smoking age (21+ in the United States). We do not sell to minors. Photo ID is required for all deliveries. Shipping is subject to applicable state and local vape regulations. Please vape responsibly.
      </p>

      {/* CTA */}
      <div className="p-6 bg-gray-900 rounded-xl text-center text-white">
        <p className="font-bold text-lg mb-1">Shop Disposable Vapes - Free Shipping Over $89</p>
        <p className="text-gray-400 text-sm mb-4">Delivered to Atlanta in 1-3 business days</p>
        <Link href="/vapes" className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Shop Now →
        </Link>
      </div>

    </main>
  );
}
