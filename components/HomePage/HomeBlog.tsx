"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
    slug: string;
    title: string;
    featuredImage?: string;
    excerpt?: string;
}

const HomeBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch('/api/blog?limit=2&page=1')
            .then(r => r.json())
            .then(data => {
                const items = data.articles || data.posts || [];
                setPosts(items.slice(0, 2));
            })
            .catch(() => {});
    }, []);

    return (
        <section className="w-full bg-black py-16">
            <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-10 items-start">
                {/* Left */}
                <div className="md:w-2/5 flex flex-col gap-2">
                    <span className="font-unbounded font-bold text-lg text-white lowercase">getsmoke</span>
                    <h2 className="font-unbounded font-bold text-3xl text-white">Blog.</h2>
                    <p className="font-unbounded font-bold text-3xl text-white">
                        Vape <span style={{ color: '#7C3AED' }}>news</span>
                    </p>
                    <p className="font-unbounded font-bold text-3xl text-white">and study.</p>
                    <Link href="/blog" className="mt-6 inline-block font-unbounded font-bold text-xs uppercase px-6 py-2.5 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-colors w-fit">
                        View all posts
                    </Link>
                </div>
                {/* Right: blog cards */}
                <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {posts.length > 0 ? posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                            <div className="relative rounded-xl overflow-hidden h-48 bg-gray-800">
                                {post.featuredImage && (
                                    <Image src={post.featuredImage} alt={post.title} fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" unoptimized />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-0 p-4">
                                    <h3 className="font-unbounded font-bold text-xs text-white line-clamp-2">{post.title}</h3>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        [1, 2].map(i => (
                            <div key={i} className="rounded-xl overflow-hidden h-48 bg-gray-800 animate-pulse" />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomeBlog;
