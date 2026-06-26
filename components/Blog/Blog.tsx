import Image from 'next/image';
import { r2src } from "@/lib/r2-image";
import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';

function cleanExcerpt(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/\[&hellip;\]/g, '…')
    .replace(/&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '') // strip any HTML tags
    .trim();
}

interface BlogProps {
  articles: Article[];
}

const Blog = ({ articles }: BlogProps) => {
  return (
    <div className="w-11/12 mx-auto pt-6 pb-14 font-unbounded text-black min-h-[100vh]">
      <h1 className="font-bold text-2xl text-center mb-8">BLOGS</h1>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Link href={`/blog/${article.slug}`} key={i} className="block group">
            {/* Image */}
            <div className="relative w-full rounded-xl overflow-hidden bg-gray-200" style={{ paddingBottom: '56%' }}>
              {article.images?.[0]?.url ? (
                <Image
                  src={r2src(article.images[0].url)}
                  alt={article.title}
                  fill
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No image</span>
                </div>
              )}
            </div>
            {/* Text */}
            <div className="mt-3">
              <h3 className="font-bold text-base leading-snug line-clamp-2">{article.title}</h3>
              {article.subtitle && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2 font-sans">{cleanExcerpt(article.subtitle)}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
