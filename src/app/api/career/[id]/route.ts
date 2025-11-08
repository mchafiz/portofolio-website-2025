import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const careerSchema = z.object({
  company: z.string().min(1).optional(),
  position: z.string().min(1).optional(),
  period: z.string().min(1).optional(),
  duration: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  type: z.enum(["full-time", "freelance", "contract", "internship", "education"]).optional(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  description: z.string().min(1).optional(),
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

// GET single career event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const event = await prisma.careerEvent.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Career event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...event,
      achievements: JSON.parse(event.achievements as string),
      technologies: JSON.parse(event.technologies as string),
      images: event.images ? JSON.parse(event.images) : null,
      files: event.files ? JSON.parse(event.files) : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch career event" },
      { status: 500 }
    );
  }
}

// PUT update career event (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = careerSchema.parse(body);

    const updateData: Record<string, unknown> = { ...validatedData };
    if (validatedData.achievements) {
      updateData.achievements = JSON.stringify(validatedData.achievements);
    }
    if (validatedData.technologies) {
      updateData.technologies = JSON.stringify(validatedData.technologies);
    }
    if (validatedData.images) {
      updateData.images = JSON.stringify(validatedData.images);
    }
    if (validatedData.files) {
      updateData.files = JSON.stringify(validatedData.files);
    }

    const event = await prisma.careerEvent.update({
      where: { id },
      data: updateData as never,
    });

    return NextResponse.json({
      ...event,
      achievements: JSON.parse((event as never as { achievements: string }).achievements),
      technologies: JSON.parse((event as never as { technologies: string }).technologies),
      images: (event as never as { images: string | null }).images ? JSON.parse((event as never as { images: string }).images) : null,
      files: (event as never as { files: string | null }).files ? JSON.parse((event as never as { files: string }).files) : null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update career event" },
      { status: 500 }
    );
  }
}

// DELETE career event (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.careerEvent.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Career event deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete career event" },
      { status: 500 }
    );
  }
}
