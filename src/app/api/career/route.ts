import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const careerSchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  company: z.string().optional().nullable(),
  description: z.string().min(1),
  type: z.enum(["education", "work", "achievement", "certification"]),
  icon: z.string().optional().nullable(),
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

    return NextResponse.json(events);
  } catch (error) {
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
      data: validatedData,
    });

    return NextResponse.json(event);
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
