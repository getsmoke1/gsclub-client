import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vape Shop Texas | Buy Disposable Vapes Online | GetSmoke",
  description: "Shop premium disposable vapes online - delivered to Texas fast. Top brands: Geek Bar, Lost Mary, Fume, EBCreate. Free shipping on orders $89+. No minimum order.",
  alternates: { canonical: "https://getsmoke.com/vape-shop-texas" },
  openGraph: {
    title: "Vape Shop Texas | GetSmoke",
    description: "Shop premium disposable vapes online with fast delivery to Texas. Geek Bar Pulse 2, RAZ DC25000, HQD and more. Free shipping $89+. All ages 21+ verified. GetSmoke.",
    url: "https://getsmoke.com/vape-shop-texas",
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
    q: "Do you deliver disposable vapes to Texas?",
    a: "Yes. We ship to all Texas addresses including Houston, Dallas, Austin, San Antonio, Fort Worth, El Paso, and rural areas. Standard delivery takes 2-4 business days.",
  },
  {
    q: "What is the minimum order?",
    a: "There is no minimum order. You can order a single disposable vape and we will ship it to you. Free shipping applies automatically on orders over $89.",
  },
  {
    q: "Are disposable vapes legal in Texas?",
    a: "Yes. Disposable nicotine vapes are legal for adults 21+ in Texas. All products comply with federal regulations and Texas state law.",
  },
  {
    q: "How long does shipping to Texas take?",
    a: "Standard shipping to Texas takes 2-4 business days. Priority shipping options are available at checkout for faster delivery.",
  },
  {
    q: "What brands do you carry?",
    a: "We carry all major brands including Geek Bar, Lost Mary, RAZ, HQD, Fume, EBCreate, Oxbar, and dozens more. New models are added weekly.",
  },
  {
    q: "Do you have a local Texas vape shop?",
    a: "We are an online-only retailer which allows us to offer better prices and a much wider selection than any local shop. Order online and receive delivery straight to your door.",
  },
];

