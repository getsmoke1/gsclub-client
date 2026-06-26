"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
    slug: string;
    title: string;
    featuredImage: string | null;
}

const HomeBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blog?limit=2&page=1')
            .then(r => r.json())
            .then(data => {
                setPosts((data.articles || []).slice(0, 2));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const BlogCard = ({ post }: { post: BlogPost }) => (
        <Link href={`/blog/${post.slug}`} className="block group">
            <div className="relative rounded-2xl bg-gray-800" style={{ paddingBottom: '70%', marginBottom: '100px' }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {post.featuredImage ? (
                        <Image src={post.featuredImage} alt={post.title} fill loading="eager" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-60px' }}>
                    <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center p-5 shadow-xl">
                        <h3 className="font-unbounded font-bold text-xs text-black text-center leading-snug line-clamp-5">{post.title}</h3>
                    </div>
                </div>
            </div>
        </Link>
    );

    const SkeletonCard = () => (
        <div className="relative rounded-2xl overflow-hidden bg-gray-300 animate-pulse" style={{ paddingBottom: '70%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gray-200" />
            </div>
        </div>
    );

    return (
        <section className="w-full py-8 px-4" style={{ backgroundColor: '#FFD600', paddingTop: '56px', paddingBottom: '56px' }}>
            <div className="w-11/12 mx-auto">

                {/* ── Mobile layout (unchanged) ── */}
                <div className="md:hidden">
                    <div className="mb-5">
                        <Link href="/"><Image src="/images/logo.png" alt="GetSmoke" width={120} height={32} className="h-7 w-auto object-contain mb-2" /></Link>
                        <h2 className="font-unbounded font-bold text-3xl text-black leading-tight mt-1">
                            Blog. Vape{' '}<span style={{ color: '#fe3500' }}>news<br />and study.</span>
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        {loading ? [0,1].map(i => <SkeletonCard key={i} />) : posts.map((post) => <BlogCard key={post.slug} post={post} />)}
                    </div>
                    <div className="text-center mt-2">
                        <Link href="/blog" className="font-unbounded text-sm underline text-black hover:text-gray-700">read more</Link>
                    </div>
                </div>

                {/* ── Desktop layout: horizontal — text left, 2 cards right ── */}
                <div className="hidden md:flex items-start gap-8 rounded-3xl overflow-visible">
                    {/* Left: logo + heading */}
                    <div className="flex-shrink-0 w-64 flex flex-col" style={{ minHeight: '220px' }}>
                        <Link href="/"><Image src="/images/logo.png" alt="GetSmoke" width={120} height={32} className="h-7 w-auto object-contain" /></Link>
                        <div className="mt-14">
                          <h2 className="font-unbounded font-bold text-4xl text-black leading-tight">
                              Blog.<br />
                              <span>Vape </span>
                              <span style={{ color: '#fe3500' }}>news<br />and study.</span>
                          </h2>
                          <Link href="/blog" className="inline-block mt-4 font-unbounded text-sm underline text-black hover:text-gray-700">read more</Link>
                        </div>
                    </div>

                    {/* Right: 2 blog cards side by side */}
                    <div className="flex-1 grid grid-cols-2 gap-6" style={{ paddingBottom: '80px' }}>
                        {loading
                            ? [0,1].map(i => <SkeletonCard key={i} />)
                            : posts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                    <div className="relative rounded-2xl bg-gray-800" style={{ paddingBottom: '65%', marginBottom: '70px' }}>
                                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                            {post.featuredImage ? (
                                                <Image src={post.featuredImage} alt={post.title} fill loading="eager" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
                                            )}
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-55px', WebkitTransform: 'translateX(-50%)', transform: 'translateX(-50%)' }}>
                                            <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center p-4 shadow-xl">
                                                <h3 className="font-unbounded font-bold text-xs text-black text-center leading-snug line-clamp-5">{post.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HomeBlog;
