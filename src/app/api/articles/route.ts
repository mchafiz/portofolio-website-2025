import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  image: z.string().url(),
  category: z.string().min(1),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

// GET all articles (public)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = searchParams.get("published");

  try {
    const articles = await prisma.article.findMany({
      where: published === "true" ? { published: true } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      articles.map((article) => ({
        ...article,
        tags: JSON.parse(article.tags),
      }))
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST create article (protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = articleSchema.parse(body);

    // Generate slug from title
    const slug =
      validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now();

    const article = await prisma.article.create({
      data: {
        ...validatedData,
        slug,
        tags: JSON.stringify(validatedData.tags),
      },
    });

    return NextResponse.json({
      ...article,
      tags: JSON.parse(article.tags),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
