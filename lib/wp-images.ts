/**
 * Fetch featured image URL from WordPress REST API by post slug.
 * Falls back to null if not found or request fails.
 */
export async function getWpFeaturedImage(slug: string): Promise<string | null> {
    try {
        const res = await fetch(
            `https://getsmoke.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=featured_media&per_page=1`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        const posts = await res.json();
        if (!posts.length || !posts[0].featured_media) return null;

        const mediaId = posts[0].featured_media;
        const mediaRes = await fetch(
            `https://getsmoke.com/wp-json/wp/v2/media/${mediaId}?_fields=source_url`,
            { next: { revalidate: 3600 } }
        );
        if (!mediaRes.ok) return null;
        const media = await mediaRes.json();
        return media.source_url || null;
    } catch {
        return null;
    }
}

/**
 * Batch fetch WP images for multiple slugs.
 */
export async function getWpFeaturedImages(slugs: string[]): Promise<Record<string, string | null>> {
    const results = await Promise.all(
        slugs.map(async (slug) => [slug, await getWpFeaturedImage(slug)] as [string, string | null])
    );
    return Object.fromEntries(results);
}
