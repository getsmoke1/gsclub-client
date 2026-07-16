import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Step 1: get latest 2 posts (no embed needed)
        const postsRes = await fetch(
            "https://getsmoke.com/wp-json/wp/v2/posts?per_page=2&orderby=date&order=desc&_fields=id,slug,title,featured_media",
            { next: { revalidate: 3600 } }
        );
        if (!postsRes.ok) throw new Error(`WP posts error: ${postsRes.status}`);
        const posts = await postsRes.json();

        // Step 2: for each post fetch featured image by media ID
        const articles = await Promise.all(
            posts.map(async (post: { id: number; slug: string; title: { rendered: string }; featured_media: number }) => {
                let featuredImage: string | null = null;

                if (post.featured_media && post.featured_media > 0) {
                    try {
                        const mediaRes = await fetch(
                            `https://getsmoke.com/wp-json/wp/v2/media/${post.featured_media}?_fields=source_url`,
                            { next: { revalidate: 3600 } }
                        );
                        if (mediaRes.ok) {
                            const media = await mediaRes.json();
                            featuredImage = media.source_url || null;
                        }
                    } catch {}
                }

                return {
                    slug: post.slug,
                    title: post.title.rendered.replace(/<[^>]+>/g, ""),
                    featuredImage,
                };
            })
        );

        return NextResponse.json({ articles });
    } catch (err) {
        console.error("blog-wp error:", err);
        return NextResponse.json({ articles: [] });
    }
}
