import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const careerSchema = z.object({
  year: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  company: z.string().optional().nullable(),
  description: z.string().min(1).optional(),
  type: z.enum(["education", "work", "achievement", "certification"]).optional(),
  icon: z.string().optional().nullable(),
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

    return NextResponse.json(event);
  } catch (error) {
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

    const event = await prisma.careerEvent.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(event);
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete career event" },
      { status: 500 }
    );
  }
}
