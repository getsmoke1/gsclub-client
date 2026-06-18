import type { Metadata } from "next";
import { noIndex } from "@/lib/noindex";

export const metadata: Metadata = {
  ...noIndex,
  title: "About Us | GetSmoke",
  description: "Learn about GetSmoke - your trusted online vape and hookah shop in the USA.",
};

export default function AboutUsPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl">
      <h1 className="font-unbounded font-bold text-2xl md:text-3xl mb-6">
        About <span style={{ color: "#fe3500" }}>GetSmoke</span>
      </h1>

      <div className="prose prose-sm md:prose-base max-w-none text-gray-700 space-y-4">
        <p>
          Welcome to GetSmoke - your trusted online destination for premium disposable vapes,
          hookah products, and vape juice in the United States.
        </p>
        <p>
          We carry the most popular brands including Geek Bar, RAZ, HQD, Lost Mary, FUME,
          Juicy Bar, and many more. All products are 21+ only and sold exclusively to adults.
        </p>
        <h2 className="font-unbounded font-bold text-lg mt-8 mb-3">Our Mission</h2>
        <p>
          GetSmoke is dedicated to providing adult vapers with a seamless shopping experience -
          offering fast shipping, competitive prices, and a wide selection of top-rated products.
        </p>
        <h2 className="font-unbounded font-bold text-lg mt-8 mb-3">Age Verification</h2>
        <p>
          We take compliance seriously. All customers must be 21 years or older to purchase
          from GetSmoke. We verify age at checkout and comply with all applicable federal and
          state regulations including the PACT Act.
        </p>
        <h2 className="font-unbounded font-bold text-lg mt-8 mb-3">Contact Us</h2>
        <p>
          Have questions? Reach us at{" "}
          <a href="mailto:info@getsmoke.com" className="text-[#fe3500] underline">
            info@getsmoke.com
          </a>
        </p>
        <p className="text-xs text-gray-400 mt-8">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical.
          For use by adults 21+ only.
        </p>
      </div>
    </main>
  );
}
