import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE CV (protected)
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
    await prisma.cV.delete({
      where: { id },
    });

    return NextResponse.json({ message: "CV deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete CV" },
      { status: 500 }
    );
  }
}

// PUT toggle active status (protected)
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
    const { isActive } = body;

    if (isActive) {
      // Deactivate all other CVs
      await prisma.cV.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    const cv = await prisma.cV.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(cv);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update CV" },
      { status: 500 }
    );
  }
}
