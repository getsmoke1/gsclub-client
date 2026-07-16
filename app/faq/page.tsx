import type { Metadata } from "next";
import { noIndex } from "@/lib/noindex";

export const metadata: Metadata = {
  ...noIndex,
  title: "FAQ | GetSmoke",
  description: "Frequently asked questions about GetSmoke - shipping, returns, products and more.",
};

const faqs = [
  { q: "When was Getsmoke.com founded?", a: "We launched in 2023 as an online vape shop serving customers across the United States." },
  { q: "Do you only sell vapes?", a: "No. In 2025, we expanded our catalog to include hookah products, and we continue to add new vape models and accessories." },
  { q: "How many customers have you served?", a: "So far, we've proudly served over 10,000 customers nationwide, including those in remote areas where local shops aren't available." },
  { q: "Do you ship to all U.S. states?", a: "Yes, we ship nationwide - even to hard-to-reach locations where people might not have access to a vape store nearby." },
  { q: "Why should I choose Getsmoke over a local shop?", a: "We offer better prices, a wider selection of the newest products, and fast delivery straight to your door." },
  { q: "Are your products authentic?", a: "Yes, all products on Getsmoke.com are 100% authentic and sourced only from trusted manufacturers." },
  { q: "Do you have a loyalty program?", a: "Yes, we're rolling out customer loyalty programs and special offers for our returning shoppers in 2026." },
  { q: "Do you offer priority shipping?", a: "Yes, priority shipping is available for most locations. Pricing and estimated delivery times are shown at checkout." },
  { q: "Can I return or exchange a vape?", a: "Yes, returns and exchanges are possible under our Return Policy. Please check our dedicated Returns Policy page for full details." },
  { q: "What should I do if my vape arrives defective?", a: "Contact our support team within the required timeframe, include photos and a description of the issue, and we'll arrange a replacement or another solution." },
  { q: "What if my favorite flavor is out of stock?", a: "You can sign up for back-in-stock notifications on the product page. Our support team can also suggest alternatives or provide estimated restock times." },
  { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can use it on the carrier's website to monitor your delivery." },
  { q: "Do I need to verify my age?", a: "Yes. All customers must be 21 years or older to purchase from GetSmoke. Age verification is required at checkout." },
  { q: "How can I contact GetSmoke?", a: "Reach us at info@getsmoke.com. We typically respond within 1 business day." },
];

export default function FaqPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-3xl">
      <h1 className="font-unbounded font-bold text-2xl md:text-3xl mb-2">
        Frequently Asked <span style={{ color: "#fe3500" }}>Questions</span>
      </h1>
      <p className="text-gray-500 text-sm mb-8">Everything you need to know about GetSmoke</p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-5">
            <h2 className="font-unbounded font-bold text-sm mb-2">{faq.q}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-10 text-center">
        WARNING: This product contains nicotine. Nicotine is an addictive chemical. For adults 21+ only.
      </p>
    </main>
  );
}
