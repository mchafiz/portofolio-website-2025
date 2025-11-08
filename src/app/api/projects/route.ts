import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  category: z.string().min(1),
  tags: z.array(z.string()),
  demoUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

// GET all projects (public)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = searchParams.get("published");

  try {
    const projects = await prisma.project.findMany({
      where: published === "true" ? { published: true } : undefined,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(
      projects.map((project: { tags: string; [key: string]: unknown }) => ({
        ...project,
        tags: JSON.parse(project.tags),
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create project (protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    // Generate slug from title
    const slug =
      validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now();

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug,
        tags: JSON.stringify(validatedData.tags),
      },
    });

    return NextResponse.json({
      ...project,
      tags: JSON.parse(project.tags),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
