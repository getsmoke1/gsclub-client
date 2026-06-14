import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1 hour

export async function GET() {
    try {
        // Fetch latest 2 posts from WP with embedded featured media
        const res = await fetch(
            "https://getsmoke.com/wp-json/wp/v2/posts?per_page=2&orderby=date&order=desc&_embed=1&_fields=id,slug,title,link,featured_media,_embedded",
            {
                headers: { "User-Agent": "GetSmoke-NextJS/1.0" },
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) throw new Error(`WP API error: ${res.status}`);

        const posts = await res.json();

        const articles = await Promise.all(
            posts.map(async (post: Record<string, unknown>) => {
                // Try embedded first
                const embedded = post._embedded as Record<string, unknown[]> | undefined;
                let featuredImage: string | null = null;

                if (embedded?.["wp:featuredmedia"]?.[0]) {
                    featuredImage = (embedded["wp:featuredmedia"][0] as Record<string, unknown>).source_url as string || null;
                }

                // Fallback: fetch media directly
                if (!featuredImage && post.featured_media && (post.featured_media as number) > 0) {
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

                const titleObj = post.title as { rendered?: string } | undefined;

                return {
                    slug: post.slug as string,
                    title: titleObj?.rendered
                        ? titleObj.rendered.replace(/<[^>]+>/g, "")
                        : String(post.slug),
                    featuredImage,
                    link: post.link as string,
                };
            })
        );

        return NextResponse.json({ articles });
    } catch (err) {
        console.error("blog-wp error:", err);
        return NextResponse.json({ articles: [] });
    }
}
