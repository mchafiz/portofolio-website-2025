import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    // Get the active CV from database
    const cv = await prisma.cV.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (!cv) {
      return NextResponse.json({ error: "No active CV found" }, { status: 404 });
    }

    // Read the file from the public/uploads directory
    const filepath = join(process.cwd(), "public", cv.fileUrl);

    try {
      const fileBuffer = await readFile(filepath);

      // Return the file as a download
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${cv.fileName}"`,
        },
      });
    } catch (fileError) {
      console.error("Error reading file:", fileError);
      return NextResponse.json(
        { error: "CV file not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error downloading CV:", error);
    return NextResponse.json(
      { error: "Failed to download CV" },
      { status: 500 }
    );
  }
}
