"use client";
import { useFAQBySlug } from "@/hooks/useFAQs";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const FaqItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <motion.div
        initial={false}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <h3 className="font-medium text-base text-gray-800 pr-4">{faq.question}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500 shrink-0"
        >
          <FiChevronDown size={20} />
        </motion.span>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-3 text-gray-600 text-sm leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ListingFaqProps {
  pageSlug: string; // e.g. "/vapes" or "/bundles"
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
