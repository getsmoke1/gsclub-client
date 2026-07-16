"use client";
import { useFAQBySlug } from "@/hooks/useFAQs";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FaqItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <h3 className="font-medium text-base text-gray-800 pr-4">{faq.question}</h3>
        <span
          className="text-gray-500 shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
        >
          <FiChevronDown size={20} />
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className="p-5 pt-3 text-gray-600 text-sm leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

interface ListingFaqProps {
  pageSlug: string;
}

const ListingFaq = ({ pageSlug }: ListingFaqProps) => {
  const { data: faqPage, isLoading } = useFAQBySlug(pageSlug);

  if (!isLoading && !faqPage?.faqs?.length) return null;

  return (
    <section className="w-11/12 mx-auto py-12 font-unbounded">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg h-16 bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqPage?.faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListingFaq;
