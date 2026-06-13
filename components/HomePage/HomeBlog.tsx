"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
    slug: string;
    title: string;
    featuredImage?: string | null;
}

const HomeBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch('/api/blog?limit=2&page=1')
            .then(r => r.json())
            .then(data => setPosts((data.articles || []).slice(0, 2)))
            .catch(() => {});
    }, []);

    return (
        <section className="w-full py-10 px-4" style={{ backgroundColor: '#FFD600' }}>
            <div className="w-11/12 mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <span className="text-sm text-gray-600 font-medium">getsmoke</span>
                    <h2 className="font-unbounded font-bold text-3xl md:text-4xl text-black leading-tight mt-1">
                        Blog. Vape{' '}
                        <span style={{ color: '#fe3500' }}>news</span>
                        <br />
                        <span style={{ color: '#fe3500' }}>and study.</span>
                    </h2>
                </div>

                {/* Blog cards — stack on mobile */}
                <div className="flex flex-col gap-4">
                    {posts.length > 0 ? posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                            <div className="relative rounded-2xl overflow-hidden bg-gray-800" style={{ paddingBottom: '70%' }}>
                                {post.featuredImage ? (
                                    <Image
                                        src={post.featuredImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
                                )}
                                {/* White circle with title overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center p-4 shadow-xl">
                                        <h3 className="font-unbounded font-bold text-xs md:text-sm text-black text-center leading-tight line-clamp-4">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        // Skeleton
                        [0, 1].map(i => (
                            <div key={i} className="relative rounded-2xl overflow-hidden bg-gray-300 animate-pulse" style={{ paddingBottom: '70%' }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 rounded-full bg-gray-200" />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Read more */}
                <div className="text-center mt-6">
                    <Link href="/blog" className="font-unbounded text-sm underline text-black hover:text-gray-700">
                        read more
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeBlog;
