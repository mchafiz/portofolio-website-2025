import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET active CV (public)
export async function GET() {
  try {
    const cv = await prisma.cV.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cv);
  } catch (error) {
    console.error("Error fetching CV:", error);
    return NextResponse.json({ error: "Failed to fetch CV" }, { status: 500 });
  }
}

// POST create/upload new CV (protected)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { fileName, fileUrl, description } = body;

    if (!fileName || !fileUrl) {
      return NextResponse.json(
        { error: "fileName and fileUrl are required" },
        { status: 400 }
      );
    }

    // Deactivate all existing CVs
    await prisma.cV.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new CV as active
    const cv = await prisma.cV.create({
      data: {
        fileName,
        fileUrl,
        description: description || null,
        isActive: true,
      },
    });

    return NextResponse.json(cv);
  } catch (error) {
    console.error("Error creating CV:", error);
    return NextResponse.json({ error: "Failed to create CV" }, { status: 500 });
  }
}
