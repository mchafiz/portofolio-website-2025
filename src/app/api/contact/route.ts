import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save to database (you'll need to create a Contact model in Prisma)
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // TODO: Optional - Send email notification
    // You can integrate with services like SendGrid, Resend, or Nodemailer
    // Example:
    // await sendEmail({
    //   to: "mchaerulhafiz@gmail.com",
    //   from: email,
    //   subject: `New Contact: ${subject}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      id: contact.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
