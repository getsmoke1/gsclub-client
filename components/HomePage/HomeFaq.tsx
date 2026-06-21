"use client"
import React, { useState } from 'react';

const faqs = [
    { q: 'What vape brands do you carry?', a: 'We carry all major brands including Geek Bar, Lost Mary, RAZ, VIHO, HQD, FUME, Juicy Bar, Foger, and more. All products are sourced through authorized US distribution channels.' },
    { q: 'Do you offer same-day delivery?', a: 'Yes! We offer same-day delivery in select Texas cities including Houston, Dallas, Austin, San Antonio, Fort Worth, and Plano. Order before our daily cutoff to qualify.' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days for unopened, unused products in original packaging. Opened products cannot be returned unless defective.' },
    { q: 'How long does standard shipping take?', a: 'Standard shipping takes 1-3 business days across the USA. We ship via USPS and UPS with tracking on every order.' },
    { q: 'Are your products authentic?', a: 'Yes. Every product we sell is sourced through authorized US distributors. We do not sell grey-market or counterfeit products.' },
];

const HomeFaq = () => {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <section className="w-full bg-white py-14" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
            <div className="w-11/12 max-w-3xl mx-auto">
                <h2 className="font-unbounded font-bold text-2xl text-center mb-10">FAQs</h2>
                <div>
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-gray-200">
                            <div
                                className="flex justify-between items-center py-5 cursor-pointer"
                                onClick={() => setOpen(open === i ? null : i)}
                            >
                                <span className="font-unbounded text-sm font-medium pr-4">{faq.q}</span>
                                <span className="text-xl font-light flex-shrink-0 select-none">{open === i ? '−' : '+'}</span>
                            </div>
                            {open === i && (
                                <p className="pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeFaq;
