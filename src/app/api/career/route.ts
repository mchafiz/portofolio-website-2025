import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const careerSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  period: z.string().min(1),
  duration: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  type: z.enum(["full-time", "freelance", "contract", "internship", "education"]),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  description: z.string().min(1),
  images: z.array(z.object({
    url: z.string(),
    caption: z.string(),
  })).optional().nullable(),
  files: z.array(z.object({
    name: z.string(),
    type: z.string(),
    url: z.string(),
  })).optional().nullable(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

// GET all career events (public)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = searchParams.get("published");

  try {
    const events = await prisma.careerEvent.findMany({
      where: published === "true" ? { published: true } : undefined,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(
      events.map((event: { achievements: string; technologies: string; images: string | null; files: string | null; [key: string]: unknown }) => ({
        ...event,
        achievements: JSON.parse(event.achievements),
        technologies: JSON.parse(event.technologies),
        images: event.images ? JSON.parse(event.images) : null,
        files: event.files ? JSON.parse(event.files) : null,
      }))
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch career events" },
      { status: 500 }
    );
  }
}

// POST create career event (protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = careerSchema.parse(body);

    const event = await prisma.careerEvent.create({
      data: {
        ...validatedData,
        achievements: JSON.stringify(validatedData.achievements),
        technologies: JSON.stringify(validatedData.technologies),
        images: validatedData.images ? JSON.stringify(validatedData.images) : null,
        files: validatedData.files ? JSON.stringify(validatedData.files) : null,
      },
    });

    return NextResponse.json({
      ...event,
      achievements: JSON.parse(event.achievements),
      technologies: JSON.parse(event.technologies),
      images: event.images ? JSON.parse(event.images) : null,
      files: event.files ? JSON.parse(event.files) : null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create career event" },
      { status: 500 }
    );
  }
}
