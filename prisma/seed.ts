import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("Admin user created:", admin);

  // Create sample article
  const article = await prisma.article.upsert({
    where: { slug: "getting-started-with-nextjs" },
    update: {},
    create: {
      slug: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      description: "Learn how to build modern web applications with Next.js",
      content: "# Getting Started with Next.js\n\nNext.js is a powerful React framework...",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      category: "Web Development",
      tags: JSON.stringify(["nextjs", "react", "javascript"]),
      featured: true,
      published: true,
    },
  });

  console.log("Sample article created:", article);

  // Create sample project
  const project = await prisma.project.upsert({
    where: { slug: "portfolio-website" },
    update: {},
    create: {
      slug: "portfolio-website",
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      category: "Web Development",
      tags: JSON.stringify(["nextjs", "typescript", "tailwind"]),
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/example/portfolio",
      featured: true,
      published: true,
      order: 1,
    },
  });

  console.log("Sample project created:", project);

  // Create sample career event
  const careerEvent = await prisma.careerEvent.create({
    data: {
      year: "2024",
      title: "Started Learning Next.js",
      company: "Self Learning",
      description: "Began journey into modern web development",
      type: "education",
      icon: "🎓",
      published: true,
      order: 1,
    },
  });

  console.log("Sample career event created:", careerEvent);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