export default function VapeShopTexasPage() {
  return (
    <main className="font-unbounded bg-white text-black">
      {/* Hero */}
      <section className="bg-black text-white py-14 px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Vape Shop Texas
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6">
          Buy disposable vapes online - delivered to Texas. Top brands, best prices, free shipping on orders $89+.
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
          Top Disposable Vapes Delivered to Texas
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

      {/* Existing page content - preserved as-is */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <p className="mb-4 text-gray-700 leading-relaxed">Welcome to Getsmoke, your premier Vape Shop in Texas! We take pride in offering an extensive selection of high-quality vape products, including e-cigarettes, disposable vapes, nicotine salts, and mouthwatering eLiquids from top vape brands. Our commitment extends beyond just providing products; we aim to create a welcoming environment for both novice and seasoned vapers. In our shop, you&apos;ll find everything from premium devices to accessories that enhance your vaping experience, all while promoting responsible awareness about vaping. We serve customers not only in Austin but also in Round Rock, Cedar Park, Georgetown, and Pflugerville, ensuring everyone can access the best vaping solutions in Texas, including our renowned online vape shop services.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">At Getsmoke, our passion for the vaping community drives our mission to provide Texans with the finest selection of vape products and accessories, promoting a healthy and satisfying vaping lifestyle.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">Our mission at Getsmoke is to foster a vibrant vape community by providing quality vapes and exceptional customer service while promoting responsible and enjoyable vaping experiences. We ensure our patrons understand nicotine levels and make informed choices. At the heart of this mission is a commitment to seamless customer engagement, ensuring that individuals feel welcome and informed each time they interact with our brand. This translates into daily operations where staff members are not just sales associates, but also knowledgeable guides, eager to educate patrons about the various vape products available.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>By offering workshops and informational sessions, customers gain insights into responsible vaping practices.</li>
          <li>This encourages a culture of safety, making informed choices that promote well-being within the community.</li>
          <li>Quality control remains paramount as each product undergoes rigorous testing to ensure it meets our high standards.</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">Through these efforts, Getsmoke not only provides exceptional products but also serves as a pillar of support for the community, reinforcing a sustainable and enjoyable vaping experience.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">At Getsmoke, we offer a diverse range of products, including premium eLiquids and a variety of accessories designed to enhance your vaping experience. Our selection is not just broad; it embodies quality and variety to meet every individual&apos;s preferences. For instance, the premium eLiquids come from top brands showcasing an array of unique flavors ranging from refreshing fruits to indulgent desserts.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">Accessories, including high-quality vaporizers and replacement coils, are curated to complement every product, ensuring you have everything needed for a seamless vaping journey.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">We understand the importance of affordability, which is why Getsmoke offers competitive prices on all our vape products without compromising on quality. Recognizing that many consumers seek budget-friendly options, the commitment to maintaining affordability is at the heart of the business strategy. By leveraging bulk purchasing and establishing direct relationships with manufacturers, the company effectively reduces costs, allowing potential savings to be passed on to customers.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>By employing strategies like seasonal promotions and loyalty rewards, you can unlock even more savings, enhancing the overall shopping experience.</li>
          <li>Competitive pricing also fosters a sense of trust and loyalty, ensuring that customers feel they are receiving the best value for their money.</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">In comparison to other retailers who might sacrifice quality for lower prices, Getsmoke ensures that every product meets stringent quality standards, thereby achieving the ideal balance between affordability and excellence.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">Our dedicated team at Getsmoke is committed to providing excellent customer service, with knowledgeable staff ready to assist you in finding the perfect vaping products to meet your needs. This commitment goes beyond a mere transaction; it encompasses a genuine desire to create a positive shopping experience for every customer.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>Expert Advice</li>
          <li>Product Demos</li>
          <li>Personalized Recommendations</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">At Getsmoke, we pride ourselves on our wide selection of vape products, ensuring that every customer can find exactly what they need to enjoy their vaping journey. The variety of available options caters to various preferences and skill levels, making it easier for both beginners and seasoned vapers to locate their ideal products.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>eLiquids: These come in various nicotine strengths and flavor profiles, appealing to those who crave something fruity, dessert-like, or even menthol.</li>
          <li>Devices: From pod systems designed for simplicity to advanced mods featuring intricate configurations, each device provides unique benefits.</li>
          <li>Accessories: Items like chargers, coils, and protective cases enhance usability, ensuring a seamless experience.</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">By offering such a diverse selection, Getsmoke supports the unique journey of every vaper, allowing them to find the perfect combination that suits their lifestyle and preferences.</p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Vape Device Repairs</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">Our vape device repairs service at Getsmoke ensures that your vaping devices remain in optimal condition, providing efficient maintenance and quick fixes for all types of devices, catering to a wide array of popular brands and models that many enthusiasts rely upon for their daily vaping experience.</p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Custom E-juice Blending</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">At Getsmoke, we offer custom e-juice blending, allowing you to create personalized flavors that perfectly suit your taste preferences and enhance your vaping experience.</p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Vape Education and Workshops</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">Our vape education programs and workshops at Getsmoke provide valuable information about vaping, ensuring customers are well-informed and responsible in their usage, enhancing their understanding of the impact of vaping on health and the community.</p>

        <p className="mb-4 text-gray-700 leading-relaxed">Our Houston location is equipped to meet the needs of the local vape community, offering a diverse range of products and services to enhance your vaping experience. Located in the vibrant heart of the city, this shop features an extensive selection of premium vape liquids and top-of-the-line hardware that caters to both beginners and seasoned enthusiasts.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>Exclusive local brands and flavors</li>
          <li>Regular community events and tastings</li>
          <li>Expert advice on usage and maintenance</li>
        </ul>

        <p className="mb-4 text-gray-700 leading-relaxed">At our Austin location, we provide an extensive selection of vaping products tailored to meet the preferences of our diverse customer base. Along with offering a variety of devices and e-liquids, this vibrant hub reflects the unique vaping culture that Austin is renowned for.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>Exclusive collaborations with local artisans.</li>
          <li>Seasonal flavors that embrace Austin&apos;s festivity.</li>
          <li>Sustainable packaging options promoting eco-consciousness.</li>
        </ul>

        <p className="mb-4 text-gray-700 leading-relaxed">Our Dallas location is a hub for the vape community, offering top-tier products and expert guidance for all your vaping needs. The staff is dedicated to providing personalized recommendations, ensuring that customers find the best vaping solutions tailored to their unique preferences.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>Regular workshops focusing on vaping techniques</li>
          <li>Exclusive product launches featuring local brands</li>
          <li>A designated lounge area for customers to connect</li>
        </ul>

        <p className="mb-4 text-gray-700 leading-relaxed">In San Antonio, Getsmoke is dedicated to providing a personalized vaping experience with our expansive selection of quality products and exceptional customer service. With a diverse range of e-liquids, devices, and accessories, there&apos;s something for every vaping enthusiast.</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 text-sm">
          <li>Local brands</li>
          <li>Premium international options</li>
          <li>Budget-friendly choices</li>
        </ul>

        <p className="mb-4 text-gray-700 leading-relaxed">At Getsmoke, we welcome you to reach out with any questions or inquiries. Connect with us at <strong>info@getsmoke.com</strong>. Your inquiries will be prioritized.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">Vape Shop Texas carries a wide variety of vape products including e-liquids, mods, tanks, and accessories from top brands in the industry. We strive to provide our customers with the latest and most popular products on the market.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">We pride ourselves on having a diverse selection of products to cater to all types of vapers. If there is a specific item you are looking for, let our staff know and we will do our best to source it for you.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">Yes, we frequently run promotions and offer discounts on our products. Be sure to sign up for our newsletter or follow us on social media to stay updated on our latest deals and promotions.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">As a trusted and reputable vape shop, we only source products from authorized distributors and manufacturers. This ensures that all of our products are genuine and of the highest quality.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">At Vape Shop Texas, we prioritize customer service and satisfaction above all else. Our knowledgeable and friendly staff are always available to assist you with any questions or concerns. We also offer a comfortable and welcoming atmosphere for you to enjoy while browsing our products.</p>
        <p className="mb-4 text-gray-700 leading-relaxed">In addition to our wide selection of products, we also offer battery safety education and other helpful services to ensure that our customers have a safe and enjoyable vaping experience. Visit us at Vape Shop Texas to see for yourself!</p>
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
          Free shipping on orders $89+. Delivered to Texas in 2-4 days.
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
