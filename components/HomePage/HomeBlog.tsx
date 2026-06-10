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
        <section className="w-full bg-black py-16">
            <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-10 items-start">
                {/* Left */}
                <div className="md:w-2/5 flex flex-col gap-1">
                    <span className="font-unbounded font-bold text-base text-white">getsmoke</span>
                    <h2 className="font-unbounded font-bold text-4xl text-white leading-tight">Blog.</h2>
                    <p className="font-unbounded font-bold text-4xl text-white leading-tight">
                        Vape <span className="text-purple-500">news</span>
                    </p>
                    <p className="font-unbounded font-bold text-4xl text-white leading-tight italic">and study.</p>
                    <Link
                        href="/blog"
                        className="mt-8 inline-block font-unbounded font-bold text-xs uppercase px-6 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-colors w-fit"
                    >
                        View all posts
                    </Link>
                </div>
                {/* Right: blog cards */}
                <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {posts.length > 0 ? posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                            <div className="relative rounded-xl overflow-hidden bg-gray-800" style={{ paddingBottom: '65%' }}>
                                {post.featuredImage ? (
                                    <Image
                                        src={post.featuredImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 p-4">
                                    <h3 className="font-unbounded font-bold text-xs text-white line-clamp-3 leading-relaxed">
                                        {post.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        // Placeholder cards while loading
                        [0, 1].map(i => (
                            <div key={i} className="rounded-xl overflow-hidden bg-gray-800 animate-pulse" style={{ paddingBottom: '65%' }} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomeBlog;
