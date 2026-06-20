"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { format } from 'date-fns';
import { Article } from '@/types/article';

interface BlogDetailsProps {
  article: Article;
}

const BlogDetails = ({ article }: BlogDetailsProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Hide broken images in article content
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const imgs = el.querySelectorAll('img');
    imgs.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        img.style.display = 'none';
      }
      img.addEventListener('error', () => { img.style.display = 'none'; });
    });
  }, [article.description]);
  const formattedDate = format(new Date(article.createdAt), 'dd/MM/yyyy');

  // Dynamic styles for the blog content
  const contentStyles = `
    [&_p]:mb-4 
    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 
    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 
    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-3
    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
    [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
    [&_li]:mb-2
    [&_strong]:font-bold
    [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4
    [&_img]:block
  `;

  // Sort FAQ items by order
  const sortedFaqs = article.faq ? [...article.faq].sort((a, b) => a.order - b.order) : [];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const authorName = article.author || "GetSmoke Editorial Team";
  const imageUrl = article.images[0]?.url || '';

  // Article structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.subtitle?.replace(/\[&hellip;\]/g, '…').replace(/<[^>]+>/g, ''),
    "image": imageUrl,
    "datePublished": new Date(article.createdAt).toISOString(),
    "dateModified": new Date(article.updatedAt).toISOString(),
    "author": { "@type": "Person", "name": authorName },
    "publisher": {
      "@type": "Organization",
      "name": "GetSmoke",
      "url": "https://getsmoke.com"
    }
  };

  return (
    <main className="w-11/12 mx-auto pt-6 pb-14 font-unbounded text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex flex-col md:flex-row gap-7">
        <Image
          src={article.images[0]?.url || '/placeholder.jpg'}
          alt={`Image for ${article.title}`}
          width={600}
          height={400}
          className="object-fill rounded-lg w-[423px] h-[228px]"
        />
        <div className="space-y-5">
          <aside>
            <Link href="/blog">
              <span className="font-semibold flex items-center gap-1 hover:underline">
                <IoIosArrowBack />
                Go back
              </span>
            </Link>
          </aside>
          <div className="space-y-2">
            <h1 className="font-semibold text-[1.2rem]">{article.title}</h1>
            <p className="font-normal">{article.subtitle?.replace(/\[&hellip;\]/g, '…').replace(/&hellip;/g, '…').replace(/&amp;/g, '&').replace(/<[^>]+>/g, '')}</p>
          </div>
          <div className="space-y-1">
            <time dateTime={new Date(article.createdAt).toISOString()} className="text-gray-600 font-sem block">
              Published: {formattedDate}
            </time>
            <p className="text-gray-500 text-sm flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>By {authorName}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <article className="mt-7">
        <div
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: article.description }}
          className={contentStyles}
        />
      </article>

      {/* FAQ Section */}
      {sortedFaqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {sortedFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <IoIosArrowUp className="text-gray-600 flex-shrink-0" size={20} />
                  ) : (
                    <IoIosArrowDown className="text-gray-600 flex-shrink-0" size={20} />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                      className={`text-gray-700 pt-3 ${contentStyles}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetails;