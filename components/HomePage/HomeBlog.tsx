"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlogPost {
    slug: string;
    title: string;
    featuredImage: string | null;
    link: string;
}

const HomeBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blog-wp')
            .then(r => r.json())
            .then(data => {
                setPosts((data.articles || []).slice(0, 2));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="w-full py-8 px-4" style={{ backgroundColor: '#FFD600' }}>
            <div className="w-11/12 mx-auto">
                {/* Header */}
                <div className="mb-5">
                    <span className="text-sm text-gray-700 font-medium">getsmoke</span>
                    <h2 className="font-unbounded font-bold text-3xl text-black leading-tight mt-1">
                        Blog. Vape{' '}
                        <span style={{ color: '#fe3500' }}>news<br />and study.</span>
                    </h2>
                </div>

                {/* Blog cards */}
                <div className="flex flex-col gap-4">
                    {loading
                        ? [0, 1].map(i => (
                            <div key={i} className="relative rounded-2xl overflow-hidden bg-gray-300 animate-pulse" style={{ paddingBottom: '70%' }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 rounded-full bg-gray-200" />
                                </div>
                            </div>
                        ))
                        : posts.map(post => (
                            <a
                                key={post.slug}
                                href={post.link || `https://getsmoke.com/${post.slug}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="relative rounded-2xl overflow-hidden bg-gray-800" style={{ paddingBottom: '70%' }}>
                                    {/* Featured image */}
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
                                    {/* Dark overlay for readability */}
                                    <div className="absolute inset-0 bg-black/20" />
                                    {/* White circle with title */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center p-5 shadow-xl">
                                            <h3 className="font-unbounded font-bold text-xs text-black text-center leading-snug line-clamp-5">
                                                {post.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                </div>

                {/* Read more */}
                <div className="text-center mt-6">
                    <a
                        href="https://getsmoke.com/blog/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-unbounded text-sm underline text-black hover:text-gray-700"
                    >
                        read more
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HomeBlog;
