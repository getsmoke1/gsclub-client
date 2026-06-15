"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface BrandFaqProps {
  title: string;
  faqs: FaqItem[];
}

export function BrandFaq({ title, faqs }: BrandFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto w-full px-4 py-8">
      <h2 className="font-unbounded font-bold text-2xl md:text-3xl text-center mb-8">
        {title}
      </h2>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="font-unbounded font-semibold text-sm md:text-base pr-4">
                {faq.question}
              </span>
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 border-black text-black font-bold text-lg leading-none">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
