import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "10");
        const page = parseInt(searchParams.get("page") || "1");
        const skip = (page - 1) * limit;

        const articles = await prisma.blogArticle.findMany({
            include: { images: { take: 1 } },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip,
        });

        return NextResponse.json({
            articles: articles.map(a => ({
                slug: a.slug,
                title: a.title,
                excerpt: a.subtitle || "",
                featuredImage: a.images[0]?.url || null,
            })),
        });
    } catch {
        return NextResponse.json({ articles: [] });
    }
}
