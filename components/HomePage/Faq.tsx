"use client"
import { useFAQBySlug } from '@/hooks/useFAQs';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FaqItem = ({ faq }: { faq: { question: string; answer: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="list-none flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <h3 className="font-medium text-lg text-gray-800">{faq.question}</h3>
        <span
          className="text-gray-500"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}
        >
          <FiChevronDown size={20} />
        </span>
      </div>

      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.2s ease, opacity 0.2s ease',
        }}
      >
        <div className="p-5 pt-0 text-gray-600">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const { data: faqPage, isLoading, error, isError } = useFAQBySlug('/');

  if (isError) return <div className="text-red-500 text-center py-8">Error: {error?.message || 'Failed to load FAQs'}</div>

  return (
    <div className="w-11/12 mx-auto pb-16 font-unbounded">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-100 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {faqPage?.faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Faq;
